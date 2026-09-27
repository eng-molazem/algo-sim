import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function SectionsWidget({ mySections, onSectionsChange }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const isInstructor = user?.role === 'instructor';

  const [joinedSections, setJoinedSections] = useState(null);
  const [name, setName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  function loadJoined() {
    api.get('/sections/joined').then((res) => setJoinedSections(res.data.sections));
  }

  useEffect(() => {
    if (!isInstructor) loadJoined();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInstructor]);

  const sections = isInstructor ? mySections : joinedSections;

  async function handleCreate(e) {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError(t('sections.invalidName'));
    try {
      await api.post('/sections', { name: name.trim() });
      setName('');
      onSectionsChange?.();
    } catch (err) {
      setError(err.response?.data?.message || t('common.error'));
    }
  }

  async function handleJoin(e) {
    e.preventDefault();
    setError('');
    if (!joinCode.trim()) return setError(t('sections.invalidCode'));
    try {
      await api.post('/sections/join', { joinCode: joinCode.trim() });
      setJoinCode('');
      loadJoined();
      onSectionsChange?.();
    } catch (err) {
      setError(err.response?.data?.message || t('common.error'));
    }
  }

  async function handleDelete(id) {
    await api.delete(`/sections/${id}`);
    onSectionsChange?.();
  }

  function copyCode(id, code) {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  if (sections === null || sections === undefined) return null;

  return (
    <div className="card mb-8 p-5">
      <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-200">🏷️ {t('sections.title')}</h3>

      {isInstructor ? (
        <form onSubmit={handleCreate} className="mb-4 flex flex-wrap gap-2">
          <input
            className="input flex-1"
            placeholder={t('sections.namePlaceholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="btn-primary whitespace-nowrap">
            + {t('sections.create')}
          </button>
        </form>
      ) : (
        <form onSubmit={handleJoin} className="mb-4 flex flex-wrap gap-2">
          <input
            dir="ltr"
            className="input flex-1 font-mono"
            placeholder={t('sections.joinCodePlaceholder')}
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />
          <button type="submit" className="btn-primary whitespace-nowrap">
            {t('sections.join')}
          </button>
        </form>
      )}
      {error && <p className="mb-3 text-xs text-rose-600 dark:text-rose-400">{error}</p>}

      {sections.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500">{isInstructor ? t('sections.noneInstructor') : t('sections.noneStudent')}</p>
      ) : (
        <ul className="space-y-2">
          {sections.map((s) => (
            <li
              key={s._id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700"
            >
              <div>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{s.name}</p>
                {!isInstructor && (
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {t('assignments.by')}: {s.instructorName}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {isInstructor ? (
                  <>
                    <button
                      onClick={() => copyCode(s._id, s.joinCode)}
                      dir="ltr"
                      className="badge bg-brand-50 font-mono text-brand-600 hover:opacity-80 dark:bg-brand-900/40 dark:text-brand-300"
                      title={t('sections.copyCode')}
                    >
                      {copiedId === s._id ? `✅ ${t('sections.copied')}` : s.joinCode}
                    </button>
                    <span className="badge bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                      {s.studentCount} {t('sections.students')}
                    </span>
                    <button onClick={() => handleDelete(s._id)} className="btn-danger !px-2 !py-1 text-xs">
                      🗑
                    </button>
                  </>
                ) : (
                  <span dir="ltr" className="badge bg-slate-100 font-mono text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                    {s.joinCode}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
