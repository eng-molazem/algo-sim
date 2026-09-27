export function run(processesInput) {
  const processes = processesInput.map((p) => ({ ...p, done: false }));
  const snapshots = [];
  const gantt = [];
  let time = 0;
  let completed = 0;
  const n = processes.length;

  snapshots.push({ gantt: [], time, activeId: null, message: 'البدء', tag: 'start' });

  while (completed < n) {
    const available = processes.filter((p) => !p.done && p.arrival <= time);
    if (available.length === 0) {
      time += 1;
      continue;
    }
    available.sort((a, b) => a.burst - b.burst || a.arrival - b.arrival);
    const chosen = available[0];
    const start = time;
    const end = start + chosen.burst;
    gantt.push({ id: chosen.id, start, end });
    time = end;
    chosen.done = true;
    chosen.completion = end;
    completed += 1;
    snapshots.push({ gantt: [...gantt], time, activeId: chosen.id, tag: 'pick-shortest' });
  }

  const withMetrics = processes.map((p) => {
    const turnaround = p.completion - p.arrival;
    const waiting = turnaround - p.burst;
    return { ...p, turnaround, waiting };
  });

  snapshots.push({ gantt: [...gantt], time, activeId: null, processes: withMetrics, message: 'اكتملت الجدولة', tag: 'done' });

  return snapshots;
}

export default {
  key: 'sjf',
  category: 'scheduling',
  name: { ar: 'أقصر عملية أولاً (SJF)', en: 'Shortest Job First' },
  complexity: { best: 'O(n log n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(n)' },
  run,
};
