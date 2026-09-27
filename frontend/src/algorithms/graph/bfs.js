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
  const seen = new Set([start]);
  const queue = [start];

  snapshots.push({ nodes, edges, visited: [], frontier: [...queue], current: null, message: `البدء من ${start}`, tag: 'start' });

  while (queue.length) {
    const node = queue.shift();
    snapshots.push({
      nodes,
      edges,
      visited: [...visited],
      frontier: [...queue],
      current: node,
      message: `زيارة ${node}`,
      tag: 'visit',
    });
    visited.push(node);

    (adjacency[node] || []).forEach(({ to }) => {
      if (!seen.has(to)) {
        seen.add(to);
        queue.push(to);
        snapshots.push({
          nodes,
          edges,
          visited: [...visited],
          frontier: [...queue],
          current: node,
          message: `إضافة ${to} إلى الطابور`,
          tag: 'enqueue',
        });
      }
    });
  }

  snapshots.push({
    nodes,
    edges,
    visited: [...visited],
    frontier: [],
    current: null,
    message: `اكتمل BFS: ${visited.join(' → ')}`,
    tag: 'done',
  });
  return snapshots;
}

export default {
  key: 'bfs',
  category: 'graph',
  name: { ar: 'البحث بالعرض أولاً (BFS)', en: 'Breadth-First Search' },
  complexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)' },
  run,
};
