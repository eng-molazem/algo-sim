function layoutTree(root) {
  const nodes = [];
  const edges = [];
  let counter = 0;

  function walk(node, depth, parent) {
    if (!node) return;
    walk(node.left, depth + 1, node);
    const x = counter;
    counter += 1;
    nodes.push({ id: node.id, value: node.value, depth, x });
    if (parent) edges.push({ from: parent.id, to: node.id });
    walk(node.right, depth + 1, node);
  }

  walk(root, 0, null);
  return { nodes, edges };
}

export default function TreeVisualizer({ snapshot }) {
  if (!snapshot) return null;
  const { tree, activeId, path = [], insertedId, notFound, visited = [] } = snapshot;

  if (!tree) {
    return (
      <div className="grid h-64 place-items-center rounded-xl bg-slate-50 text-slate-400 dark:bg-slate-900/60 dark:text-slate-500">
        شجرة فارغة
      </div>
    );
  }

  const { nodes, edges } = layoutTree(tree);
  const spacingX = 70;
  const spacingY = 70;
  // These are logical coordinates only (an SVG viewBox), not final on-screen
  // pixels — the viewBox + preserveAspectRatio below scale the whole tree
  // down to fit the visible box on both axes, so it never needs to scroll.
  const width = Math.max(320, (nodes.length + 1) * spacingX);
  const height = (Math.max(...nodes.map((n) => n.depth)) + 1) * spacingY + 60;
  const posOf = (id) => nodes.find((n) => n.id === id);

  function nodeColor(node) {
    if (notFound && node.id === activeId) return '#ef4444';
    if (node.id === insertedId) return '#f97316';
    if (node.id === activeId) return '#16a34a';
    if (visited.includes(node.id)) return '#0891b2';
    if (path.includes(node.id)) return '#0ea5e9';
    return '#3a63f7';
  }

  return (
    <div className="flex h-72 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60 sm:h-80">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" className="h-full w-full">
        {edges.map((edge, i) => {
          const from = posOf(edge.from);
          const to = posOf(edge.to);
          return (
            <line
              key={i}
              x1={(from.x + 1) * spacingX}
              y1={from.depth * spacingY + 30}
              x2={(to.x + 1) * spacingX}
              y2={to.depth * spacingY + 30}
              stroke="#94a3b8"
              strokeWidth="2"
            />
          );
        })}
        {nodes.map((node) => (
          <g key={node.id} className="transition-all duration-300">
            <circle
              cx={(node.x + 1) * spacingX}
              cy={node.depth * spacingY + 30}
              r="22"
              fill={nodeColor(node)}
              className="transition-all duration-300"
            />
            <text
              x={(node.x + 1) * spacingX}
              y={node.depth * spacingY + 36}
              textAnchor="middle"
              fill="white"
              fontWeight="bold"
              fontSize="14"
            >
              {node.value}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
