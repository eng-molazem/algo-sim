export function run(input) {
  const arr = [...input];
  const n = arr.length;
  const snapshots = [];
  const sortedIndices = [];
  snapshots.push({ array: [...arr], comparing: [], pivot: null, sortedIndices: [], tag: 'start', message: 'البدء' });

  for (let i = 0; i < n - 1; i += 1) {
    let minIdx = i;
    snapshots.push({ array: [...arr], comparing: [], pivot: minIdx, sortedIndices: [...sortedIndices], tag: 'mark-min' });
    for (let j = i + 1; j < n; j += 1) {
      snapshots.push({
        array: [...arr],
        comparing: [minIdx, j],
        pivot: minIdx,
        sortedIndices: [...sortedIndices],
        tag: 'compare',
      });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        snapshots.push({ array: [...arr], comparing: [], pivot: minIdx, sortedIndices: [...sortedIndices], tag: 'mark-min' });
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    snapshots.push({ array: [...arr], comparing: [i, minIdx], pivot: null, sortedIndices: [...sortedIndices], tag: 'swap' });
    sortedIndices.push(i);
    snapshots.push({ array: [...arr], comparing: [], pivot: null, sortedIndices: [...sortedIndices], tag: 'mark-sorted' });
  }
  sortedIndices.push(n - 1);
  snapshots.push({
    array: [...arr],
    comparing: [],
    pivot: null,
    sortedIndices: [...sortedIndices],
    tag: 'done',
    message: 'اكتمل الترتيب',
  });
  return snapshots;
}

export default {
  key: 'selectionSort',
  category: 'sorting',
  name: { ar: 'الترتيب بالاختيار (Selection Sort)', en: 'Selection Sort' },
  complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  run,
};
