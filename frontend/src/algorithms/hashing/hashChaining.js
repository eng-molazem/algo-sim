const TABLE_SIZE = 7;

export function run(values) {
  const buckets = Array.from({ length: TABLE_SIZE }, () => []);
  const snapshots = [];

  snapshots.push({
    buckets: buckets.map((b) => [...b]),
    variant: 'chaining',
    activeIndex: null,
    message: `جدول تجزئة فارغ بحجم ${TABLE_SIZE} (دالة التجزئة: value % ${TABLE_SIZE})`,
    tag: 'start',
  });

  values.forEach((value) => {
    const index = ((value % TABLE_SIZE) + TABLE_SIZE) % TABLE_SIZE;
    snapshots.push({
      buckets: buckets.map((b) => [...b]),
      variant: 'chaining',
      activeIndex: index,
      pendingValue: value,
      message: `hash(${value}) = ${value} % ${TABLE_SIZE} = ${index}`,
      tag: 'hash',
    });

    const collision = buckets[index].length > 0;
    buckets[index].push(value);
    snapshots.push({
      buckets: buckets.map((b) => [...b]),
      variant: 'chaining',
      activeIndex: index,
      message: collision
        ? `تصادم! إضافة ${value} إلى نهاية سلسلة الفهرس ${index}`
        : `إدراج ${value} في الفهرس ${index}`,
      tag: collision ? 'collision' : 'insert',
    });
  });

  snapshots.push({
    buckets: buckets.map((b) => [...b]),
    variant: 'chaining',
    activeIndex: null,
    message: 'اكتمل إدراج جميع القيم',
    tag: 'done',
  });
  return snapshots;
}

export default {
  key: 'hashChaining',
  category: 'hashing',
  name: { ar: 'التجزئة بالتسلسل (Hashing - Chaining)', en: 'Hashing with Chaining' },
  complexity: { best: 'O(1)', average: 'O(1)', worst: 'O(n)', space: 'O(n)' },
  run,
};
