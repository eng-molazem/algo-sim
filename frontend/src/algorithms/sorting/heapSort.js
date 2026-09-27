export function run(input) {
  const arr = [...input];
  const n = arr.length;
  const snapshots = [];
  const sortedIndices = [];
  snapshots.push({ array: [...arr], comparing: [], pivot: null, sortedIndices: [], tag: 'start', message: 'البدء' });

  function heapify(size, root) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;
    if (left < size) {
      snapshots.push({
        array: [...arr],
        comparing: [largest, left],
        pivot: root,
        sortedIndices: [...sortedIndices],
        tag: 'compare',
      });
      if (arr[left] > arr[largest]) largest = left;
    }
    if (right < size) {
      snapshots.push({
        array: [...arr],
        comparing: [largest, right],
        pivot: root,
        sortedIndices: [...sortedIndices],
        tag: 'compare',
      });
      if (arr[right] > arr[largest]) largest = right;
    }
    if (largest !== root) {
      [arr[root], arr[largest]] = [arr[largest], arr[root]];
      snapshots.push({
        array: [...arr],
        comparing: [root, largest],
        pivot: null,
        sortedIndices: [...sortedIndices],
        tag: 'swap',
      });
      heapify(size, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) heapify(n, i);
  snapshots.push({
    array: [...arr],
    comparing: [],
    pivot: null,
    sortedIndices: [],
    tag: 'heapify-done',
    message: 'اكتمل بناء الكومة',
  });

  for (let i = n - 1; i > 0; i -= 1) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    sortedIndices.unshift(i);
    snapshots.push({ array: [...arr], comparing: [0, i], pivot: null, sortedIndices: [...sortedIndices], tag: 'swap' });
    heapify(i, 0);
  }
  sortedIndices.unshift(0);
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
  key: 'heapSort',
  category: 'sorting',
  name: { ar: 'الترتيب الهرمي (Heap Sort)', en: 'Heap Sort' },
  complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)' },
  run,
};
