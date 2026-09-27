export function run(input) {
  const arr = [...input];
  const n = arr.length;
  const snapshots = [];

  snapshots.push({ array: [...arr], comparing: [], merging: [], sortedIndices: [], message: 'البدء', tag: 'start' });

  function mergeSort(start, end) {
    if (end - start <= 1) return;
    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid, end);
    merge(start, mid, end);
  }

  function merge(start, mid, end) {
    const left = arr.slice(start, mid);
    const right = arr.slice(mid, end);
    let i = 0;
    let j = 0;
    let k = start;

    while (i < left.length && j < right.length) {
      snapshots.push({
        array: [...arr],
        comparing: [start + i, mid + j],
        merging: Array.from({ length: end - start }, (_, idx) => start + idx),
        sortedIndices: [],
        tag: 'compare',
      });
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i += 1;
      } else {
        arr[k] = right[j];
        j += 1;
      }
      k += 1;
      snapshots.push({
        array: [...arr],
        comparing: [],
        merging: Array.from({ length: end - start }, (_, idx) => start + idx),
        sortedIndices: [],
        tag: 'place',
      });
    }
    while (i < left.length) {
      arr[k] = left[i];
      i += 1;
      k += 1;
      snapshots.push({ array: [...arr], comparing: [], merging: [], sortedIndices: [], tag: 'copy-rest' });
    }
    while (j < right.length) {
      arr[k] = right[j];
      j += 1;
      k += 1;
      snapshots.push({ array: [...arr], comparing: [], merging: [], sortedIndices: [], tag: 'copy-rest' });
    }
  }

  mergeSort(0, n);

  const allIndices = Array.from({ length: n }, (_, idx) => idx);
  snapshots.push({
    array: [...arr],
    comparing: [],
    merging: [],
    sortedIndices: allIndices,
    message: 'اكتمل الترتيب',
    tag: 'done',
  });

  return snapshots;
}

export default {
  key: 'mergeSort',
  category: 'sorting',
  name: { ar: 'الترتيب الدامج (Merge Sort)', en: 'Merge Sort' },
  complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
  run,
};
