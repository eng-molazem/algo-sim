const TABLE_SIZE = 7;

export function run(values) {
  const slots = new Array(TABLE_SIZE).fill(null);
  const snapshots = [];

  snapshots.push({
    buckets: [...slots],
    variant: 'linear-probing',
    activeIndex: null,
    message: `جدول تجزئة فارغ بحجم ${TABLE_SIZE} (دالة التجزئة: value % ${TABLE_SIZE})`,
    tag: 'start',
  });

  values.forEach((value) => {
    const start = ((value % TABLE_SIZE) + TABLE_SIZE) % TABLE_SIZE;
    let index = start;
    let probes = 0;

    snapshots.push({
      buckets: [...slots],
      variant: 'linear-probing',
      activeIndex: index,
      pendingValue: value,
      message: `hash(${value}) = ${value} % ${TABLE_SIZE} = ${index}`,
      tag: 'hash',
    });

    while (slots[index] !== null && probes < TABLE_SIZE) {
      snapshots.push({
        buckets: [...slots],
        variant: 'linear-probing',
        activeIndex: index,
        pendingValue: value,
        message: `الفهرس ${index} مشغول بالقيمة ${slots[index]}، تصادم! جرّب الفهرس التالي`,
        tag: 'collision',
      });
      index = (index + 1) % TABLE_SIZE;
      probes += 1;
    }

    if (probes >= TABLE_SIZE) {
      snapshots.push({
        buckets: [...slots],
        variant: 'linear-probing',
        activeIndex: null,
        message: `الجدول ممتلئ، تعذّر إدراج ${value}`,
        tag: 'full',
      });
      return;
    }

    slots[index] = value;
    snapshots.push({
      buckets: [...slots],
      variant: 'linear-probing',
      activeIndex: index,
      message: `إدراج ${value} في الفهرس ${index}`,
      tag: 'insert',
    });
  });

  snapshots.push({
    buckets: [...slots],
    variant: 'linear-probing',
    activeIndex: null,
    message: 'اكتمل إدراج جميع القيم',
    tag: 'done',
  });
  return snapshots;
}

export default {
  key: 'hashLinearProbing',
  category: 'hashing',
  name: { ar: 'التجزئة بالتحقيق الخطي (Linear Probing)', en: 'Hashing with Linear Probing' },
  complexity: { best: 'O(1)', average: 'O(1)', worst: 'O(n)', space: 'O(n)' },
  run,
};
