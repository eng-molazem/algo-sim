export default function QueueVisualizer({ snapshot }) {
  if (!snapshot) return null;
  const { items = [], action, highlightIndex, pendingValue, variant = 'plain', front, rear } = snapshot;
  const isCircular = variant === 'circular';

  function colorFor(i, value) {
    if (i === highlightIndex && action === 'dequeue') return 'bg-rose-500';
    if (i === highlightIndex && action === 'enqueue') return 'bg-emerald-600';
    if (isCircular && value === null) return 'bg-slate-200 dark:bg-slate-700';
    if (!isCircular && i === 0) return 'bg-emerald-700';
    if (isCircular && i === front) return 'bg-emerald-700';
    return 'bg-brand-300';
  }

  return (
    <div dir="ltr" className="flex h-56 flex-col items-center justify-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60">
      <div className="flex items-center gap-3">
        {action === 'entering' && (
          <div className="flex flex-col items-center gap-1 opacity-70">
            <span className="text-xs text-slate-400 dark:text-slate-500">Enqueue ↓</span>
            <div className="grid h-14 w-14 place-items-center rounded-lg bg-orange-400 font-bold text-white">{pendingValue}</div>
          </div>
        )}
        <div className="flex items-center gap-2 rounded-xl border-2 border-slate-300 p-3 dark:border-slate-600">
          {items.map((value, i) => (
            <div
              key={i}
              className={`grid h-14 w-14 flex-shrink-0 place-items-center rounded-lg font-bold text-white transition-all duration-300 ${colorFor(i, value)}`}
            >
              {value === null ? '' : value}
            </div>
          ))}
          {!isCircular && items.length === 0 && <div className="px-6 text-sm text-slate-400 dark:text-slate-500">فارغ</div>}
        </div>
      </div>
      {isCircular ? (
        <div className="flex w-full justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
          <span>Front = {front}</span>
          <span>Rear = {rear}</span>
        </div>
      ) : (
        <div className="flex w-full justify-between px-6 text-xs text-slate-500 dark:text-slate-400">
          <span>Front</span>
          <span>Rear</span>
        </div>
      )}
    </div>
  );
}
