export function run(input, target) {
  const arr = [...input].sort((a, b) => a - b);
  const n = arr.length;
  const snapshots = [];
  snapshots.push({ array: [...arr], low: 0, high: n - 1, mid: null, found: null, tag: 'start', message: 'البدء (المصفوفة يجب أن تكون مرتّبة)' });

  if (arr[0] === target) {
    snapshots.push({ array: [...arr], low: 0, high: 0, mid: 0, found: 0, tag: 'found', message: 'تم العثور على العنصر' });
    return snapshots;
  }

  let i = 1;
  while (i < n && arr[i] <= target) {
    snapshots.push({ array: [...arr], low: 0, high: Math.min(i, n - 1), mid: i, found: null, tag: 'range' });
    i *= 2;
  }

  let low = Math.floor(i / 2);
  let high = Math.min(i, n - 1);
  let foundIndex = null;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    snapshots.push({ array: [...arr], low, high, mid, found: null, tag: 'compare' });
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
    tag: foundIndex !== null ? 'found' : 'not-found',
    message: foundIndex !== null ? 'تم العثور على العنصر' : 'العنصر غير موجود',
  });
  return snapshots;
}

export default {
  key: 'exponentialSearch',
  category: 'searching',
  name: { ar: 'البحث الأسّي (Exponential Search)', en: 'Exponential Search' },
  complexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
  requiresSortedInput: true,
  run,
};
