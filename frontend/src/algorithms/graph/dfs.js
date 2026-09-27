import { parseGraph } from './buildGraph';

export function run(text) {
  const { nodes, edges, adjacency, nodeOrder } = parseGraph(text);
  const snapshots = [];

  if (!nodeOrder.length) {
    snapshots.push({ nodes, edges, visited: [], frontier: [], message: 'رسم بياني فارغ', tag: 'start' });
    return snapshots;
  }

  const start = nodeOrder[0];
  const visited = [];
  const seen = new Set();
  const stack = [start];

  snapshots.push({ nodes, edges, visited: [], frontier: [...stack], current: null, message: `البدء من ${start}`, tag: 'start' });

  while (stack.length) {
    const node = stack.pop();
    if (seen.has(node)) continue;
    seen.add(node);

    snapshots.push({
      nodes,
      edges,
      visited: [...visited],
      frontier: [...stack],
      current: node,
      message: `زيارة ${node}`,
      tag: 'visit',
    });
    visited.push(node);

    const neighbors = (adjacency[node] || []).map((e) => e.to).filter((n) => !seen.has(n));
    [...neighbors].reverse().forEach((n) => {
      stack.push(n);
      snapshots.push({
        nodes,
        edges,
        visited: [...visited],
        frontier: [...stack],
        current: node,
        message: `دفع ${n} إلى المكدس`,
        tag: 'push',
      });
    });
  }

  snapshots.push({
    nodes,
    edges,
    visited: [...visited],
    frontier: [],
    current: null,
    message: `اكتمل DFS: ${visited.join(' → ')}`,
    tag: 'done',
  });
  return snapshots;
}

export default {
  key: 'dfs',
  category: 'graph',
  name: { ar: 'البحث بالعمق أولاً (DFS)', en: 'Depth-First Search' },
  complexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)' },
  run,
};
