export function run(input, target) {
  const arr = [...input].sort((a, b) => a - b);
  const n = arr.length;
  const step = Math.max(1, Math.floor(Math.sqrt(n)));
  const snapshots = [];
  const excluded = [];
  snapshots.push({
    array: [...arr],
    current: null,
    low: 0,
    high: n - 1,
    found: null,
    excluded: [],
    tag: 'start',
    message: 'البدء (المصفوفة يجب أن تكون مرتّبة)',
  });

  let blockStart = 0;
  let blockEnd = Math.min(step, n) - 1;
  while (blockEnd < n && arr[blockEnd] < target) {
    snapshots.push({ array: [...arr], current: blockEnd, low: blockStart, high: blockEnd, found: null, excluded: [...excluded], tag: 'jump' });
    for (let k = blockStart; k <= blockEnd; k += 1) excluded.push(k);
    blockStart = blockEnd + 1;
    blockEnd = Math.min(blockEnd + step, n - 1);
    if (blockStart > n - 1) break;
  }

  let foundIndex = null;
  const searchEnd = Math.min(blockEnd, n - 1);
  for (let i = blockStart; i <= searchEnd; i += 1) {
    snapshots.push({ array: [...arr], current: i, low: blockStart, high: searchEnd, found: null, excluded: [...excluded], tag: 'linear-search' });
    if (arr[i] === target) {
      foundIndex = i;
      break;
    }
    excluded.push(i);
  }

  snapshots.push({
    array: [...arr],
    current: null,
    low: blockStart,
    high: searchEnd,
    found: foundIndex,
    excluded: foundIndex !== null ? excluded.filter((x) => x !== foundIndex) : excluded,
    tag: foundIndex !== null ? 'found' : 'not-found',
    message: foundIndex !== null ? 'تم العثور على العنصر' : 'العنصر غير موجود',
  });
  return snapshots;
}

export default {
  key: 'jumpSearch',
  category: 'searching',
  name: { ar: 'البحث بالقفز (Jump Search)', en: 'Jump Search' },
  complexity: { best: 'O(1)', average: 'O(√n)', worst: 'O(√n)', space: 'O(1)' },
  requiresSortedInput: true,
  run,
};
