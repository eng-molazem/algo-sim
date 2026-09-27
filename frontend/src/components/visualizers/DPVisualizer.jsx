export default function DPVisualizer({ snapshot }) {
  if (!snapshot) return null;
  const { dimension = '2d', table = [], rowLabels = [], colLabels = [], activeCell = null } = snapshot;

  function cellClass(isActive, isEmpty) {
    if (isActive) return 'bg-emerald-600 text-white';
    if (isEmpty) return 'bg-white text-slate-300 dark:bg-slate-800 dark:text-slate-600';
    return 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300';
  }

  if (dimension === '1d') {
    return (
      <div
        dir="ltr"
        className="flex h-72 flex-wrap items-center justify-center gap-2 overflow-auto rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60 sm:h-80"
      >
        {table.map((value, i) => {
          const isEmpty = value === null || value === undefined;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-xs text-slate-400 dark:text-slate-500">{colLabels[i] ?? i}</span>
              <div
                className={`grid h-12 w-12 place-items-center rounded-lg font-bold shadow transition-all duration-300 ${cellClass(i === activeCell, isEmpty)}`}
              >
                {isEmpty ? '' : value}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      className="flex h-72 items-center justify-center overflow-auto rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60 sm:h-80"
    >
      <table className="border-collapse text-xs">
        <thead>
          <tr>
            <th className="px-2 py-1" />
            {colLabels.map((c, j) => (
              <th key={j} className="px-2 py-1 font-mono text-slate-400 dark:text-slate-500">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.map((row, i) => (
            <tr key={i}>
              <th className="px-2 py-1 font-mono text-slate-400 dark:text-slate-500">{rowLabels[i] ?? i}</th>
              {row.map((value, j) => {
                const isActive = Array.isArray(activeCell) && activeCell[0] === i && activeCell[1] === j;
                const isEmpty = value === null || value === undefined;
                return (
                  <td
                    key={j}
                    className={`h-9 w-9 rounded border border-slate-200 text-center font-bold transition-all duration-300 dark:border-slate-700 ${cellClass(isActive, isEmpty)}`}
                  >
                    {isEmpty ? '' : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
