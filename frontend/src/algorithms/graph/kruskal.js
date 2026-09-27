import { parseGraph } from './buildGraph';

function find(parent, x) {
  while (parent[x] !== x) x = parent[x];
  return x;
}

function union(parent, a, b) {
  parent[find(parent, a)] = find(parent, b);
}

export function run(text) {
  const { nodes, edges, nodeOrder } = parseGraph(text);
  const snapshots = [];

  if (!nodeOrder.length) {
    snapshots.push({ nodes, edges, mstEdges: [], message: 'رسم بياني فارغ', tag: 'start' });
    return snapshots;
  }

  const parent = {};
  nodeOrder.forEach((n) => {
    parent[n] = n;
  });
  const sorted = [...edges].sort((a, b) => a.weight - b.weight);
  const mstEdges = [];

  snapshots.push({
    nodes,
    edges,
    mstEdges: [],
    message: `ترتيب الأضلاع تصاعدياً حسب الوزن: ${sorted.map((e) => `${e.from}-${e.to}(${e.weight})`).join(', ')}`,
    tag: 'start',
  });

  sorted.forEach((e) => {
    const ra = find(parent, e.from);
    const rb = find(parent, e.to);
    if (ra !== rb) {
      union(parent, e.from, e.to);
      mstEdges.push(e);
      snapshots.push({
        nodes,
        edges,
        mstEdges: [...mstEdges],
        message: `قبول الضلع ${e.from}-${e.to} (${e.weight}) — لا يشكّل دورة`,
        tag: 'accept-edge',
      });
    } else {
      snapshots.push({
        nodes,
        edges,
        mstEdges: [...mstEdges],
        message: `رفض الضلع ${e.from}-${e.to} (${e.weight}) — يشكّل دورة`,
        tag: 'reject-edge',
      });
    }
  });

  snapshots.push({
    nodes,
    edges,
    mstEdges: [...mstEdges],
    message: `اكتملت الشجرة الممتدة الصغرى، الوزن الكلي = ${mstEdges.reduce((s, e) => s + e.weight, 0)}`,
    tag: 'done',
  });
  return snapshots;
}

export default {
  key: 'kruskal',
  category: 'graph',
  name: { ar: 'خوارزمية كروسكال (Kruskal MST)', en: "Kruskal's Algorithm (MST)" },
  complexity: { best: 'O(E log E)', average: 'O(E log E)', worst: 'O(E log E)', space: 'O(V)' },
  run,
};
