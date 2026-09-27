export default function StackVisualizer({ snapshot }) {
  if (!snapshot) return null;
  const { items = [], action, highlightIndex, pendingValue } = snapshot;

  function colorFor(i) {
    if (i === highlightIndex && action === 'pop') return 'bg-rose-500';
    if (i === highlightIndex && action === 'push') return 'bg-emerald-600';
    if (i === items.length - 1) return 'bg-emerald-700';
    return 'bg-brand-300';
  }

  return (
    <div dir="ltr" className="flex h-72 items-end justify-center gap-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60">
      {action === 'entering' && (
        <div className="flex flex-col items-center gap-1 opacity-70">
          <div className="grid h-12 w-20 place-items-center rounded-lg bg-orange-400 font-bold text-white">{pendingValue}</div>
          <span className="text-xs text-slate-400 dark:text-slate-500">↓ Push</span>
        </div>
      )}
      <div className="flex w-24 flex-col-reverse items-center gap-1 rounded-b-xl border-2 border-t-0 border-slate-300 p-2 dark:border-slate-600">
        {items.map((value, i) => (
          <div
            key={i}
            className={`grid h-12 w-full place-items-center rounded-lg font-bold text-white transition-all duration-300 ${colorFor(i)}`}
          >
            {value}
          </div>
        ))}
        {items.length === 0 && <div className="text-sm text-slate-400 dark:text-slate-500">فارغ</div>}
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Top {' '}
        <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{items.length ? items.length - 1 : '-'}</span>
      </div>
    </div>
  );
}
