import { parseGraph } from './buildGraph';

export function run(text) {
  const { nodes, edges, adjacency, nodeOrder } = parseGraph(text);
  const snapshots = [];

  if (!nodeOrder.length) {
    snapshots.push({ nodes, edges, visited: [], distances: {}, message: 'رسم بياني فارغ', tag: 'start' });
    return snapshots;
  }

  const start = nodeOrder[0];
  const dist = {};
  nodeOrder.forEach((n) => {
    dist[n] = Infinity;
  });
  dist[start] = 0;
  const visited = new Set();

  snapshots.push({
    nodes,
    edges,
    visited: [],
    distances: { ...dist },
    current: null,
    message: `البدء من ${start}، المسافة = 0`,
    tag: 'start',
  });

  while (visited.size < nodeOrder.length) {
    let u = null;
    let best = Infinity;
    nodeOrder.forEach((n) => {
      if (!visited.has(n) && dist[n] < best) {
        best = dist[n];
        u = n;
      }
    });
    if (u === null) break;
    visited.add(u);

    snapshots.push({
      nodes,
      edges,
      visited: [...visited],
      distances: { ...dist },
      current: u,
      message: `اختيار أقرب عقدة غير مزارة: ${u} (${dist[u]})`,
      tag: 'visit',
    });

    (adjacency[u] || []).forEach(({ to, weight }) => {
      if (visited.has(to)) return;
      const candidate = dist[u] + weight;
      if (candidate < dist[to]) {
        dist[to] = candidate;
        snapshots.push({
          nodes,
          edges,
          visited: [...visited],
          distances: { ...dist },
          current: u,
          message: `تحديث مسافة ${to} إلى ${candidate} عبر ${u}`,
          tag: 'relax',
        });
      }
    });
  }

  snapshots.push({
    nodes,
    edges,
    visited: [...visited],
    distances: { ...dist },
    current: null,
    message: 'اكتمل Dijkstra: أقصر المسافات من نقطة البداية',
    tag: 'done',
  });
  return snapshots;
}

export default {
  key: 'dijkstra',
  category: 'graph',
  name: { ar: 'خوارزمية دايكسترا (Dijkstra)', en: "Dijkstra's Algorithm" },
  complexity: { best: 'O(E log V)', average: 'O(E log V)', worst: 'O(V²)', space: 'O(V)' },
  run,
};
