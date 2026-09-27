export function run(input) {
  const arr = [...input];
  const n = arr.length;
  const snapshots = [];
  snapshots.push({ array: [...arr], comparing: [], sortedIndices: [], tag: 'start', message: 'البدء' });

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i += 1) {
      const temp = arr[i];
      let j = i;
      snapshots.push({ array: [...arr], comparing: [j - gap, j], sortedIndices: [], tag: 'compare' });
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        snapshots.push({ array: [...arr], comparing: [j - gap, j], sortedIndices: [], tag: 'shift' });
        j -= gap;
        if (j >= gap) {
          snapshots.push({ array: [...arr], comparing: [j - gap, j], sortedIndices: [], tag: 'compare' });
        }
      }
      arr[j] = temp;
      snapshots.push({ array: [...arr], comparing: [], sortedIndices: [], tag: 'insert' });
    }
  }

  const allIndices = Array.from({ length: n }, (_, i) => i);
  snapshots.push({ array: [...arr], comparing: [], sortedIndices: allIndices, tag: 'done', message: 'اكتمل الترتيب' });
  return snapshots;
}

export default {
  key: 'shellSort',
  category: 'sorting',
  name: { ar: 'ترتيب شل (Shell Sort)', en: 'Shell Sort' },
  complexity: { best: 'O(n log n)', average: 'O(n^1.5)', worst: 'O(n²)', space: 'O(1)' },
  run,
};
