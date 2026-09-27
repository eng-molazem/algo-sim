export function run(values) {
  const nodes = [];
  const snapshots = [];

  snapshots.push({ nodes: [], activeIndex: null, newIndex: null, variant: 'doubly', message: 'قائمة مزدوجة فارغة', tag: 'start' });

  values.forEach((value, i) => {
    nodes.push({ id: `n${i}`, value });
    snapshots.push({
      nodes: [...nodes],
      activeIndex: null,
      newIndex: nodes.length - 1,
      variant: 'doubly',
      message: `إدراج ${value} في النهاية (تحديث next و prev)`,
      tag: 'insert',
    });
  });

  for (let i = 0; i < nodes.length; i += 1) {
    snapshots.push({
      nodes: [...nodes],
      activeIndex: i,
      newIndex: null,
      variant: 'doubly',
      message: `تقدم للأمام عبر next: العقدة ${nodes[i].value}`,
      tag: 'traverse-forward',
    });
  }

  for (let i = nodes.length - 1; i >= 0; i -= 1) {
    snapshots.push({
      nodes: [...nodes],
      activeIndex: i,
      newIndex: null,
      variant: 'doubly',
      message: `رجوع للخلف عبر prev: العقدة ${nodes[i].value}`,
      tag: 'traverse-backward',
    });
  }

  if (nodes.length > 1) {
    const removed = nodes[1];
    snapshots.push({
      nodes: [...nodes],
      activeIndex: null,
      newIndex: null,
      deletingIndex: 1,
      variant: 'doubly',
      message: `حذف ${removed.value} (وصل جاره السابق بجاره التالي في الاتجاهين)`,
      tag: 'delete',
    });
    nodes.splice(1, 1);
    snapshots.push({
      nodes: [...nodes],
      activeIndex: null,
      newIndex: null,
      variant: 'doubly',
      message: 'بعد عملية الحذف',
      tag: 'after-delete',
    });
  }

  return snapshots;
}

export default {
  key: 'doublyLinkedList',
  category: 'linkedList',
  name: { ar: 'القائمة الوصلية المزدوجة (Doubly Linked List)', en: 'Doubly Linked List' },
  complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(n)' },
  run,
};
