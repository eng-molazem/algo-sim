function cloneTree(node) {
  if (!node) return null;
  return { id: node.id, value: node.value, left: cloneTree(node.left), right: cloneTree(node.right) };
}

export function run(values) {
  let root = null;
  let counter = 0;
  const snapshots = [];

  snapshots.push({ tree: null, activeId: null, path: [], message: 'شجرة فارغة', tag: 'start' });

  values.forEach((value) => {
    const newId = `bst-${counter}`;
    counter += 1;
    const path = [];

    if (!root) {
      root = { id: newId, value, left: null, right: null };
      snapshots.push({
        tree: cloneTree(root),
        activeId: newId,
        path: [],
        insertedId: newId,
        message: `إدراج ${value} كجذر`,
        tag: 'insert',
      });
      return;
    }

    let current = root;
    while (current) {
      path.push(current.id);
      snapshots.push({ tree: cloneTree(root), activeId: current.id, path: [...path], pendingValue: value, tag: 'compare' });
      if (value < current.value) {
        if (!current.left) {
          current.left = { id: newId, value, left: null, right: null };
          snapshots.push({
            tree: cloneTree(root),
            activeId: newId,
            path: [...path],
            insertedId: newId,
            message: `إدراج ${value}`,
            tag: 'insert',
          });
          current = null;
        } else {
          current = current.left;
        }
      } else if (value > current.value) {
        if (!current.right) {
          current.right = { id: newId, value, left: null, right: null };
          snapshots.push({
            tree: cloneTree(root),
            activeId: newId,
            path: [...path],
            insertedId: newId,
            message: `إدراج ${value}`,
            tag: 'insert',
          });
          current = null;
        } else {
          current = current.right;
        }
      } else {
        snapshots.push({
          tree: cloneTree(root),
          activeId: current.id,
          path: [...path],
          message: `القيمة ${value} موجودة مسبقاً`,
          tag: 'duplicate',
        });
        current = null;
      }
    }
  });

  snapshots.push({ tree: cloneTree(root), activeId: null, path: [], message: 'اكتمل بناء الشجرة', tag: 'done' });
  return snapshots;
}

export default {
  key: 'bst',
  category: 'tree',
  name: { ar: 'شجرة البحث الثنائية (BST)', en: 'Binary Search Tree' },
  complexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)', space: 'O(n)' },
  run,
};
