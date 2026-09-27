const CAPACITY = 5;

export function run(values) {
  const buffer = new Array(CAPACITY).fill(null);
  let front = -1;
  let rear = -1;
  let size = 0;
  const snapshots = [];

  function slots() {
    return buffer.map((v) => v);
  }

  snapshots.push({
    items: slots(),
    front,
    rear,
    variant: 'circular',
    action: 'idle',
    highlightIndex: null,
    message: `طابور دائري فارغ (السعة ${CAPACITY})`,
    tag: 'start',
  });

  values.forEach((value) => {
    if (size === CAPACITY) {
      snapshots.push({
        items: slots(),
        front,
        rear,
        variant: 'circular',
        action: 'idle',
        highlightIndex: null,
        message: `الطابور ممتلئ، تعذّر إدخال ${value}`,
        tag: 'full',
      });
      return;
    }
    const nextRear = (rear + 1) % CAPACITY;
    snapshots.push({
      items: slots(),
      front,
      rear,
      variant: 'circular',
      action: 'entering',
      highlightIndex: nextRear,
      pendingValue: value,
      message: `Enqueue(${value}) عند الفهرس ${nextRear}${nextRear === 0 && rear === CAPACITY - 1 ? ' (التفاف)' : ''}`,
      tag: 'enqueue-check',
    });
    rear = nextRear;
    buffer[rear] = value;
    if (front === -1) front = rear;
    size += 1;
    snapshots.push({
      items: slots(),
      front,
      rear,
      variant: 'circular',
      action: 'enqueue',
      highlightIndex: rear,
      message: `تم الإدخال، Rear = ${rear}`,
      tag: 'enqueue-place',
    });
  });

  if (size > 0) {
    const dequeued = buffer[front];
    snapshots.push({
      items: slots(),
      front,
      rear,
      variant: 'circular',
      action: 'dequeue',
      highlightIndex: front,
      message: `Dequeue() -> ${dequeued} من الفهرس ${front}`,
      tag: 'dequeue-check',
    });
    buffer[front] = null;
    size -= 1;
    if (size === 0) {
      front = -1;
      rear = -1;
    } else {
      front = (front + 1) % CAPACITY;
    }
    snapshots.push({
      items: slots(),
      front,
      rear,
      variant: 'circular',
      action: 'idle',
      highlightIndex: null,
      message: `بعد الحذف، Front = ${front}`,
      tag: 'dequeue-place',
    });
  }

  return snapshots;
}

export default {
  key: 'circularQueue',
  category: 'queue',
  name: { ar: 'الطابور الدائري (Circular Queue)', en: 'Circular Queue' },
  complexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)' },
  run,
};
