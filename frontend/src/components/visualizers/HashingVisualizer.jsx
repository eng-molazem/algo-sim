export default function HashingVisualizer({ snapshot }) {
  if (!snapshot) return null;
  const { buckets = [], variant = 'chaining', activeIndex = null, pendingValue } = snapshot;
  const isChaining = variant === 'chaining';

  return (
    <div
      dir="ltr"
      className="flex h-72 flex-col gap-3 overflow-x-auto rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60 sm:h-80"
    >
      {pendingValue !== undefined && pendingValue !== null && (
        <div className="text-center text-xs text-slate-500 dark:text-slate-400">
          إدخال القيمة: <span className="font-mono font-bold text-brand-600 dark:text-brand-400">{pendingValue}</span>
        </div>
      )}
      <div className="flex flex-1 items-start justify-center gap-2">
        {buckets.map((bucket, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-xs text-slate-400 dark:text-slate-500">{i}</span>
            <div
              className={`flex min-h-[3.5rem] w-14 flex-col items-center justify-start gap-1 rounded-lg border-2 p-1 transition-all duration-300 ${
                i === activeIndex
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                  : 'border-slate-300 dark:border-slate-600'
              }`}
            >
              {isChaining
                ? (bucket || []).map((v, j) => (
                    <div key={j} className="grid h-8 w-8 flex-shrink-0 place-items-center rounded bg-brand-400 text-xs font-bold text-white">
                      {v}
                    </div>
                  ))
                : bucket !== null &&
                  bucket !== undefined && (
                    <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded bg-brand-400 text-xs font-bold text-white">
                      {bucket}
                    </div>
                  )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
