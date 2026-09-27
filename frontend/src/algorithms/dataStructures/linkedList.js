export function run(values) {
  const nodes = [];
  const snapshots = [];

  snapshots.push({ nodes: [], activeIndex: null, newIndex: null, message: 'قائمة فارغة', tag: 'start' });

  values.forEach((value, i) => {
    snapshots.push({ nodes: [...nodes], activeIndex: nodes.length - 1, newIndex: null, pendingValue: value, tag: 'traverse' });
    for (let j = 0; j < nodes.length; j += 1) {
      snapshots.push({ nodes: [...nodes], activeIndex: j, newIndex: null, pendingValue: value, tag: 'traverse' });
    }
    nodes.push({ id: `n${i}`, value });
    snapshots.push({ nodes: [...nodes], activeIndex: null, newIndex: nodes.length - 1, message: `إدراج ${value}`, tag: 'insert' });
  });

  if (nodes.length > 1) {
    const removed = nodes[1];
    snapshots.push({
      nodes: [...nodes],
      activeIndex: null,
      newIndex: null,
      deletingIndex: 1,
      message: `حذف ${removed.value}`,
      tag: 'delete',
    });
    nodes.splice(1, 1);
    snapshots.push({ nodes: [...nodes], activeIndex: null, newIndex: null, message: 'بعد عملية الحذف', tag: 'after-delete' });
  }

  return snapshots;
}

export default {
  key: 'linkedList',
  category: 'linkedList',
  name: { ar: 'القائمة الوصلية (Singly Linked List)', en: 'Singly Linked List' },
  complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(n)' },
  run,
};
