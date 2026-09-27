import { useLanguage } from '../../i18n/LanguageContext';

const PALETTE = ['bg-sky-400', 'bg-emerald-400', 'bg-violet-400', 'bg-orange-400', 'bg-rose-400', 'bg-amber-400', 'bg-cyan-400'];

function colorForId(id, ids) {
  const idx = ids.indexOf(id);
  return PALETTE[idx % PALETTE.length];
}

export default function GanttVisualizer({ snapshot, processIds }) {
  const { t } = useLanguage();
  if (!snapshot) return null;
  const { gantt = [], activeId, processes } = snapshot;
  const totalTime = gantt.length ? gantt[gantt.length - 1].end : 1;

  return (
    <div className="space-y-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60">
      <div
        dir="ltr"
        className="relative flex h-16 w-full overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
      >
        {gantt.map((g, i) => (
          <div
            key={i}
            className={`flex items-center justify-center border-l border-white/40 text-sm font-bold text-white transition-all ${colorForId(g.id, processIds)} ${g.id === activeId ? 'ring-2 ring-slate-800 dark:ring-slate-100' : ''}`}
            style={{ width: `${((g.end - g.start) / totalTime) * 100}%` }}
            title={`${g.id}: ${g.start} - ${g.end}`}
          >
            {g.id}
          </div>
        ))}
        {gantt.length === 0 && <div className="grid w-full place-items-center text-slate-400 dark:text-slate-500">—</div>}
      </div>

      {processes && (
        <div className="overflow-x-auto">
          <table className="w-full text-center text-sm">
            <thead>
              <tr className="text-slate-500 dark:text-slate-400">
                <th className="p-2">{t('config.processId')}</th>
                <th className="p-2">{t('config.arrivalTime')}</th>
                <th className="p-2">{t('config.burstTime')}</th>
                <th className="p-2">Completion</th>
                <th className="p-2">Turnaround</th>
                <th className="p-2">Waiting</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((p) => (
                <tr key={p.id} className="border-t border-slate-100 dark:border-slate-700 dark:text-slate-200">
                  <td className="p-2 font-bold">{p.id}</td>
                  <td className="p-2">{p.arrival}</td>
                  <td className="p-2">{p.burst}</td>
                  <td className="p-2">{p.completion ?? '-'}</td>
                  <td className="p-2">{p.turnaround ?? '-'}</td>
                  <td className="p-2">{p.waiting ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
