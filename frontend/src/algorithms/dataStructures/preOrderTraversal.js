import { buildBstFromValues } from './buildTree';

function cloneTree(node) {
  if (!node) return null;
  return { id: node.id, value: node.value, left: cloneTree(node.left), right: cloneTree(node.right) };
}

export function run(values) {
  const root = buildBstFromValues(values);
  const treeSnapshot = cloneTree(root);
  const snapshots = [];
  const visited = [];
  const output = [];

  snapshots.push({ tree: treeSnapshot, activeId: null, visited: [], message: 'شجرة جاهزة، البدء بالتجوال بالسابقة', tag: 'start' });

  function walk(node) {
    if (!node) return;
    visited.push(node.id);
    output.push(node.value);
    snapshots.push({
      tree: treeSnapshot,
      activeId: node.id,
      visited: [...visited],
      outputSoFar: output.join(', '),
      message: `زيارة ${node.value} قبل أبنائه`,
      tag: 'visit',
    });
    walk(node.left);
    walk(node.right);
  }

  walk(root);

  snapshots.push({
    tree: treeSnapshot,
    activeId: null,
    visited: [...visited],
    outputSoFar: output.join(', '),
    message: `اكتمل التجوال: ${output.join(', ')}`,
    tag: 'done',
  });

  return snapshots;
}

export default {
  key: 'preOrderTraversal',
  category: 'tree',
  name: { ar: 'التجوال بالسابقة (Pre-order Traversal)', en: 'Pre-order Traversal' },
  complexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(n)' },
  run,
};
