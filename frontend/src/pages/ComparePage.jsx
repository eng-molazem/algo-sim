import { useMemo, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { CATEGORIES, getAlgorithmsByCategory } from '../algorithms/registry';
import { countComparisons } from '../utils/reportStats';
import { buildCompareContext, runAlgorithmForCompare } from '../utils/compareRunner';
import { INPUT_VARIANTS, generateVariant } from '../utils/inputVariants';
import LiveComparisonView from '../components/LiveComparisonView';

const SAME_INPUT_CATEGORIES = ['sorting', 'searching'];

export default function ComparePage() {
  const { t, lang } = useLanguage();
  const [mode, setMode] = useState('final');
  const [category, setCategory] = useState('sorting');
  const [selected, setSelected] = useState([]);
  const [results, setResults] = useState(null);
  const [liveConfig, setLiveConfig] = useState(null);
  const [raceId, setRaceId] = useState(0);

  const [sameInputAlgo, setSameInputAlgo] = useState('');
  const [variant1, setVariant1] = useState('sorted');
  const [variant2, setVariant2] = useState('reverseSorted');
  const [sameInputConfig, setSameInputConfig] = useState(null);
  const [sameInputRaceId, setSameInputRaceId] = useState(0);

  const algorithms = useMemo(() => getAlgorithmsByCategory(category), [category]);
  const sameInputAlgorithms = useMemo(
    () => (mode === 'sameInput' ? getAlgorithmsByCategory(category) : []),
    [mode, category]
  );

  function toggleSelect(key) {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
    setResults(null);
    setLiveConfig(null);
  }

  function handleCategoryChange(cat) {
    setCategory(cat);
    setSelected([]);
    setResults(null);
    setLiveConfig(null);
    setSameInputConfig(null);
    setSameInputAlgo('');
  }

  function handleModeChange(nextMode) {
    setMode(nextMode);
    setResults(null);
    setLiveConfig(null);
    setSameInputConfig(null);
    if (nextMode === 'sameInput' && !SAME_INPUT_CATEGORIES.includes(category)) {
      setCategory(SAME_INPUT_CATEGORIES[0]);
      setSameInputAlgo('');
    }
  }

  function startSameInputRace() {
    const algo = sameInputAlgorithms.find((a) => a.key === sameInputAlgo) || sameInputAlgorithms[0];
    if (!algo) return;
    const array1 = generateVariant(variant1);
    const array2 = generateVariant(variant2);
    const ctx1 = { array: array1, target: array1[Math.floor(array1.length / 2)] };
    const ctx2 = { array: array2, target: array2[Math.floor(array2.length / 2)] };
    setSameInputConfig({
      algorithms: [algo, algo],
      ctxList: [ctx1, ctx2],
      labels: [`${algo.name[lang]} — ${INPUT_VARIANTS[variant1][lang]}`, `${algo.name[lang]} — ${INPUT_VARIANTS[variant2][lang]}`],
    });
    setSameInputRaceId((id) => id + 1);
  }

  function runComparison() {
    const ctx = buildCompareContext(category);

    const data = selected.map((key) => {
      const algo = algorithms.find((a) => a.key === key);
      const start = performance.now();
      const snapshots = runAlgorithmForCompare(category, algo, ctx);
      const time = performance.now() - start;
      return {
        key,
        name: algo.name[lang],
        steps: snapshots.length,
        comparisons: countComparisons(snapshots),
        time: time.toFixed(3),
        complexity: algo.complexity,
      };
    });

    setResults(data);
  }

  function startLiveRace() {
    const ctx = buildCompareContext(category);
    const chosen = selected.slice(0, 2).map((key) => algorithms.find((a) => a.key === key));
    setLiveConfig({ ctx, algorithms: chosen });
    setRaceId((id) => id + 1);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-extrabold text-slate-800 dark:text-slate-100">{t('compare.title')}</h1>
      <p className="mb-6 text-slate-500 dark:text-slate-400">{t('compare.subtitle')}</p>

      <div className="mb-6 inline-flex rounded-xl border border-slate-200 p-1 dark:border-slate-700">
        <button
          onClick={() => handleModeChange('final')}
          className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${
            mode === 'final' ? 'bg-brand-gradient text-white shadow-glow' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {t('compare.modeFinal')}
        </button>
        <button
          onClick={() => handleModeChange('live')}
          className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${
            mode === 'live' ? 'bg-brand-gradient text-white shadow-glow' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {t('compare.modeLive')}
        </button>
        <button
          onClick={() => handleModeChange('sameInput')}
          className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${
            mode === 'sameInput' ? 'bg-brand-gradient text-white shadow-glow' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {t('compare.modeSameInput')}
        </button>
      </div>

      {mode === 'sameInput' ? (
        <div className="card mb-6 space-y-4 p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('compare.sameInputHint')}</p>

          <div>
            <label className="label">{t('compare.selectCategory')}</label>
            <select className="input" value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
              {SAME_INPUT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {t(`categories.${cat}`)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">{t('compare.selectAlgorithm')}</label>
            <select className="input" value={sameInputAlgo || sameInputAlgorithms[0]?.key || ''} onChange={(e) => setSameInputAlgo(e.target.value)}>
              {sameInputAlgorithms.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.name[lang]}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="label">{t('compare.input1')}</label>
              <select className="input" value={variant1} onChange={(e) => setVariant1(e.target.value)}>
                {Object.entries(INPUT_VARIANTS).map(([key, name]) => (
                  <option key={key} value={key}>
                    {name[lang]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">{t('compare.input2')}</label>
              <select className="input" value={variant2} onChange={(e) => setVariant2(e.target.value)}>
                {Object.entries(INPUT_VARIANTS).map(([key, name]) => (
                  <option key={key} value={key}>
                    {name[lang]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn-primary" onClick={startSameInputRace}>
            🏁 {t('compare.startLive')}
          </button>
        </div>
      ) : (
        <div className="card mb-6 space-y-4 p-6">
          <div>
            <label className="label">{t('compare.selectCategory')}</label>
            <select className="input" value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {t(`categories.${cat}`)}
                </option>
              ))}
            </select>
          </div>

          {mode === 'live' && <p className="text-sm text-slate-500 dark:text-slate-400">{t('compare.liveHint')}</p>}

          <div className="flex flex-wrap gap-3">
            {algorithms.map((a) => (
              <label
                key={a.key}
                className={`cursor-pointer rounded-xl border px-4 py-2 text-sm font-medium ${
                  selected.includes(a.key)
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'border-slate-200 text-slate-600 dark:border-slate-600 dark:text-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  className="me-2"
                  checked={selected.includes(a.key)}
                  onChange={() => toggleSelect(a.key)}
                  disabled={mode === 'live' && selected.length >= 2 && !selected.includes(a.key)}
                />
                {a.name[lang]}
              </label>
            ))}
            {algorithms.length === 0 && (
              <p className="text-sm text-slate-400 dark:text-slate-500">{t('compare.noAlgorithms')}</p>
            )}
          </div>

          {mode === 'final' ? (
            <button className="btn-primary" disabled={selected.length < 2} onClick={runComparison}>
              {t('compare.run')}
            </button>
          ) : (
            <div className="space-y-2">
              <button className="btn-primary" disabled={selected.length !== 2} onClick={startLiveRace}>
                🏁 {t('compare.startLive')}
              </button>
              {selected.length !== 2 && (
                <p className="text-xs text-amber-600 dark:text-amber-400">{t('compare.needExactlyTwo')}</p>
              )}
            </div>
          )}
        </div>
      )}

      {mode === 'final' && results && (
        <div className="overflow-x-auto">
          <table className="w-full text-center text-sm">
            <thead>
              <tr className="text-slate-500 dark:text-slate-400">
                <th className="p-2"></th>
                <th className="p-2">{t('compare.steps')}</th>
                <th className="p-2">{t('compare.comparisons')}</th>
                <th className="p-2">{t('compare.time')}</th>
                <th className="p-2">{t('complexity.average')}</th>
                <th className="p-2">{t('complexity.worst')}</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.key} className="border-t border-slate-100 dark:border-slate-700">
                  <td className="p-2 font-bold text-slate-700 dark:text-slate-200">{r.name}</td>
                  <td className="p-2 font-mono">{r.steps}</td>
                  <td className="p-2 font-mono">{r.comparisons}</td>
                  <td className="p-2 font-mono">{r.time}</td>
                  <td className="p-2 font-mono">{r.complexity.average}</td>
                  <td className="p-2 font-mono">{r.complexity.worst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {mode === 'live' && liveConfig && (
        <LiveComparisonView
          key={raceId}
          algorithms={liveConfig.algorithms}
          category={category}
          ctx={liveConfig.ctx}
          onRestart={startLiveRace}
        />
      )}

      {mode === 'sameInput' && sameInputConfig && (
        <LiveComparisonView
          key={sameInputRaceId}
          algorithms={sameInputConfig.algorithms}
          category={category}
          ctxList={sameInputConfig.ctxList}
          labels={sameInputConfig.labels}
          onRestart={startSameInputRace}
        />
      )}
    </div>
  );
}
