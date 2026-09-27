import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES, getAlgorithmsByCategory } from '../algorithms/registry';
import api from '../api/axios';

export default function AssignmentsWidget({ mySections, refreshKey }) {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isInstructor = user?.role === 'instructor';

  const [assignments, setAssignments] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('sorting');
  const [algorithmKey, setAlgorithmKey] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [expandedIds, setExpandedIds] = useState(() => new Set());

  const algorithms = useMemo(() => getAlgorithmsByCategory(category), [category]);

  function load() {
    api.get('/assignments').then((res) => setAssignments(res.data.assignments));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  async function handleCreate(e) {
    e.preventDefault();
    setError('');
    const algo = algorithmKey || algorithms[0]?.key;
    const section = sectionId || mySections?.[0]?._id;
    if (!title.trim() || !algo) return setError(t('assignments.invalidInput'));
    if (!section) return setError(t('sections.needSectionFirst'));
    try {
      await api.post('/assignments', { title: title.trim(), category, algorithm: algo, section, dueDate: dueDate || null });
      setTitle('');
      setDueDate('');
      load();
    } catch (err) {
      setError(err.response?.data?.message || t('common.error'));
    }
  }

  async function handleDelete(id) {
    await api.delete(`/assignments/${id}`);
    load();
  }

  function toggleExpanded(id) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  if (assignments === null) return null;

  return (
    <div className="card mb-8 p-5">
      <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-200">📝 {t('assignments.title')}</h3>

      {isInstructor && mySections?.length === 0 && (
        <p className="mb-3 text-xs text-amber-600 dark:text-amber-400">{t('sections.needSectionFirst')}</p>
      )}

      {isInstructor && mySections?.length > 0 && (
        <form onSubmit={handleCreate} className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-6">
          <input
            className="input lg:col-span-2"
            placeholder={t('assignments.assignmentTitle')}
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
          <select className="input" value={algorithmKey || algorithms[0]?.key || ''} onChange={(e) => setAlgorithmKey(e.target.value)}>
            {algorithms.map((a) => (
              <option key={a.key} value={a.key}>
                {a.name[lang]}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <input type="date" className="input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <button type="submit" className="btn-primary whitespace-nowrap !px-3">
              + {t('assignments.create')}
            </button>
          </div>
        </form>
      )}
      {error && <p className="mb-3 text-xs text-rose-600 dark:text-rose-400">{error}</p>}

      {assignments.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500">{t('assignments.none')}</p>
      ) : (
        <ul className="space-y-2">
          {assignments.map((a) => (
            <li key={a._id} className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">{a.title}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {t(`categories.${a.category}`)}
                    {a.sectionName && ` • ${a.sectionName}`}
                    {a.dueDate && ` • ${t('assignments.due')}: ${new Date(a.dueDate).toLocaleDateString()}`}
                    {!isInstructor && a.instructorName && ` • ${t('assignments.by')}: ${a.instructorName}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {isInstructor ? (
                    <>
                      <button
                        onClick={() => toggleExpanded(a._id)}
                        className="badge bg-brand-50 text-brand-600 hover:opacity-80 dark:bg-brand-900/40 dark:text-brand-300"
                      >
                        {a.submissionCount} {t('assignments.submissions')} {expandedIds.has(a._id) ? '▲' : '▼'}
                      </button>
                      <button onClick={() => handleDelete(a._id)} className="btn-danger !px-2 !py-1 text-xs">
                        🗑
                      </button>
                    </>
                  ) : (
                    <>
                      <span
                        className={`badge ${
                          a.completed
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                        }`}
                      >
                        {a.completed ? `✅ ${t('assignments.done')}` : `⏳ ${t('assignments.pending')}`}
                      </span>
                      {!a.completed && (
                        <button
                          onClick={() => navigate(`/configure/${a.category}?algorithm=${a.algorithm}`)}
                          className="btn-outline !px-2 !py-1 text-xs"
                        >
                          {t('assignments.start')} ←
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
              {isInstructor && expandedIds.has(a._id) && (
                <div className="mt-2 border-t border-slate-100 pt-2 dark:border-slate-700">
                  {a.students.length === 0 ? (
                    <p className="text-xs text-slate-400 dark:text-slate-500">{t('assignments.noSubmissions')}</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {a.students.map((name, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-emerald-50 px-2 py-1 text-xs text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        >
                          ✅ {name}
                        </span>
                      ))}
                    </div>
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
