export function run(input) {
  const arr = [...input];
  const n = arr.length;
  const snapshots = [];
  const max = Math.max(...arr, 0);
  const count = new Array(max + 1).fill(0);
  const output = new Array(n).fill(0);
  snapshots.push({ array: [...arr], comparing: [], pivot: null, sortedIndices: [], tag: 'start', message: 'البدء' });

  for (let i = 0; i < n; i += 1) {
    count[arr[i]] += 1;
    snapshots.push({ array: [...arr], comparing: [], pivot: i, sortedIndices: [], tag: 'count' });
  }

  for (let i = 1; i <= max; i += 1) count[i] += count[i - 1];
  snapshots.push({
    array: [...arr],
    comparing: [],
    pivot: null,
    sortedIndices: [],
    tag: 'cumulative',
    message: 'حساب المواقع التراكمية',
  });

  for (let i = n - 1; i >= 0; i -= 1) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]] -= 1;
    snapshots.push({ array: [...output], comparing: [], pivot: count[arr[i]], sortedIndices: [], tag: 'place' });
  }

  const allIndices = Array.from({ length: n }, (_, i) => i);
  snapshots.push({ array: [...output], comparing: [], pivot: null, sortedIndices: allIndices, tag: 'done', message: 'اكتمل الترتيب' });
  return snapshots;
}

export default {
  key: 'countingSort',
  category: 'sorting',
  name: { ar: 'الترتيب بالعد (Counting Sort)', en: 'Counting Sort' },
  complexity: { best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n+k)', space: 'O(n+k)' },
  run,
};
