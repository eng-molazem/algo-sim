function range(a, b) {
  const r = [];
  for (let i = a; i <= b; i += 1) r.push(i);
  return r;
}

export function run(text) {
  const n = Math.max(1, Math.min(25, Math.floor(Number(text) || 10)));
  const table = new Array(n + 1).fill(null);
  const snapshots = [];
  const colLabels = range(0, n);

  table[0] = 0;
  snapshots.push({
    dimension: '1d',
    table: [...table],
    colLabels,
    activeCell: 0,
    message: 'fib(0) = 0 (حالة أساس)',
    tag: 'base-case',
  });

  if (n >= 1) {
    table[1] = 1;
    snapshots.push({
      dimension: '1d',
      table: [...table],
      colLabels,
      activeCell: 1,
      message: 'fib(1) = 1 (حالة أساس)',
      tag: 'base-case',
    });
  }

  for (let i = 2; i <= n; i += 1) {
    table[i] = table[i - 1] + table[i - 2];
    snapshots.push({
      dimension: '1d',
      table: [...table],
      colLabels,
      activeCell: i,
      message: `fib(${i}) = fib(${i - 1}) + fib(${i - 2}) = ${table[i - 1]} + ${table[i - 2]} = ${table[i]}`,
      tag: 'compute',
    });
  }

  snapshots.push({
    dimension: '1d',
    table: [...table],
    colLabels,
    activeCell: null,
    message: `fib(${n}) = ${table[n]}`,
    tag: 'done',
  });
  return snapshots;
}

export default {
  key: 'fibonacci',
  category: 'dp',
  name: { ar: 'متتالية فيبوناتشي (Fibonacci DP)', en: 'Fibonacci (DP)' },
  complexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(n)' },
  run,
};
