/**
 * Parses a comma-separated edge list like "A-B,B-C:4,A-C:9" into a graph
 * with a deterministic circular layout, so any typed graph renders without
 * needing a force-directed layout step.
 */
export function parseGraph(text, directed = false) {
  const edgeStrs = (text || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const nodeOrder = [];
  const nodeSet = new Set();
  const edges = [];

  edgeStrs.forEach((str) => {
    const [pair, weightStr] = str.split(':');
    if (!pair) return;
    const [a, b] = pair.split('-').map((s) => s.trim());
    if (!a || !b) return;
    [a, b].forEach((n) => {
      if (!nodeSet.has(n)) {
        nodeSet.add(n);
        nodeOrder.push(n);
      }
    });
    const weight = weightStr !== undefined && weightStr !== '' ? Number(weightStr) : 1;
    edges.push({ from: a, to: b, weight: Number.isNaN(weight) ? 1 : weight });
  });

  const n = nodeOrder.length;
  const radius = n <= 1 ? 0 : 110;
  const cx = 150;
  const cy = 150;
  const nodes = nodeOrder.map((id, i) => {
    const angle = (2 * Math.PI * i) / Math.max(n, 1) - Math.PI / 2;
    return { id, label: id, x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });

  const adjacency = {};
  nodeOrder.forEach((id) => {
    adjacency[id] = [];
  });
  edges.forEach(({ from, to, weight }) => {
    adjacency[from].push({ to, weight });
    if (!directed) adjacency[to].push({ to: from, weight });
  });

  return { nodes, edges, adjacency, nodeOrder };
}
