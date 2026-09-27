export function run(input) {
  const arr = [...input];
  const n = arr.length;
  const snapshots = [];
  const sortedIndices = [];

  snapshots.push({ array: [...arr], comparing: [], pivot: null, sortedIndices: [], message: 'البدء', tag: 'start' });

  function quickSort(low, high) {
    if (low >= high) {
      if (low === high) sortedIndices.push(low);
      return;
    }
    const pivotIndex = partition(low, high);
    sortedIndices.push(pivotIndex);
    quickSort(low, pivotIndex - 1);
    quickSort(pivotIndex + 1, high);
  }

  function partition(low, high) {
    const pivotValue = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j += 1) {
      snapshots.push({
        array: [...arr],
        comparing: [j, high],
        pivot: high,
        sortedIndices: [...sortedIndices],
        tag: 'compare',
      });
      if (arr[j] < pivotValue) {
        i += 1;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        snapshots.push({
          array: [...arr],
          comparing: [i, j],
          pivot: high,
          sortedIndices: [...sortedIndices],
          tag: 'swap',
        });
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    snapshots.push({ array: [...arr], comparing: [], pivot: i + 1, sortedIndices: [...sortedIndices], tag: 'place-pivot' });
    return i + 1;
  }

  quickSort(0, n - 1);

  const allIndices = Array.from({ length: n }, (_, idx) => idx);
  snapshots.push({
    array: [...arr],
    comparing: [],
    pivot: null,
    sortedIndices: allIndices,
    message: 'اكتمل الترتيب',
    tag: 'done',
  });

  return snapshots;
}

export default {
  key: 'quickSort',
  category: 'sorting',
  name: { ar: 'الترتيب السريع (Quick Sort)', en: 'Quick Sort' },
  complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
  run,
};
