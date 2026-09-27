export function run(input, target) {
  const arr = [...input].sort((a, b) => a - b);
  const n = arr.length;
  const snapshots = [];
  let low = 0;
  let high = n - 1;
  snapshots.push({ array: [...arr], low, high, mid: null, found: null, tag: 'start', message: 'البدء (المصفوفة يجب أن تكون مرتّبة)' });

  let foundIndex = null;
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (arr[high] === arr[low]) {
      if (arr[low] === target) foundIndex = low;
      break;
    }
    const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
    snapshots.push({ array: [...arr], low, high, mid: pos, found: null, tag: 'compute-pos' });
    if (arr[pos] === target) {
      foundIndex = pos;
      break;
    } else if (arr[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
    snapshots.push({ array: [...arr], low, high, mid: null, found: null, tag: 'narrow' });
  }

  snapshots.push({
    array: [...arr],
    low,
    high,
    mid: null,
    found: foundIndex,
    tag: foundIndex !== null ? 'found' : 'not-found',
    message: foundIndex !== null ? 'تم العثور على العنصر' : 'العنصر غير موجود',
  });
  return snapshots;
}

export default {
  key: 'interpolationSearch',
  category: 'searching',
  name: { ar: 'البحث بالاستيفاء (Interpolation Search)', en: 'Interpolation Search' },
  complexity: { best: 'O(1)', average: 'O(log log n)', worst: 'O(n)', space: 'O(1)' },
  requiresSortedInput: true,
  run,
};
