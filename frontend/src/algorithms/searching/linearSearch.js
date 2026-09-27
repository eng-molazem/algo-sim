export function run(input, target) {
  const arr = [...input];
  const snapshots = [];

  snapshots.push({ array: [...arr], current: null, found: null, excluded: [], message: 'البدء', tag: 'start' });

  const excluded = [];
  let foundIndex = null;

  for (let i = 0; i < arr.length; i += 1) {
    snapshots.push({ array: [...arr], current: i, found: null, excluded: [...excluded], tag: 'compare' });
    if (arr[i] === target) {
      foundIndex = i;
      break;
    }
    excluded.push(i);
  }

  snapshots.push({
    array: [...arr],
    current: null,
    found: foundIndex,
    excluded: foundIndex === null ? [...excluded] : excluded.filter((i) => i !== foundIndex),
    message: foundIndex !== null ? 'تم العثور على العنصر' : 'العنصر غير موجود',
    tag: foundIndex !== null ? 'found' : 'not-found',
  });

  return snapshots;
}

export default {
  key: 'linearSearch',
  category: 'searching',
  name: { ar: 'البحث الخطي (Linear Search)', en: 'Linear Search' },
  complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
  requiresSortedInput: false,
  run,
};
