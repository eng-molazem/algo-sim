export default function GraphVisualizer({ snapshot }) {
  if (!snapshot) return null;
  const { nodes = [], edges = [], visited = [], activeId, current, frontier = [], mstEdges = [], distances = {} } = snapshot;

  if (!nodes.length) {
    return (
      <div className="grid h-72 place-items-center rounded-xl bg-slate-50 text-center text-slate-400 dark:bg-slate-900/60 dark:text-slate-500 sm:h-80">
        أدخل رسماً بيانياً بصيغة A-B,B-C:4 للبدء
      </div>
    );
  }

  const posOf = (id) => nodes.find((n) => n.id === id);

  function isMstEdge(e) {
    return mstEdges.some((m) => (m.from === e.from && m.to === e.to) || (m.from === e.to && m.to === e.from));
  }

  function nodeColor(id) {
    if (id === activeId || id === current) return '#16a34a';
    if (frontier.includes(id)) return '#f97316';
    if (visited.includes(id)) return '#0891b2';
    return '#3a63f7';
  }

  return (
    <div className="flex h-72 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60 sm:h-80">
      <svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
        {edges.map((e, i) => {
          const from = posOf(e.from);
          const to = posOf(e.to);
          if (!from || !to) return null;
          const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
          const mst = isMstEdge(e);
          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={mst ? '#16a34a' : '#94a3b8'}
                strokeWidth={mst ? 4 : 2}
                className="transition-all duration-300"
              />
              <circle cx={mid.x} cy={mid.y} r="9" fill="#f8fafc" className="dark:fill-slate-800" opacity="0.9" />
              <text x={mid.x} y={mid.y + 3} textAnchor="middle" fontSize="10" fill="#64748b" className="dark:fill-slate-300">
                {e.weight}
              </text>
            </g>
          );
        })}
        {nodes.map((node) => (
          <g key={node.id} className="transition-all duration-300">
            <circle cx={node.x} cy={node.y} r="18" fill={nodeColor(node.id)} className="transition-all duration-300" />
            <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white" fontWeight="bold" fontSize="13">
              {node.label}
            </text>
            {distances[node.id] !== undefined && (
              <text x={node.x} y={node.y - 24} textAnchor="middle" fontSize="11" fill="#0891b2" fontWeight="bold">
                {distances[node.id] === Infinity ? '∞' : distances[node.id]}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
