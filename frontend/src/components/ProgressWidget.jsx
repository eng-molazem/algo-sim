import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ALGORITHMS } from '../algorithms/registry';
import { getBadgeProgress } from '../utils/achievements';

export default function ProgressWidget() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();

  const completedCount = user?.completedAlgorithms?.length || 0;
  const totalCount = ALGORITHMS.length;
  const percent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
  const badges = getBadgeProgress(completedCount, totalCount);

  return (
    <div className="card mb-8 p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">{t('progress.title')}</h3>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {completedCount} / {totalCount} ({percent}%)
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            title={`${badge.name[lang]} — ${badge.threshold}`}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-opacity ${
              badge.unlocked
                ? 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-300'
                : 'border-slate-200 bg-slate-50 text-slate-400 opacity-60 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-500'
            }`}
          >
            <span className="text-lg">{badge.icon}</span>
            <span>{badge.name[lang]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
