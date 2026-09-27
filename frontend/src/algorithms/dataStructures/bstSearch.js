function cloneTree(node) {
  if (!node) return null;
  return { id: node.id, value: node.value, left: cloneTree(node.left), right: cloneTree(node.right) };
}

export function run(tree, target) {
  const snapshots = [];
  snapshots.push({ tree: cloneTree(tree), activeId: null, path: [], message: 'ابدأ البحث', tag: 'start' });

  const path = [];
  let current = tree;
  let found = false;
  let lastId = null;

  while (current) {
    lastId = current.id;
    snapshots.push({ tree: cloneTree(tree), activeId: current.id, path: [...path], pendingValue: target, tag: 'compare' });
    if (target === current.value) {
      found = true;
      break;
    }
    path.push(current.id);
    current = target < current.value ? current.left : current.right;
  }

  snapshots.push({
    tree: cloneTree(tree),
    activeId: lastId,
    path: [...path],
    notFound: !found,
    message: found ? `تم العثور على ${target}` : `القيمة ${target} غير موجودة في الشجرة`,
    tag: found ? 'found' : 'not-found',
  });

  return snapshots;
}

export default {
  key: 'bstSearch',
  category: 'tree',
  name: { ar: 'البحث في شجرة البحث الثنائية (BST Search)', en: 'BST Search' },
  complexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(n)', space: 'O(1)' },
  requiresPrebuiltTree: true,
  run,
};
