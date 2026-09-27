function range(a, b) {
  const r = [];
  for (let k = a; k <= b; k += 1) r.push(k);
  return r;
}

export function run(input) {
  const arr = [...input];
  const n = arr.length;
  const snapshots = [];
  snapshots.push({ array: [...arr], comparing: [], sortedIndices: [0], tag: 'start', message: 'البدء' });

  for (let i = 1; i < n; i += 1) {
    const key = arr[i];
    let j = i - 1;
    snapshots.push({ array: [...arr], comparing: [j, i], sortedIndices: range(0, i - 1), tag: 'compare' });
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      snapshots.push({ array: [...arr], comparing: [j, j + 1], sortedIndices: range(0, i - 1), tag: 'shift' });
      j -= 1;
      if (j >= 0) {
        snapshots.push({ array: [...arr], comparing: [j, i], sortedIndices: range(0, i - 1), tag: 'compare' });
      }
    }
    arr[j + 1] = key;
    snapshots.push({ array: [...arr], comparing: [], sortedIndices: range(0, i), tag: 'insert' });
  }

  snapshots.push({ array: [...arr], comparing: [], sortedIndices: range(0, n - 1), tag: 'done', message: 'اكتمل الترتيب' });
  return snapshots;
}

export default {
  key: 'insertionSort',
  category: 'sorting',
  name: { ar: 'الترتيب بالإدراج (Insertion Sort)', en: 'Insertion Sort' },
  complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  run,
};
