export function run(processesInput) {
  const processes = processesInput.map((p) => ({ ...p, priority: p.priority ?? 0, done: false }));
  const snapshots = [];
  const gantt = [];
  let time = 0;
  let completed = 0;
  const n = processes.length;

  snapshots.push({ gantt: [], time, activeId: null, tag: 'start', message: 'البدء' });

  while (completed < n) {
    const available = processes.filter((p) => !p.done && p.arrival <= time);
    if (available.length === 0) {
      time += 1;
      continue;
    }
    available.sort((a, b) => a.priority - b.priority || a.arrival - b.arrival);
    const chosen = available[0];
    const start = time;
    const end = start + chosen.burst;
    gantt.push({ id: chosen.id, start, end });
    time = end;
    chosen.done = true;
    chosen.completion = end;
    completed += 1;
    snapshots.push({ gantt: [...gantt], time, activeId: chosen.id, tag: 'pick-priority' });
  }

  const withMetrics = processes.map((p) => {
    const turnaround = p.completion - p.arrival;
    const waiting = turnaround - p.burst;
    return { ...p, turnaround, waiting };
  });

  snapshots.push({ gantt: [...gantt], time, activeId: null, processes: withMetrics, tag: 'done', message: 'اكتملت الجدولة' });
  return snapshots;
}

export default {
  key: 'priorityScheduling',
  category: 'scheduling',
  name: { ar: 'جدولة الأولويات (Priority Scheduling)', en: 'Priority Scheduling' },
  complexity: { best: 'O(n log n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(n)' },
  requiresPriority: true,
  run,
};
