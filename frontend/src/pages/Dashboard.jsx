import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES, ALGORITHMS } from '../algorithms/registry';
import api from '../api/axios';
import TiltCard from '../components/common/TiltCard';
import ProgressWidget from '../components/ProgressWidget';
import SectionsWidget from '../components/SectionsWidget';
import AssignmentsWidget from '../components/AssignmentsWidget';
import QuizzesWidget from '../components/QuizzesWidget';

const NetworkBackground = lazy(() => import('../components/three/NetworkBackground'));

const ICONS = {
  sorting: '📊',
  searching: '🔍',
  scheduling: '🗓️',
  linkedList: '🔗',
  stack: '📚',
  queue: '🎫',
  tree: '🌳',
  graph: '🕸️',
  dp: '🧩',
  hashing: '🗂️',
};

const CATEGORY_GRADIENTS = {
  sorting: 'from-sky-500 to-blue-600',
  searching: 'from-fuchsia-500 to-purple-600',
  scheduling: 'from-amber-500 to-orange-600',
  linkedList: 'from-teal-500 to-emerald-600',
  stack: 'from-rose-500 to-pink-600',
  queue: 'from-cyan-500 to-sky-600',
  tree: 'from-lime-500 to-green-600',
  graph: 'from-indigo-500 to-violet-600',
  dp: 'from-amber-500 to-yellow-600',
  hashing: 'from-slate-500 to-zinc-600',
};

export default function Dashboard() {
  const { t, lang } = useLanguage();
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [mySections, setMySections] = useState(null);
  const [sectionsVersion, setSectionsVersion] = useState(0);
  const isInstructor = user?.role === 'instructor';

  const loadMySections = useCallback(() => {
    if (isInstructor) api.get('/sections/mine').then((res) => setMySections(res.data.sections));
    setSectionsVersion((v) => v + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInstructor]);

  useEffect(() => {
    loadMySections();
  }, [loadMySections]);

  const filteredAlgorithms = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return ALGORITHMS.filter(
      (a) => a.name.ar.toLowerCase().includes(q) || a.name.en.toLowerCase().includes(q) || a.key.toLowerCase().includes(q)
    );
  }, [query]);

  async function toggleInstructorMode() {
    await updateProfile({ instructorModeEnabled: !user.instructorModeEnabled });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 shadow-elevated sm:px-10">
        <div className="absolute inset-0 bg-mesh-dark" />
        <Suspense fallback={null}>
          <NetworkBackground className="absolute inset-0 opacity-70" nodeCount={30} />
        </Suspense>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="animate-fade-up">
            <h1 className="text-3xl font-extrabold text-white">
              {t('dashboard.welcome')}, <span className="gradient-text">{user?.name}</span>
            </h1>
            <p className="mt-2 max-w-lg text-slate-300">{t('dashboard.subtitle')}</p>
          </div>
          {user?.role === 'instructor' && (
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 backdrop-blur">
              <input type="checkbox" checked={!!user.instructorModeEnabled} onChange={toggleInstructorMode} />
              <span className="text-sm font-medium text-white">{t('dashboard.instructorMode')}</span>
            </label>
          )}
        </div>
      </div>

      <ProgressWidget />
      <SectionsWidget mySections={mySections} onSectionsChange={loadMySections} />
      <AssignmentsWidget mySections={mySections} refreshKey={sectionsVersion} />
      <QuizzesWidget mySections={mySections} refreshKey={sectionsVersion} />

      <div className="mb-8">
        <input
          className="input max-w-lg"
          placeholder={t('dashboard.searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query.trim() && (
          <div className="mt-3 card divide-y divide-slate-100 dark:divide-slate-700">
            {filteredAlgorithms.length === 0 && (
              <div className="p-4 text-sm text-slate-400 dark:text-slate-500">{t('dashboard.noResults')}</div>
            )}
            {filteredAlgorithms.map((a) => (
              <button
                key={a.key}
                className="flex w-full items-center justify-between p-4 text-start hover:bg-slate-50 dark:hover:bg-slate-700/50"
                onClick={() => navigate(`/configure/${a.category}?algorithm=${a.key}`)}
              >
                <span className="font-medium text-slate-700 dark:text-slate-200">{a.name[lang]}</span>
                <span className="badge bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                  {t(`categories.${a.category}`)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat, i) => (
          <TiltCard key={cat} maxTilt={8} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <button
              onClick={() => navigate(`/configure/${cat}`)}
              className="card group flex h-full w-full flex-col items-start gap-3 p-6 text-start transition-shadow hover:shadow-glow"
            >
              <span
                className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-2xl text-white shadow-elevated ${CATEGORY_GRADIENTS[cat]}`}
              >
                {ICONS[cat]}
              </span>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                {t(`categories.${cat}`)}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t(`categoryDesc.${cat}`)}</p>
            </button>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
