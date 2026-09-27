export function run(input, target) {
  const arr = [...input].sort((a, b) => a - b);
  const snapshots = [];
  let low = 0;
  let high = arr.length - 1;
  let foundIndex = null;

  snapshots.push({
    array: [...arr],
    low,
    high,
    mid: null,
    found: null,
    message: 'البدء (المصفوفة يجب أن تكون مرتّبة)',
    tag: 'start',
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    snapshots.push({ array: [...arr], low, high, mid, found: null, tag: 'compute-mid' });

    if (arr[mid] === target) {
      foundIndex = mid;
      break;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
    snapshots.push({ array: [...arr], low, high, mid: null, found: null, tag: 'narrow' });
  }

  snapshots.push({
    array: [...arr],
    low,
    high,
    mid: null,
    found: foundIndex,
    message: foundIndex !== null ? 'تم العثور على العنصر' : 'العنصر غير موجود',
    tag: foundIndex !== null ? 'found' : 'not-found',
  });

  return snapshots;
}

export default {
  key: 'binarySearch',
  category: 'searching',
  name: { ar: 'البحث الثنائي (Binary Search)', en: 'Binary Search' },
  complexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
  requiresSortedInput: true,
  run,
};
