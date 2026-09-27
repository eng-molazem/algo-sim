export function run(values) {
  const nodes = [];
  const snapshots = [];

  snapshots.push({ nodes: [], activeIndex: null, newIndex: null, variant: 'circular', message: 'قائمة دائرية فارغة', tag: 'start' });

  values.forEach((value, i) => {
    nodes.push({ id: `n${i}`, value });
    snapshots.push({
      nodes: [...nodes],
      activeIndex: null,
      newIndex: nodes.length - 1,
      variant: 'circular',
      message: `إدراج ${value} (يشير الأخير إلى الرأس دائماً)`,
      tag: 'insert',
    });
  });

  if (nodes.length > 0) {
    const lap = [...Array(nodes.length).keys(), ...Array(Math.min(2, nodes.length)).keys()];
    lap.forEach((i, step) => {
      const wrapping = step === nodes.length;
      snapshots.push({
        nodes: [...nodes],
        activeIndex: i,
        newIndex: null,
        variant: 'circular',
        message: wrapping ? `التفاف: من آخر عقدة نعود إلى الرأس ${nodes[i].value}` : `تقدم عبر next: العقدة ${nodes[i].value}`,
        tag: wrapping ? 'wrap' : 'traverse',
      });
    });
  }

  if (nodes.length > 1) {
    const removed = nodes[1];
    snapshots.push({
      nodes: [...nodes],
      activeIndex: null,
      newIndex: null,
      deletingIndex: 1,
      variant: 'circular',
      message: `حذف ${removed.value} (وصل جاره السابق مباشرة بجاره التالي)`,
      tag: 'delete',
    });
    nodes.splice(1, 1);
    snapshots.push({
      nodes: [...nodes],
      activeIndex: null,
      newIndex: null,
      variant: 'circular',
      message: 'بعد عملية الحذف، الحلقة لا تزال دائرية',
      tag: 'after-delete',
    });
  }

  return snapshots;
}

export default {
  key: 'circularLinkedList',
  category: 'linkedList',
  name: { ar: 'القائمة الوصلية الدائرية (Circular Linked List)', en: 'Circular Linked List' },
  complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(n)' },
  run,
};
