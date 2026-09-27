import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import useSimulationEngine from '../engine/useSimulationEngine';
import SimulationVisualizer from './SimulationVisualizer';
import { runAlgorithmForCompare } from '../utils/compareRunner';

function useLiveEngine(algorithm, category, ctx) {
  const snapshots = useMemo(() => {
    try {
      return runAlgorithmForCompare(category, algorithm, ctx);
    } catch {
      return [];
    }
  }, [algorithm, category, ctx]);
  return useSimulationEngine(snapshots);
}

export default function LiveComparisonView({ algorithms, category, ctx, ctxList, labels, onRestart }) {
  const { t, lang } = useLanguage();
  const ctx1 = ctxList ? ctxList[0] : ctx;
  const ctx2 = ctxList ? ctxList[1] : ctx;
  const engine1 = useLiveEngine(algorithms[0], category, ctx1);
  const engine2 = useLiveEngine(algorithms[1], category, ctx2);
  const processIds = category === 'scheduling' ? ctx1.processes.map((p) => p.id) : undefined;
  const [isPlaying, setIsPlaying] = useState(false);
  const [finishOrder, setFinishOrder] = useState([]);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (engine1.isLast) setFinishOrder((prev) => (prev.includes(0) ? prev : [...prev, 0]));
  }, [engine1.isLast]);
  useEffect(() => {
    if (engine2.isLast) setFinishOrder((prev) => (prev.includes(1) ? prev : [...prev, 1]));
  }, [engine2.isLast]);

  function handlePlay() {
    engine1.play();
    engine2.play();
    setIsPlaying(true);
  }
  function handlePause() {
    engine1.pause();
    engine2.pause();
    setIsPlaying(false);
  }
  function handleReset() {
    engine1.reset();
    engine2.reset();
    setIsPlaying(false);
    setFinishOrder([]);
  }
  function handleStep(dir) {
    handlePause();
    if (dir === 'forward') {
      engine1.stepForward();
      engine2.stepForward();
    } else {
      engine1.stepBackward();
      engine2.stepBackward();
    }
  }
  function handleSpeedChange(v) {
    setSpeed(v);
    engine1.setSpeed(v);
    engine2.setSpeed(v);
  }

  const engines = [engine1, engine2];
  const bothDone = engine1.isLast && engine2.isLast;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {algorithms.map((algo, i) => {
          const engine = engines[i];
          const place = finishOrder.indexOf(i);
          const label = labels ? labels[i] : algo.name[lang];
          return (
            <div
              key={`${algo.key}-${i}`}
              className={`card p-4 transition-shadow ${
                engine.isLast && place === 0 ? 'ring-2 ring-emerald-400 shadow-glow' : ''
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-slate-100">{label}</h3>
                {engine.isLast && (
                  <span
                    className={`badge ${
                      place === 0
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {place === 0 ? `🏁 ${t('compare.finishedFirst')}` : `✅ ${t('controls.complete')}`}
                  </span>
                )}
              </div>

              <SimulationVisualizer category={category} snapshot={engine.snapshot} processIds={processIds} />

              {engine.snapshot?.message && (
                <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">{engine.snapshot.message}</p>
              )}

              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>
                  {t('controls.step')} {engine.index + 1} {t('controls.of')} {engine.total}
                </span>
                <span className="font-mono">{algo.complexity.average}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all duration-200"
                  style={{ width: `${engine.total > 1 ? (engine.index / (engine.total - 1)) * 100 : 0}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="card flex flex-col gap-3 p-4">
        <div dir="ltr" className="flex flex-wrap items-center justify-center gap-2">
          <button className="btn-outline" onClick={() => handleStep('backward')} disabled={engine1.isFirst && engine2.isFirst}>
            ⏮
          </button>
          {isPlaying ? (
            <button className="btn-secondary" onClick={handlePause}>
              ⏸ {t('controls.pause')}
            </button>
          ) : (
            <button className="btn-primary" onClick={handlePlay} disabled={bothDone}>
              ▶ {t('controls.play')}
            </button>
          )}
          <button className="btn-outline" onClick={() => handleStep('forward')} disabled={bothDone}>
            ⏭
          </button>
          <button className="btn-secondary" onClick={handleReset}>
            ↺ {t('controls.reset')}
          </button>
          <button className="btn-outline" onClick={onRestart}>
            🎲 {t('compare.newRace')}
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span>{t('controls.speed')}</span>
          <input type="range" min="0.5" max="3" step="0.5" value={speed} onChange={(e) => handleSpeedChange(Number(e.target.value))} />
        </div>
      </div>

      {bothDone && (
        <div className="card p-4 text-center">
          <p className="font-bold text-slate-800 dark:text-slate-100">
            🏆 {labels ? labels[finishOrder[0]] : algorithms[finishOrder[0]].name[lang]} {t('compare.wonRace')}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {labels ? labels[0] : algorithms[0].name[lang]}: {engine1.total} {t('compare.steps')} &nbsp;|&nbsp;{' '}
            {labels ? labels[1] : algorithms[1].name[lang]}: {engine2.total} {t('compare.steps')}
          </p>
        </div>
      )}
    </div>
  );
}
