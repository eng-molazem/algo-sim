import { useLanguage } from '../i18n/LanguageContext';

export default function ComplexityPanel({ complexity }) {
  const { t } = useLanguage();
  if (!complexity) return null;

  const rows = [
    {
      label: t('complexity.best'),
      value: complexity.best,
      color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    },
    {
      label: t('complexity.average'),
      value: complexity.average,
      color: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    },
    {
      label: t('complexity.worst'),
      value: complexity.worst,
      color: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
    },
    {
      label: t('complexity.space'),
      value: complexity.space,
      color: 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
    },
  ];

  return (
    <div className="card p-4">
      <h3 className="mb-3 font-bold text-slate-700 dark:text-slate-200">{t('complexity.title')}</h3>
      <div className="grid grid-cols-2 gap-2">
        {rows.map((row) => (
          <div key={row.label} className={`rounded-xl p-3 text-center ${row.color}`}>
            <div className="text-xs">{row.label}</div>
            <div className="font-mono text-lg font-bold">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
