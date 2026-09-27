export default function ArrayVisualizer({ snapshot }) {
  if (!snapshot) return null;
  const { array, comparing = [], merging = [], pivot = null, sortedIndices = [] } = snapshot;
  const max = Math.max(...array, 1);

  function colorFor(i) {
    if (sortedIndices.includes(i)) return 'bg-emerald-500';
    if (pivot === i) return 'bg-rose-500';
    if (comparing.includes(i)) return 'bg-orange-400';
    if (merging.includes(i)) return 'bg-violet-300';
    return 'bg-brand-300';
  }

  return (
    <div dir="ltr" className="flex h-64 items-end justify-center gap-1.5 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60">
      {array.map((value, i) => (
        <div key={i} className="flex flex-col items-center gap-1" style={{ width: `${Math.max(24, 320 / array.length)}px` }}>
          <div
            className={`w-full rounded-t-md transition-all duration-300 ${colorFor(i)}`}
            style={{ height: `${(value / max) * 200 + 8}px` }}
          />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{value}</span>
        </div>
      ))}
    </div>
  );
}
