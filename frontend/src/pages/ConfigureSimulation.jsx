import { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { getAlgorithmsByCategory } from '../algorithms/registry';
import { parseLevelOrder } from '../algorithms/dataStructures/buildTree';

function randomArray(size, max = 99) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}

const DP_DEFAULTS = {
  fibonacci: '10',
  knapsack: '10|2:3,3:4,4:5,5:6',
  lcs: 'ABCBDAB|BDCABA',
};

export default function ConfigureSimulation() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const algorithms = useMemo(() => getAlgorithmsByCategory(category), [category]);
  const [algorithmKey, setAlgorithmKey] = useState(searchParams.get('algorithm') || algorithms[0]?.key || '');

  const [arraySize, setArraySize] = useState(8);
  const [customArray, setCustomArray] = useState('');
  const [target, setTarget] = useState('');
  const [values, setValues] = useState('5, 3, 8, 2, 9');
  const [textInput, setTextInput] = useState('{[()()]}');
  const [graphInput, setGraphInput] = useState('A-B:4,A-C:2,B-C:1,B-D:5,C-D:8,C-E:10,D-E:2,D-F:6,E-F:3');
  const [dpInput, setDpInput] = useState(() => DP_DEFAULTS[searchParams.get('algorithm')] || '10');
  const [treeStructure, setTreeStructure] = useState('8,3,10,1,6,,14,,,4,7,,,,13');
  const [treeTarget, setTreeTarget] = useState('7');
  const [processes, setProcesses] = useState([
    { id: 'P1', arrival: 0, burst: 5, priority: 2 },
    { id: 'P2', arrival: 1, burst: 3, priority: 1 },
    { id: 'P3', arrival: 2, burst: 8, priority: 3 },
  ]);
  const [quantum, setQuantum] = useState(2);
  const [error, setError] = useState('');

  const needsPriority = algorithmKey === 'priorityScheduling' || algorithmKey === 'multilevelQueue';
  const needsQuantum = algorithmKey === 'roundRobin' || algorithmKey === 'multilevelQueue';
  const usesTextInput = algorithmKey === 'expressionEvaluation' || algorithmKey === 'balancedParentheses';
  const usesTreeValues = category === 'tree' && algorithmKey !== 'bstSearch';
  const usesGraphInput = category === 'graph';
  const usesDPInput = category === 'dp';

  function handleAlgorithmChange(key) {
    setAlgorithmKey(key);
    if (category === 'dp' && DP_DEFAULTS[key]) setDpInput(DP_DEFAULTS[key]);
  }

  const selectedAlgorithm = algorithms.find((a) => a.key === algorithmKey);

  function parseNumberList(str) {
    return str
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number);
  }

  function addProcess() {
    const nextId = `P${processes.length + 1}`;
    setProcesses([...processes, { id: nextId, arrival: 0, burst: 1, priority: 0 }]);
  }

  function removeProcess(index) {
    setProcesses(processes.filter((_, i) => i !== index));
  }

  function updateProcess(index, field, value) {
    setProcesses(processes.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (category === 'sorting') {
      const arr = customArray.trim() ? parseNumberList(customArray) : randomArray(arraySize);
      if (arr.some((n) => Number.isNaN(n))) return setError(t('config.invalidInput'));
      navigate('/simulate', { state: { category, algorithmKey, inputData: arr, settings: {} } });
      return;
    }

    if (category === 'searching') {
      const arr = customArray.trim() ? parseNumberList(customArray) : randomArray(arraySize);
      const targetNum = Number(target);
      if (arr.some((n) => Number.isNaN(n)) || Number.isNaN(targetNum)) return setError(t('config.invalidInput'));
      navigate('/simulate', { state: { category, algorithmKey, inputData: arr, settings: { target: targetNum } } });
      return;
    }

    if (category === 'scheduling') {
      if (processes.length === 0) return setError(t('config.needTwoProcesses'));
      const normalized = processes.map((p) => ({
        ...p,
        arrival: Number(p.arrival),
        burst: Number(p.burst),
        priority: Number(p.priority ?? 0),
      }));
      if (normalized.some((p) => Number.isNaN(p.arrival) || Number.isNaN(p.burst) || Number.isNaN(p.priority))) {
        return setError(t('config.invalidInput'));
      }
      navigate('/simulate', {
        state: { category, algorithmKey, inputData: normalized, settings: { quantum: Number(quantum) } },
      });
      return;
    }

    if (algorithmKey === 'bstSearch') {
      const tree = parseLevelOrder(treeStructure);
      const targetNum = Number(treeTarget);
      if (!tree || Number.isNaN(targetNum)) return setError(t('config.invalidTree'));
      navigate('/simulate', { state: { category, algorithmKey, inputData: tree, settings: { target: targetNum } } });
      return;
    }

    if (usesTextInput) {
      if (!textInput.trim()) return setError(t('config.invalidInput'));
      navigate('/simulate', { state: { category, algorithmKey, inputData: textInput.trim(), settings: {} } });
      return;
    }

    if (usesGraphInput) {
      if (!graphInput.trim()) return setError(t('config.invalidInput'));
      navigate('/simulate', { state: { category, algorithmKey, inputData: graphInput.trim(), settings: {} } });
      return;
    }

    if (usesDPInput) {
      if (!dpInput.trim()) return setError(t('config.invalidInput'));
      navigate('/simulate', { state: { category, algorithmKey, inputData: dpInput.trim(), settings: {} } });
      return;
    }

    const vals = parseNumberList(values);
    if (vals.some((n) => Number.isNaN(n))) return setError(t('config.invalidInput'));
    navigate('/simulate', { state: { category, algorithmKey, inputData: vals, settings: {} } });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/" className="mb-4 inline-block text-sm text-brand-600 dark:text-brand-400">
        ← {t('common.back')}
      </Link>

      <div className="card p-6">
        <h1 className="mb-1 text-xl font-extrabold text-slate-800 dark:text-slate-100">{t(`categories.${category}`)}</h1>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{t('config.title')}</p>

        {error && (
          <div className="mb-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-600 dark:bg-rose-900/30 dark:text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">{t('config.chooseAlgorithm')}</label>
            <select className="input" value={algorithmKey} onChange={(e) => handleAlgorithmChange(e.target.value)}>
              {algorithms.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.name[lang]}
                </option>
              ))}
            </select>
          </div>

          {(category === 'sorting' || category === 'searching') && (
            <>
              <div>
                <label className="label">
                  {t('config.arraySize')}: {arraySize}
                </label>
                <input
                  type="range"
                  min="4"
                  max="20"
                  value={arraySize}
                  onChange={(e) => setArraySize(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="label">{t('config.customArray')}</label>
                <input
                  className="input"
                  placeholder="5, 3, 8, 2, 9"
                  value={customArray}
                  onChange={(e) => setCustomArray(e.target.value)}
                />
              </div>
              {category === 'searching' && (
                <div>
                  <label className="label">{t('config.searchTarget')}</label>
                  <input className="input" value={target} onChange={(e) => setTarget(e.target.value)} required />
                </div>
              )}
            </>
          )}

          {category === 'scheduling' && (
            <div className="space-y-3">
              <label className="label">{t('config.addProcess')}</label>
              {processes.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    className="input"
                    value={p.id}
                    onChange={(e) => updateProcess(i, 'id', e.target.value)}
                    placeholder={t('config.processId')}
                  />
                  <input
                    type="number"
                    className="input"
                    value={p.arrival}
                    onChange={(e) => updateProcess(i, 'arrival', e.target.value)}
                    placeholder={t('config.arrivalTime')}
                  />
                  <input
                    type="number"
                    className="input"
                    value={p.burst}
                    onChange={(e) => updateProcess(i, 'burst', e.target.value)}
                    placeholder={t('config.burstTime')}
                  />
                  {needsPriority && (
                    <input
                      type="number"
                      className="input"
                      value={p.priority}
                      onChange={(e) => updateProcess(i, 'priority', e.target.value)}
                      placeholder={t('config.priority')}
                    />
                  )}
                  <button type="button" className="btn-danger !px-3" onClick={() => removeProcess(i)}>
                    🗑
                  </button>
                </div>
              ))}
              {needsPriority && <p className="text-xs text-slate-400 dark:text-slate-500">{t('config.priorityHint')}</p>}
              <button type="button" className="btn-outline" onClick={addProcess}>
                + {t('config.addProcess')}
              </button>

              {needsQuantum && (
                <div>
                  <label className="label">{t('config.timeQuantum')}</label>
                  <input
                    type="number"
                    min="1"
                    className="input"
                    value={quantum}
                    onChange={(e) => setQuantum(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {((category === 'linkedList' || category === 'stack' || category === 'queue' || category === 'hashing') &&
            !usesTextInput) ||
          usesTreeValues ? (
            <div>
              <label className="label">{t('config.initialValues')}</label>
              <input className="input" value={values} onChange={(e) => setValues(e.target.value)} />
            </div>
          ) : null}

          {usesTextInput && (
            <div>
              <label className="label">{t('config.textInput')}</label>
              <input
                dir="ltr"
                className="input font-mono"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={algorithmKey === 'balancedParentheses' ? '{[()()]}' : '(1+2)*(3-4)'}
              />
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                {algorithmKey === 'balancedParentheses' ? t('config.parenthesesHint') : t('config.expressionHint')}
              </p>
            </div>
          )}

          {usesGraphInput && (
            <div>
              <label className="label">{t('config.graphInput')}</label>
              <input
                dir="ltr"
                className="input font-mono"
                value={graphInput}
                onChange={(e) => setGraphInput(e.target.value)}
                placeholder="A-B:4,B-C:2,A-C:9"
              />
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{t('config.graphInputHint')}</p>
            </div>
          )}

          {usesDPInput && (
            <div>
              <label className="label">
                {algorithmKey === 'fibonacci' && t('config.dpFibonacci')}
                {algorithmKey === 'knapsack' && t('config.dpKnapsack')}
                {algorithmKey === 'lcs' && t('config.dpLcs')}
              </label>
              <input dir="ltr" className="input font-mono" value={dpInput} onChange={(e) => setDpInput(e.target.value)} />
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                {algorithmKey === 'fibonacci' && t('config.dpFibonacciHint')}
                {algorithmKey === 'knapsack' && t('config.dpKnapsackHint')}
                {algorithmKey === 'lcs' && t('config.dpLcsHint')}
              </p>
            </div>
          )}

          {category === 'tree' && algorithmKey === 'bstSearch' && (
            <>
              <div>
                <label className="label">{t('config.treeStructure')}</label>
                <input
                  dir="ltr"
                  className="input font-mono"
                  placeholder="8,3,10,1,6,,14,,,4,7,,,,13"
                  value={treeStructure}
                  onChange={(e) => setTreeStructure(e.target.value)}
                />
                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{t('config.treeStructureHint')}</p>
              </div>
              <div>
                <label className="label">{t('config.searchTarget')}</label>
                <input
                  className="input"
                  value={treeTarget}
                  onChange={(e) => setTreeTarget(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="btn-primary w-full">
            {t('config.startSimulation')}
          </button>
        </form>
      </div>

      {selectedAlgorithm && (
        <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
          {Object.entries(selectedAlgorithm.complexity).map(([k, v]) => (
            <div key={k} className="rounded-lg bg-white p-2 shadow-sm dark:bg-slate-800">
              <div className="text-slate-400 dark:text-slate-500">{k}</div>
              <div className="font-mono font-bold text-slate-700 dark:text-slate-200">{v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
