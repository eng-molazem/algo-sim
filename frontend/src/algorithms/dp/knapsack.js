function parseKnapsack(text) {
  const [capPart, itemsPart] = (text || '').split('|');
  const capacity = Math.max(0, Math.min(30, Math.floor(Number(capPart) || 0)));
  const items = (itemsPart || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const [w, v] = s.split(':').map(Number);
      return { weight: w, value: v };
    })
    .filter((it) => !Number.isNaN(it.weight) && !Number.isNaN(it.value));
  return { capacity, items };
}

export function run(text) {
  const { capacity, items } = parseKnapsack(text);
  const n = items.length;
  const table = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
  const snapshots = [];
  const colLabels = Array.from({ length: capacity + 1 }, (_, w) => w);
  const rowLabels = ['∅', ...items.map((it, i) => `#${i + 1} (${it.weight},${it.value})`)];

  snapshots.push({
    dimension: '2d',
    table: table.map((r) => [...r]),
    rowLabels,
    colLabels,
    activeCell: null,
    message: 'الصف صفر (بدون عناصر) يساوي 0 لكل سعة',
    tag: 'base-case',
  });

  for (let i = 1; i <= n; i += 1) {
    const item = items[i - 1];
    for (let w = 0; w <= capacity; w += 1) {
      if (item.weight > w) {
        table[i][w] = table[i - 1][w];
        snapshots.push({
          dimension: '2d',
          table: table.map((r) => [...r]),
          rowLabels,
          colLabels,
          activeCell: [i, w],
          message: `العنصر ${i} (وزنه ${item.weight}) أثقل من السعة ${w}: نأخذ القيمة أعلاه = ${table[i][w]}`,
          tag: 'skip',
        });
      } else {
        const withItem = item.value + table[i - 1][w - item.weight];
        const without = table[i - 1][w];
        table[i][w] = Math.max(withItem, without);
        snapshots.push({
          dimension: '2d',
          table: table.map((r) => [...r]),
          rowLabels,
          colLabels,
          activeCell: [i, w],
          message: `max(بدون العنصر=${without}, مع العنصر=${withItem}) = ${table[i][w]}`,
          tag: 'compute',
        });
      }
    }
  }

  snapshots.push({
    dimension: '2d',
    table: table.map((r) => [...r]),
    rowLabels,
    colLabels,
    activeCell: n > 0 ? [n, capacity] : null,
    message: `أفضل قيمة ممكنة ضمن السعة ${capacity} = ${n > 0 ? table[n][capacity] : 0}`,
    tag: 'done',
  });
  return snapshots;
}

export default {
  key: 'knapsack',
  category: 'dp',
  name: { ar: 'مسألة الحقيبة 0/1 (0/1 Knapsack)', en: '0/1 Knapsack' },
  complexity: { best: 'O(n·W)', average: 'O(n·W)', worst: 'O(n·W)', space: 'O(n·W)' },
  run,
};
