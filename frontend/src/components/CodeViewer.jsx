import { useEffect, useMemo, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import { getAlgorithmCode, getActiveLines, LANGUAGES } from '../algorithms/code';
import api from '../api/axios';

const PRISM_LANG = {
  python: 'python',
  c: 'c',
  cpp: 'cpp',
  csharp: 'csharp',
  java: 'java',
  kotlin: 'kotlin',
  swift: 'swift',
  javascript: 'javascript',
  typescript: 'typescript',
  go: 'go',
  rust: 'rust',
  php: 'php',
};

const SANDBOX_ENTRY = {
  bubbleSort: (target) => `return bubbleSort(arr);`,
  mergeSort: () => `mergeSort(arr, 0, arr.length); return arr;`,
  quickSort: () => `quickSort(arr, 0, arr.length - 1); return arr;`,
  linearSearch: (target) => `return linearSearch(arr, ${target});`,
  binarySearch: (target) => `return binarySearch(arr, ${target});`,
};

function computeExpected(algorithmKey, inputData, target) {
  if (['bubbleSort', 'mergeSort', 'quickSort'].includes(algorithmKey)) {
    return [...inputData].sort((a, b) => a - b);
  }
  if (algorithmKey === 'linearSearch') return inputData.indexOf(target);
  if (algorithmKey === 'binarySearch') return [...inputData].sort((a, b) => a - b).indexOf(target);
  return null;
}

export default function CodeViewer({ algorithmKey, tag, inputData, target, large = false }) {
  const entry = getAlgorithmCode(algorithmKey);
  const [language, setLanguage] = useState(() => localStorage.getItem('codeLang') || 'python');
  const [editing, setEditing] = useState(false);
  const [editedCode, setEditedCode] = useState('');
  const [sandbox, setSandbox] = useState(null);
  const [sandboxError, setSandboxError] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState(null);
  const activeLineRef = useRef(null);

  const sandboxSupported = language === 'javascript' && !!SANDBOX_ENTRY[algorithmKey] && Array.isArray(inputData);

  useEffect(() => {
    localStorage.setItem('codeLang', language);
  }, [language]);

  useEffect(() => {
    setEditing(false);
    setSandbox(null);
    setSandboxError('');
    setShowLeaderboard(false);
    setLeaderboard(null);
    if (entry?.javascript) setEditedCode(entry.javascript.code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithmKey]);

  const activeLines = useMemo(() => getActiveLines(algorithmKey, language, tag), [algorithmKey, language, tag]);

  const lines = useMemo(() => {
    if (!entry || !entry[language]) return [];
    const grammar = Prism.languages[PRISM_LANG[language]];
    const code = entry[language].code;
    const highlighted = grammar ? Prism.highlight(code, grammar, PRISM_LANG[language]) : code;
    return highlighted.split('\n');
  }, [entry, language]);

  useEffect(() => {
    const line = activeLineRef.current;
    if (!line) return;
    // Scroll only the internal code panel, never the page — scrollIntoView()
    // would otherwise walk up and scroll the whole window to reveal it.
    const container = line.closest('.code-viewer');
    if (!container) return;
    const target = line.offsetTop - container.clientHeight / 2 + line.offsetHeight / 2;
    container.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
  }, [activeLines]);

  function runSandbox() {
    setSandboxError('');
    setSandbox(null);
    try {
      const arr = [...inputData];
      const body = `${editedCode}\n${SANDBOX_ENTRY[algorithmKey](target)}`;
      const start = performance.now();
      // eslint-disable-next-line no-new-func
      const fn = new Function('arr', body);
      const result = fn(arr);
      const time = (performance.now() - start).toFixed(3);
      const expected = computeExpected(algorithmKey, inputData, target);
      const isCorrect = JSON.stringify(result) === JSON.stringify(expected);
      setSandbox({ result, expected, isCorrect, time });
      if (isCorrect) {
        api.post('/sandbox/attempts', { algorithm: algorithmKey, timeMs: Number(time), isCorrect: true }).catch(() => {});
      }
    } catch (err) {
      setSandboxError(err.message);
    }
  }

  function toggleLeaderboard() {
    if (showLeaderboard) {
      setShowLeaderboard(false);
      return;
    }
    setShowLeaderboard(true);
    api
      .get(`/sandbox/leaderboard/${algorithmKey}`)
      .then((res) => setLeaderboard(res.data.leaderboard))
      .catch(() => setLeaderboard([]));
  }

  if (!entry) return null;

  const boxHeight = large ? 'max-h-[34rem]' : 'max-h-80';
  const codeTextSize = large ? 'text-xl' : 'text-sm';
  const lineNumWidth = large ? 'w-9' : 'w-5';
  const headerLabelSize = large ? 'text-base' : 'text-xs';
  const selectSize = large ? 'px-3 py-2 text-base' : 'px-2 py-1 text-xs';
  const editBtnSize = large ? 'px-4 py-2 text-base' : 'px-2 py-1 text-xs';

  return (
    <div className="card overflow-hidden p-0">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-2 dark:border-slate-700">
        <span
          className={`${headerLabelSize} font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500`}
        >
          Source Code
        </span>
        <div className="flex items-center gap-2">
          {sandboxSupported && (
            <button
              onClick={() => setEditing((e) => !e)}
              className={`rounded-lg font-semibold ${editBtnSize} ${
                editing
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200'
              }`}
            >
              ✏️ {editing ? 'إغلاق التحرير' : 'تحرير وتشغيل'}
            </button>
          )}
          <select
            className={`rounded-lg border border-slate-300 bg-white font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 ${selectSize}`}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {LANGUAGES.map((l) => (
              <option key={l.key} value={l.key}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {editing ? (
        <div className="p-3">
          <textarea
            dir="ltr"
            className={`code-viewer w-full resize-y rounded-lg border border-slate-300 bg-slate-50 p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-950/60 dark:text-slate-100 ${
              large ? 'h-80 text-lg' : 'h-56 text-sm'
            }`}
            value={editedCode}
            onChange={(e) => setEditedCode(e.target.value)}
            spellCheck={false}
          />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button onClick={runSandbox} className="btn-primary text-sm">
              ▶ تشغيل الكود الخاص بي
            </button>
            <button onClick={toggleLeaderboard} className="btn-outline text-sm">
              🏆 {showLeaderboard ? 'إخفاء لوحة الصدارة' : 'لوحة الصدارة'}
            </button>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              سيتم تشغيل الكود على مدخلات المحاكاة الحالية والتحقق من صحة النتيجة
            </span>
          </div>

          {showLeaderboard && (
            <div className="mt-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-900/60">
              <p className="mb-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                🏆 أسرع الحلول الصحيحة لهذه الخوارزمية
              </p>
              {leaderboard === null && <p className="text-xs text-slate-400 dark:text-slate-500">جارٍ التحميل...</p>}
              {leaderboard?.length === 0 && (
                <p className="text-xs text-slate-400 dark:text-slate-500">لا توجد محاولات صحيحة بعد، كن أول من يسجّل!</p>
              )}
              {leaderboard && leaderboard.length > 0 && (
                <ol className="space-y-1">
                  {leaderboard.map((entry, i) => (
                    <li key={entry.userId} className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`} {entry.name}
                      </span>
                      <span dir="ltr" className="font-mono text-xs text-slate-400 dark:text-slate-500">
                        {entry.bestTimeMs} ms
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}

          {sandboxError && (
            <div className="mt-3 rounded-lg bg-rose-50 p-3 text-sm text-rose-600 dark:bg-rose-900/30 dark:text-rose-300">
              خطأ: {sandboxError}
            </div>
          )}

          {sandbox && (
            <div
              className={`mt-3 rounded-lg p-3 text-sm ${
                sandbox.isCorrect
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
              }`}
            >
              <p className="font-bold">{sandbox.isCorrect ? '✅ النتيجة صحيحة' : '❌ النتيجة غير مطابقة للمتوقع'}</p>
              <p dir="ltr" className="mt-1 font-mono text-xs">
                Result: {JSON.stringify(sandbox.result)}
              </p>
              {!sandbox.isCorrect && (
                <p dir="ltr" className="font-mono text-xs">
                  Expected: {JSON.stringify(sandbox.expected)}
                </p>
              )}
              <p className="mt-1 text-xs opacity-75">{sandbox.time} ms</p>
            </div>
          )}
        </div>
      ) : (
        <div className={`code-viewer ${boxHeight} overflow-auto bg-slate-50 py-2 ${codeTextSize} dark:bg-slate-950/60`}>
          {lines.map((html, i) => {
            const lineNumber = i + 1;
            const isActive = activeLines.includes(lineNumber);
            return (
              <div
                key={lineNumber}
                ref={isActive ? activeLineRef : null}
                className={`code-line flex gap-4 px-4 ${isActive ? 'active' : ''}`}
              >
                <span
                  className={`${lineNumWidth} flex-shrink-0 select-none text-right text-slate-300 dark:text-slate-600`}
                >
                  {lineNumber}
                </span>
                <code className="whitespace-pre" dangerouslySetInnerHTML={{ __html: html || ' ' }} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
