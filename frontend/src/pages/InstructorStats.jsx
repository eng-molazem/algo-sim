import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { ALGORITHMS } from '../algorithms/registry';
import api from '../api/axios';

export default function InstructorStats() {
  const { t, lang } = useLanguage();
  const [overview, setOverview] = useState(null);
  const [assignments, setAssignments] = useState(null);
  const [quizzes, setQuizzes] = useState(null);

  useEffect(() => {
    api.get('/stats/overview').then((res) => setOverview(res.data));
    api.get('/assignments').then((res) => setAssignments(res.data.assignments));
    api.get('/quizzes/mine').then((res) => setQuizzes(res.data.quizzes));
  }, []);

  function algoName(key) {
    return ALGORITHMS.find((a) => a.key === key)?.name[lang] || key;
  }

  async function handleDownload() {
    const { generateClassReport } = await import('../utils/generateClassReport');
    generateClassReport({
      totalStudents: overview.totalStudents,
      averageCompleted: overview.averageCompleted,
      totalAlgorithms: ALGORITHMS.length,
      topAlgorithms: overview.topAlgorithms,
      assignments,
      quizzes,
    });
  }

  const loading = !overview || !assignments || !quizzes;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link to="/" className="mb-4 inline-block text-sm text-brand-600 dark:text-brand-400">
        ← {t('common.back')}
      </Link>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">📊 {t('stats.title')}</h1>
        {!loading && (
          <button onClick={handleDownload} className="btn-primary">
            📄 {t('stats.downloadReport')}
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-slate-400 dark:text-slate-500">{t('common.loading')}</p>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="card p-5 text-center">
              <p className="text-3xl font-extrabold text-brand-600 dark:text-brand-400">{overview.totalStudents}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('stats.totalStudents')}</p>
            </div>
            <div className="card p-5 text-center">
              <p className="text-3xl font-extrabold text-brand-600 dark:text-brand-400">
                {overview.averageCompleted} / {ALGORITHMS.length}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t('stats.avgCompleted')}</p>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-200">🔥 {t('stats.topAlgorithms')}</h3>
            {overview.topAlgorithms.length === 0 ? (
              <p className="text-sm text-slate-400 dark:text-slate-500">{t('stats.noData')}</p>
            ) : (
              <ul className="space-y-2">
                {overview.topAlgorithms.map((a) => {
                  const percent = overview.totalStudents ? Math.round((a.completedByCount / overview.totalStudents) * 100) : 0;
                  return (
                    <li key={a.algorithm}>
                      <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>{algoName(a.algorithm)}</span>
                        <span>
                          {a.completedByCount} ({percent}%)
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                        <div className="h-full rounded-full bg-brand-500" style={{ width: `${percent}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="card p-5">
            <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-200">📝 {t('assignments.title')}</h3>
            {assignments.length === 0 ? (
              <p className="text-sm text-slate-400 dark:text-slate-500">{t('assignments.none')}</p>
            ) : (
              <ul className="space-y-1 text-sm">
                {assignments.map((a) => (
                  <li key={a._id} className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-300">{a.title}</span>
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                      {a.submissionCount}/{overview.totalStudents}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card p-5">
            <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-200">🧪 {t('quizzes.title')}</h3>
            {quizzes.length === 0 ? (
              <p className="text-sm text-slate-400 dark:text-slate-500">{t('quizzes.none')}</p>
            ) : (
              <ul className="space-y-1 text-sm">
                {quizzes.map((q) => (
                  <li key={q._id} className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-300">{q.title}</span>
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                      {q.attemptCount} {t('quizzes.attempts')}
                      {q.avgScorePercent !== null && ` • ${q.avgScorePercent}%`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
