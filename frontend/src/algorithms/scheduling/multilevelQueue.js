export function run(processesInput, quantum = 2) {
  const highQueueProcs = processesInput.filter((p) => (p.priority ?? 0) === 0).map((p) => ({ ...p }));
  const lowQueueProcs = processesInput
    .filter((p) => (p.priority ?? 0) !== 0)
    .map((p) => ({ ...p, remaining: p.burst }));
  const snapshots = [];
  const gantt = [];
  let time = 0;

  snapshots.push({ gantt: [], time, activeId: null, tag: 'start', message: 'البدء' });

  highQueueProcs.sort((a, b) => a.arrival - b.arrival);
  highQueueProcs.forEach((p) => {
    const start = Math.max(time, p.arrival);
    const end = start + p.burst;
    gantt.push({ id: p.id, start, end });
    time = end;
    p.completion = end;
    snapshots.push({ gantt: [...gantt], time, activeId: p.id, tag: 'run-high-queue' });
  });

  const queue = [];
  const arrived = new Set();
  function enqueueArrivals(t) {
    lowQueueProcs
      .filter((p) => p.arrival <= t && !arrived.has(p.id) && p.remaining > 0)
      .sort((a, b) => a.arrival - b.arrival)
      .forEach((p) => {
        queue.push(p.id);
        arrived.add(p.id);
      });
  }
  enqueueArrivals(time);

  let completedLow = 0;
  while (completedLow < lowQueueProcs.length) {
    if (queue.length === 0) {
      time += 1;
      enqueueArrivals(time);
      continue;
    }
    const id = queue.shift();
    const proc = lowQueueProcs.find((p) => p.id === id);
    const runTime = Math.min(quantum, proc.remaining);
    const start = time;
    const end = start + runTime;
    gantt.push({ id, start, end });
    time = end;
    proc.remaining -= runTime;
    enqueueArrivals(time);
    if (proc.remaining > 0) {
      queue.push(id);
    } else {
      proc.completion = time;
      completedLow += 1;
    }
    snapshots.push({ gantt: [...gantt], time, activeId: id, tag: 'run-low-queue' });
  }

  const allProcs = [...highQueueProcs, ...lowQueueProcs];
  const withMetrics = allProcs.map((p) => {
    const turnaround = p.completion - p.arrival;
    const waiting = turnaround - p.burst;
    return { ...p, turnaround, waiting };
  });

  snapshots.push({ gantt: [...gantt], time, activeId: null, processes: withMetrics, tag: 'done', message: 'اكتملت الجدولة' });
  return snapshots;
}

export default {
  key: 'multilevelQueue',
  category: 'scheduling',
  name: { ar: 'الطابور متعدد المستويات (Multilevel Queue)', en: 'Multilevel Queue' },
  complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(n)' },
  requiresPriority: true,
  run,
};
