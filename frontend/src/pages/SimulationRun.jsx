import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getAlgorithm, getNextAlgorithmSuggestion } from '../algorithms/registry';
import useSimulationEngine from '../engine/useSimulationEngine';
import SimulationVisualizer from '../components/SimulationVisualizer';
import ControlPanel from '../components/ControlPanel';
import ComplexityPanel from '../components/ComplexityPanel';
import GuessNextStepGame from '../components/GuessNextStepGame';
import GifExportButton from '../components/GifExportButton';
import api from '../api/axios';
import { countComparisons } from '../utils/reportStats';
import { treeToLevelOrder } from '../algorithms/dataStructures/buildTree';
import { getTagExplanation } from '../utils/tagExplanations';

const CodeViewer = lazy(() => import('../components/CodeViewer'));

function computeSnapshots(algorithm, category, inputData, settings) {
  if (algorithm.key === 'bstSearch') return algorithm.run(inputData, settings.target);
  if (category === 'searching') return algorithm.run(inputData, settings.target);
  if (category === 'scheduling' && (algorithm.key === 'roundRobin' || algorithm.key === 'multilevelQueue')) {
    return algorithm.run(inputData, settings.quantum || 2);
  }
  return algorithm.run(inputData);
}

export default function SimulationRun() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { user, markAlgorithmComplete } = useAuth();

  const [config, setConfig] = useState(location.state || null);
  const [loadingSaved, setLoadingSaved] = useState(!!params.id && !location.state);
  const [saveMessage, setSaveMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showGuessGame, setShowGuessGame] = useState(false);
  const visualizerRef = useRef(null);

  useEffect(() => {
    if (params.id && !location.state) {
      api.get(`/simulations/${params.id}`).then((res) => {
        const sim = res.data.simulation;
        setConfig({ category: sim.category, algorithmKey: sim.algorithm, inputData: sim.inputData, settings: sim.settings });
        setLoadingSaved(false);
      });
    }
  }, [params.id, location.state]);

  const algorithm = config ? getAlgorithm(config.algorithmKey) : null;

  const snapshots = useMemo(() => {
    if (!algorithm || !config) return [];
    try {
      return computeSnapshots(algorithm, config.category, config.inputData, config.settings || {});
    } catch {
      return [];
    }
  }, [algorithm, config]);

  const engine = useSimulationEngine(snapshots);
  const instructorMode = !!user?.instructorModeEnabled;
  const nextSuggestion = useMemo(() => (algorithm ? getNextAlgorithmSuggestion(algorithm.key) : null), [algorithm]);

  useEffect(() => {
    if (engine.isLast && algorithm && engine.total > 1) {
      markAlgorithmComplete(algorithm.key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine.isLast, algorithm?.key]);

  if (loadingSaved) {
    return <div className="grid h-64 place-items-center text-slate-400 dark:text-slate-500">{t('common.loading')}</div>;
  }

  if (!config || !algorithm) {
    navigate('/');
    return null;
  }

  const processIds = config.category === 'scheduling' ? config.inputData.map((p) => p.id) : [];

  function buildInputSummary() {
    if (config.category === 'scheduling') {
      return config.inputData.map((p) => `${p.id}(arrival=${p.arrival}, burst=${p.burst})`).join(', ');
    }
    if (algorithm.key === 'bstSearch') {
      return `tree(level-order) = [${treeToLevelOrder(config.inputData)}], target = ${config.settings?.target}`;
    }
    if (config.category === 'searching') {
      return `array = [${config.inputData.join(', ')}], target = ${config.settings?.target}`;
    }
    return `[${config.inputData.join(', ')}]`;
  }

  async function handleDownloadReport() {
    const start = performance.now();
    const { generatePerformanceReport } = await import('../utils/generateReport');
    generatePerformanceReport({
      algorithmName: algorithm.name.en,
      categoryName: config.category,
      complexity: algorithm.complexity,
      totalSteps: snapshots.length,
      comparisons: countComparisons(snapshots),
      elapsedMs: (performance.now() - start).toFixed(3),
      inputSummary: buildInputSummary(),
    });
  }

  async function handleSave() {
    setSaving(true);
    setSaveMessage('');
    try {
      await api.post('/simulations', {
        category: config.category,
        algorithm: config.algorithmKey,
        title: `${algorithm.name[lang]}`,
        inputData: config.inputData,
        settings: config.settings || {},
        lastStepIndex: engine.index,
      });
      setSaveMessage(t('controls.saved'));
    } catch {
      setSaveMessage(t('common.error'));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={`mx-auto px-4 py-8 ${instructorMode ? 'max-w-7xl' : 'max-w-7xl'}`}>
      <Link to="/" className="mb-4 inline-block text-sm text-brand-600 dark:text-brand-400">
        ← {t('common.back')}
      </Link>

      <div className={`mb-4 flex flex-wrap items-center justify-between gap-3`}>
        <h1 className={`font-extrabold text-slate-800 dark:text-slate-100 ${instructorMode ? 'text-3xl' : 'text-xl'}`}>
          {algorithm.name[lang]}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <GifExportButton elementRef={visualizerRef} engine={engine} fileName={`${algorithm.key}-simulation`} />
          <button onClick={handleSave} disabled={saving} className="btn-outline">
            💾 {t('controls.save')}
          </button>
        </div>
      </div>
      {saveMessage && (
        <div className="mb-4 rounded-lg bg-emerald-50 p-2 text-sm text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
          {saveMessage}
        </div>
      )}

      <div className={`grid gap-6 ${instructorMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
        <div className="space-y-4">
          <div className="card p-4" ref={visualizerRef}>
            <SimulationVisualizer category={config.category} snapshot={engine.snapshot} processIds={processIds} />
            {engine.snapshot?.message && (
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{engine.snapshot.message}</p>
                {engine.snapshot?.tag && (
                  <button
                    type="button"
                    onClick={() => setShowExplanation((v) => !v)}
                    className="mt-1 text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
                  >
                    {showExplanation ? `▲ ${t('run.hideExplanation')}` : `💡 ${t('run.explainMore')}`}
                  </button>
                )}
                {showExplanation && engine.snapshot?.tag && (
                  <p className="mx-auto mt-2 max-w-xl rounded-lg bg-slate-50 p-3 text-start text-xs leading-relaxed text-slate-600 dark:bg-slate-900/60 dark:text-slate-300">
                    {getTagExplanation(engine.snapshot.tag, lang)}
                  </p>
                )}
              </div>
            )}
          </div>

          <ControlPanel
            playing={engine.playing}
            onPlay={engine.play}
            onPause={engine.pause}
            onStepForward={engine.stepForward}
            onStepBackward={engine.stepBackward}
            onReset={engine.reset}
            index={engine.index}
            total={engine.total}
            speed={engine.speed}
            onSpeedChange={engine.setSpeed}
            isFirst={engine.isFirst}
            isLast={engine.isLast}
            instructorMode={instructorMode}
          />

          {!engine.isLast && !instructorMode && (
            <div>
              <button
                type="button"
                onClick={() => setShowGuessGame((v) => !v)}
                className="mb-2 text-xs font-semibold text-amber-600 hover:underline dark:text-amber-400"
              >
                {showGuessGame ? `▲ ${t('run.hideGuessGame')}` : `🎮 ${t('run.playGuessGame')}`}
              </button>
              {showGuessGame && (
                <GuessNextStepGame
                  key={engine.index}
                  category={config.category}
                  currentSnapshot={engine.snapshot}
                  nextSnapshot={snapshots[engine.index + 1]}
                  processIds={processIds}
                />
              )}
            </div>
          )}

          {engine.isLast && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-brand-50 p-3 text-sm font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                <span>{t('controls.complete')}</span>
                <button onClick={handleDownloadReport} className="btn-outline !py-1.5 text-xs">
                  📄 {t('controls.downloadReport')}
                </button>
              </div>
              {nextSuggestion && (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-brand-300 p-3 text-sm dark:border-brand-700">
                  <span className="text-slate-600 dark:text-slate-300">
                    {t('run.tryNext')}: <strong>{nextSuggestion.name[lang]}</strong>
                  </span>
                  <button
                    onClick={() => navigate(`/configure/${nextSuggestion.category}?algorithm=${nextSuggestion.key}`)}
                    className="btn-primary !py-1.5 text-xs"
                  >
                    {t('run.tryNextBtn')} ←
                  </button>
                </div>
              )}
            </div>
          )}

          {!instructorMode && <ComplexityPanel complexity={algorithm.complexity} />}

          {instructorMode && (
            <Suspense fallback={<div className="card h-40 animate-pulse" />}>
              <CodeViewer
                algorithmKey={algorithm.key}
                tag={engine.snapshot?.tag}
                inputData={config.category === 'sorting' || config.category === 'searching' ? config.inputData : null}
                target={config.settings?.target}
                large
              />
            </Suspense>
          )}
        </div>

        {!instructorMode && (
          <div className="lg:sticky lg:top-20 lg:self-start">
            <Suspense fallback={<div className="card h-40 animate-pulse" />}>
              <CodeViewer
                algorithmKey={algorithm.key}
                tag={engine.snapshot?.tag}
                inputData={config.category === 'sorting' || config.category === 'searching' ? config.inputData : null}
                target={config.settings?.target}
              />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
