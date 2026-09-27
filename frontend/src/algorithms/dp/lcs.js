function parseLcs(text) {
  const [a, b] = (text || '').split('|').map((s) => (s || '').trim());
  return { a: (a || '').slice(0, 12), b: (b || '').slice(0, 12) };
}

export function run(text) {
  const { a, b } = parseLcs(text);
  const n = a.length;
  const m = b.length;
  const table = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  const snapshots = [];
  const colLabels = ['', ...b.split('')];
  const rowLabels = ['', ...a.split('')];

  snapshots.push({
    dimension: '2d',
    table: table.map((r) => [...r]),
    rowLabels,
    colLabels,
    activeCell: null,
    message: 'الصف والعمود الأولين (سلسلة فارغة) يساويان 0',
    tag: 'base-case',
  });

  for (let i = 1; i <= n; i += 1) {
    for (let j = 1; j <= m; j += 1) {
      if (a[i - 1] === b[j - 1]) {
        table[i][j] = table[i - 1][j - 1] + 1;
        snapshots.push({
          dimension: '2d',
          table: table.map((r) => [...r]),
          rowLabels,
          colLabels,
          activeCell: [i, j],
          message: `'${a[i - 1]}' = '${b[j - 1]}': القيمة القطرية + 1 = ${table[i][j]}`,
          tag: 'match',
        });
      } else {
        table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
        snapshots.push({
          dimension: '2d',
          table: table.map((r) => [...r]),
          rowLabels,
          colLabels,
          activeCell: [i, j],
          message: `'${a[i - 1]}' ≠ '${b[j - 1]}': max(أعلى, يسار) = ${table[i][j]}`,
          tag: 'mismatch',
        });
      }
    }
  }

  snapshots.push({
    dimension: '2d',
    table: table.map((r) => [...r]),
    rowLabels,
    colLabels,
    activeCell: n > 0 && m > 0 ? [n, m] : null,
    message: `أطول متتابعة مشتركة طولها = ${n > 0 && m > 0 ? table[n][m] : 0}`,
    tag: 'done',
  });
  return snapshots;
}

export default {
  key: 'lcs',
  category: 'dp',
  name: { ar: 'أطول متتابعة مشتركة (LCS)', en: 'Longest Common Subsequence' },
  complexity: { best: 'O(n·m)', average: 'O(n·m)', worst: 'O(n·m)', space: 'O(n·m)' },
  run,
};
