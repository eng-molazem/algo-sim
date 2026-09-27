import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ALGORITHMS, CATEGORIES, getAlgorithmsByCategory } from '../algorithms/registry';
import api from '../api/axios';

function TakeQuiz({ quiz, onDone }) {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState(() => new Array(quiz.questions.length).fill(null));
  const [result, setResult] = useState(null);

  async function submit() {
    if (answers.some((a) => a === null)) return;
    const res = await api.post(`/quizzes/${quiz._id}/attempts`, { answers });
    setResult(res.data);
  }

  return (
    <div className="mt-3 space-y-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
      {quiz.questions.map((q, qi) => (
        <div key={qi}>
          <p className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
            {qi + 1}. {q.text}
          </p>
          <div className="flex flex-col gap-1">
            {q.options.map((opt, oi) => {
              const isSelected = answers[qi] === oi;
              const showFeedback = result && qi < result.results.length;
              const isCorrectOption = showFeedback && oi === result.results[qi].correctIndex;
              return (
                <label
                  key={oi}
                  className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm ${
                    showFeedback
                      ? isCorrectOption
                        ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                        : isSelected
                          ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20'
                          : 'border-slate-200 dark:border-slate-700'
                      : isSelected
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30'
                        : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    className="me-2"
                    checked={isSelected}
                    disabled={!!result}
                    onChange={() => setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)))}
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      {result ? (
        <div className="rounded-lg bg-brand-50 p-3 text-center text-sm font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
          {t('quizzes.score')}: {result.score} / {result.total}
          <button onClick={onDone} className="btn-outline ms-3 !py-1 text-xs">
            {t('quizzes.close')}
          </button>
        </div>
      ) : (
        <button onClick={submit} disabled={answers.some((a) => a === null)} className="btn-primary w-full text-sm">
          {t('quizzes.submit')}
        </button>
      )}
    </div>
  );
}

export default function QuizzesWidget({ mySections, refreshKey }) {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const isInstructor = user?.role === 'instructor';

  const [category, setCategory] = useState('sorting');
  const [algorithmKey, setAlgorithmKey] = useState('');
  const [title, setTitle] = useState('');
  const [rawQuestions, setRawQuestions] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [error, setError] = useState('');
  const [myQuizzes, setMyQuizzes] = useState(null);
  const [availableQuizzes, setAvailableQuizzes] = useState(null);
  const [activeQuizId, setActiveQuizId] = useState(null);
  const [expandedIds, setExpandedIds] = useState(() => new Set());

  function toggleExpanded(id) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const algorithms = useMemo(() => getAlgorithmsByCategory(category), [category]);

  function loadMine() {
    api.get('/quizzes/mine').then((res) => setMyQuizzes(res.data.quizzes));
  }

  function loadAvailable() {
    api.get('/quizzes').then((res) => setAvailableQuizzes(res.data.quizzes));
  }

  useEffect(() => {
    if (isInstructor) loadMine();
    else loadAvailable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInstructor, refreshKey]);

  async function handleCreate(e) {
    e.preventDefault();
    setError('');
    const algo = algorithmKey || algorithms[0]?.key;
    const section = sectionId || mySections?.[0]?._id;
    if (!title.trim() || !algo || !rawQuestions.trim()) return setError(t('quizzes.invalidInput'));
    if (!section) return setError(t('sections.needSectionFirst'));
    try {
      await api.post('/quizzes', { title: title.trim(), category, algorithm: algo, rawQuestions, section });
      setTitle('');
      setRawQuestions('');
      loadMine();
    } catch (err) {
      setError(err.response?.data?.message || t('common.error'));
    }
  }

  async function handleDelete(id) {
    await api.delete(`/quizzes/${id}`);
    loadMine();
  }

  function algoName(key) {
    return ALGORITHMS.find((a) => a.key === key)?.name[lang] || key;
  }

  if (isInstructor) {
    if (myQuizzes === null) return null;
    return (
      <div className="card mb-8 p-5">
        <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-200">🧪 {t('quizzes.title')}</h3>

        {mySections?.length === 0 && (
          <p className="mb-3 text-xs text-amber-600 dark:text-amber-400">{t('sections.needSectionFirst')}</p>
        )}

        {mySections?.length > 0 && (
          <form onSubmit={handleCreate} className="mb-4 space-y-2">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
              <input
                className="input sm:col-span-2"
                placeholder={t('quizzes.quizTitle')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select className="input" value={sectionId || mySections[0]._id} onChange={(e) => setSectionId(e.target.value)}>
                {mySections.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <select className="input" value={category} onChange={(e) => { setCategory(e.target.value); setAlgorithmKey(''); }}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {t(`categories.${c}`)}
                  </option>
                ))}
              </select>
            </div>
            <select className="input" value={algorithmKey || algorithms[0]?.key || ''} onChange={(e) => setAlgorithmKey(e.target.value)}>
              {algorithms.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.name[lang]}
                </option>
              ))}
            </select>
            <textarea
              dir="ltr"
              className="input h-24 font-mono text-xs"
              placeholder={'Question?|Option A;Option B;Option C|correctOptionIndex'}
              value={rawQuestions}
              onChange={(e) => setRawQuestions(e.target.value)}
            />
            <p className="text-xs text-slate-400 dark:text-slate-500">{t('quizzes.formatHint')}</p>
            <button type="submit" className="btn-primary">
              + {t('quizzes.create')}
            </button>
          </form>
        )}
        {error && <p className="mb-3 text-xs text-rose-600 dark:text-rose-400">{error}</p>}

        {myQuizzes.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">{t('quizzes.none')}</p>
        ) : (
          <ul className="space-y-2">
            {myQuizzes.map((q) => (
              <li key={q._id} className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-700 dark:text-slate-200">{q.title}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {algoName(q.algorithm)}
                      {q.sectionName && ` • ${q.sectionName}`}
                      {q.avgScorePercent !== null && ` • ${t('quizzes.avgScore')}: ${q.avgScorePercent}%`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleExpanded(q._id)}
                      className="badge bg-brand-50 text-brand-600 hover:opacity-80 dark:bg-brand-900/40 dark:text-brand-300"
                    >
                      {q.attemptCount} {t('quizzes.attempts')} {expandedIds.has(q._id) ? '▲' : '▼'}
                    </button>
                    <button onClick={() => handleDelete(q._id)} className="btn-danger !px-2 !py-1 text-xs">
                      🗑
                    </button>
                  </div>
                </div>
                {expandedIds.has(q._id) && (
                  <div className="mt-2 border-t border-slate-100 pt-2 dark:border-slate-700">
                    {q.students.length === 0 ? (
                      <p className="text-xs text-slate-400 dark:text-slate-500">{t('quizzes.noAttempts')}</p>
                    ) : (
                      <ul className="space-y-1">
                        {q.students.map((s, i) => (
                          <li key={i} className="flex items-center justify-between text-xs">
                            <span className="text-slate-600 dark:text-slate-300">{s.name}</span>
                            <span
                              className={`font-mono font-bold ${
                                s.score === s.total ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'
                              }`}
                            >
                              {s.score} / {s.total}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  if (availableQuizzes === null) return null;

  return (
    <div className="card mb-8 p-5">
      <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-200">🧪 {t('quizzes.title')}</h3>
      {availableQuizzes.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500">{t('quizzes.none')}</p>
      ) : (
        <ul className="space-y-2">
          {availableQuizzes.map((q) => (
            <li key={q._id} className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">{q.title}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {algoName(q.algorithm)} • {q.questions.length} {t('quizzes.questions')}
                    {q.sectionName && ` • ${q.sectionName}`}
                    {q.instructorName && ` • ${t('assignments.by')}: ${q.instructorName}`}
                  </p>
                </div>
                <button
                  onClick={() => setActiveQuizId(activeQuizId === q._id ? null : q._id)}
                  className="btn-outline !px-3 !py-1 text-xs"
                >
                  {activeQuizId === q._id ? t('quizzes.close') : t('quizzes.start')}
                </button>
              </div>
              {activeQuizId === q._id && <TakeQuiz quiz={q} onDone={() => setActiveQuizId(null)} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
