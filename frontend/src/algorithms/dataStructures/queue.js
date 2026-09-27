export function run(values) {
  const items = [];
  const snapshots = [];

  snapshots.push({ items: [], action: 'idle', highlightIndex: null, message: 'طابور فارغ', tag: 'start' });

  values.forEach((value) => {
    snapshots.push({
      items: [...items],
      action: 'entering',
      highlightIndex: items.length,
      pendingValue: value,
      tag: 'enqueue-check',
    });
    items.push(value);
    snapshots.push({
      items: [...items],
      action: 'enqueue',
      highlightIndex: items.length - 1,
      message: `Enqueue(${value})`,
      tag: 'enqueue-place',
    });
  });

  if (items.length) {
    const dequeued = items[0];
    snapshots.push({
      items: [...items],
      action: 'dequeue',
      highlightIndex: 0,
      message: `Dequeue() -> ${dequeued}`,
      tag: 'dequeue-check',
    });
    items.shift();
    snapshots.push({ items: [...items], action: 'idle', highlightIndex: null, message: 'بعد عملية Dequeue', tag: 'dequeue-place' });
  }

  return snapshots;
}

export default {
  key: 'queue',
  category: 'queue',
  name: { ar: 'الطابور (Array-based Queue)', en: 'Array-based Queue' },
  complexity: { best: 'O(1)', average: 'O(1)', worst: 'O(n)', space: 'O(n)' },
  run,
};
