export default function LinkedListVisualizer({ snapshot }) {
  if (!snapshot) return null;
  const { nodes = [], activeIndex = null, newIndex = null, deletingIndex = null, variant = 'singly' } = snapshot;
  const isDoubly = variant === 'doubly';
  const isCircular = variant === 'circular';

  function colorFor(i) {
    if (i === deletingIndex) return 'bg-slate-300 opacity-50';
    if (i === newIndex) return 'bg-orange-400';
    if (i === activeIndex) return 'bg-sky-600';
    return 'bg-brand-300';
  }

  return (
    <div dir="ltr" className="flex h-56 items-center gap-3 overflow-x-auto rounded-xl bg-slate-50 p-6 dark:bg-slate-900/60">
      {isDoubly && nodes.length > 0 && (
        <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-lg border-2 border-dashed border-slate-300 text-xs font-bold text-slate-400 dark:border-slate-600 dark:text-slate-500">
          NULL
        </div>
      )}
      {nodes.map((node, i) => (
        <div key={node.id} className="flex items-center gap-2">
          {isDoubly && i > 0 && <span className="text-lg text-slate-400 dark:text-slate-500">⇄</span>}
          <div
            className={`grid h-16 w-16 flex-shrink-0 place-items-center rounded-xl font-bold text-white shadow transition-all duration-300 ${colorFor(i)}`}
          >
            {node.value}
          </div>
          {!isDoubly && <span className="text-2xl text-slate-400 dark:text-slate-500">→</span>}
        </div>
      ))}
      {isCircular ? (
        <div className="flex flex-shrink-0 items-center gap-2 text-slate-400 dark:text-slate-500">
          <span className="text-2xl">↺</span>
          <span className="text-xs font-bold">يعود إلى الرأس (HEAD)</span>
        </div>
      ) : (
        <div className="grid h-14 w-16 flex-shrink-0 place-items-center rounded-lg border-2 border-dashed border-slate-300 text-xs font-bold text-slate-400 dark:border-slate-600 dark:text-slate-500">
          NULL
        </div>
      )}
    </div>
  );
}
