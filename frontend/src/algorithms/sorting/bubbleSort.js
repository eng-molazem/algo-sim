export function run(input) {
  const arr = [...input];
  const n = arr.length;
  const snapshots = [];
  const sortedIndices = [];

  snapshots.push({ array: [...arr], comparing: [], swapped: false, sortedIndices: [], message: 'البدء', tag: 'start' });

  for (let i = 0; i < n - 1; i += 1) {
    let swappedInPass = false;
    for (let j = 0; j < n - i - 1; j += 1) {
      snapshots.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapped: false,
        sortedIndices: [...sortedIndices],
        tag: 'compare',
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swappedInPass = true;
        snapshots.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapped: true,
          sortedIndices: [...sortedIndices],
          tag: 'swap',
        });
      }
    }
    sortedIndices.unshift(n - i - 1);
    snapshots.push({ array: [...arr], comparing: [], swapped: false, sortedIndices: [...sortedIndices], tag: 'mark-sorted' });
    if (!swappedInPass) break;
  }

  const allIndices = Array.from({ length: n }, (_, idx) => idx);
  snapshots.push({
    array: [...arr],
    comparing: [],
    swapped: false,
    sortedIndices: allIndices,
    message: 'اكتمل الترتيب',
    tag: 'done',
  });

  return snapshots;
}

export default {
  key: 'bubbleSort',
  category: 'sorting',
  name: { ar: 'الترتيب الفقاعي (Bubble Sort)', en: 'Bubble Sort' },
  complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  run,
};
