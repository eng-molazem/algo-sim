export function run(values) {
  const items = [];
  const snapshots = [];

  snapshots.push({ items: [], action: 'idle', highlightIndex: null, message: 'مكدس فارغ', tag: 'start' });

  values.forEach((value) => {
    snapshots.push({
      items: [...items],
      action: 'entering',
      highlightIndex: items.length,
      pendingValue: value,
      tag: 'push-check',
    });
    items.push(value);
    snapshots.push({
      items: [...items],
      action: 'push',
      highlightIndex: items.length - 1,
      message: `Push(${value})`,
      tag: 'push-place',
    });
  });

  if (items.length) {
    const popped = items[items.length - 1];
    snapshots.push({
      items: [...items],
      action: 'pop',
      highlightIndex: items.length - 1,
      message: `Pop() -> ${popped}`,
      tag: 'pop-check',
    });
    items.pop();
    snapshots.push({ items: [...items], action: 'idle', highlightIndex: null, message: 'بعد عملية Pop', tag: 'pop-place' });
  }

  return snapshots;
}

export default {
  key: 'stack',
  category: 'stack',
  name: { ar: 'المكدس (Array-based Stack)', en: 'Array-based Stack' },
  complexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)' },
  run,
};
