import { parseGraph } from './buildGraph';

export function run(text) {
  const { nodes, edges, adjacency, nodeOrder } = parseGraph(text);
  const snapshots = [];

  if (!nodeOrder.length) {
    snapshots.push({ nodes, edges, mstEdges: [], visited: [], message: 'رسم بياني فارغ', tag: 'start' });
    return snapshots;
  }

  const start = nodeOrder[0];
  const inMst = new Set([start]);
  const mstEdges = [];

  snapshots.push({ nodes, edges, mstEdges: [], visited: [...inMst], message: `البدء من ${start}`, tag: 'start' });

  while (inMst.size < nodeOrder.length) {
    let best = null;
    inMst.forEach((u) => {
      (adjacency[u] || []).forEach(({ to, weight }) => {
        if (!inMst.has(to) && (!best || weight < best.weight)) {
          best = { from: u, to, weight };
        }
      });
    });

    if (!best) {
      snapshots.push({
        nodes,
        edges,
        mstEdges: [...mstEdges],
        visited: [...inMst],
        message: 'لا يوجد ضلع يصل لعقد جديدة (رسم غير متصل)',
        tag: 'unreachable',
      });
      break;
    }

    inMst.add(best.to);
    mstEdges.push(best);
    snapshots.push({
      nodes,
      edges,
      mstEdges: [...mstEdges],
      visited: [...inMst],
      message: `إضافة أصغر ضلع خارج الشجرة: ${best.from}-${best.to} (${best.weight})`,
      tag: 'accept-edge',
    });
  }

  snapshots.push({
    nodes,
    edges,
    mstEdges: [...mstEdges],
    visited: [...inMst],
    message: `اكتملت الشجرة الممتدة الصغرى، الوزن الكلي = ${mstEdges.reduce((s, e) => s + e.weight, 0)}`,
    tag: 'done',
  });
  return snapshots;
}

export default {
  key: 'prim',
  category: 'graph',
  name: { ar: 'خوارزمية بريم (Prim MST)', en: "Prim's Algorithm (MST)" },
  complexity: { best: 'O(E log V)', average: 'O(E log V)', worst: 'O(V²)', space: 'O(V)' },
  run,
};
