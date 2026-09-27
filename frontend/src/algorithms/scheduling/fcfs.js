export function run(processesInput) {
  const processes = processesInput
    .map((p) => ({ ...p }))
    .sort((a, b) => a.arrival - b.arrival || a.id.localeCompare(b.id));

  const snapshots = [];
  const gantt = [];
  let time = 0;

  snapshots.push({ gantt: [], time, activeId: null, message: 'البدء', tag: 'start' });

  processes.forEach((p) => {
    const start = Math.max(time, p.arrival);
    const end = start + p.burst;
    gantt.push({ id: p.id, start, end });
    time = end;
    snapshots.push({ gantt: [...gantt], time, activeId: p.id, tag: 'run-process' });
  });

  const withMetrics = processes.map((p) => {
    const g = gantt.find((x) => x.id === p.id);
    const completion = g.end;
    const turnaround = completion - p.arrival;
    const waiting = turnaround - p.burst;
    return { ...p, completion, turnaround, waiting };
  });

  snapshots.push({ gantt: [...gantt], time, activeId: null, processes: withMetrics, message: 'اكتملت الجدولة', tag: 'done' });

  return snapshots;
}

export default {
  key: 'fcfs',
  category: 'scheduling',
  name: { ar: 'أول القادمين أولاً (FCFS)', en: 'First Come First Served' },
  complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
  run,
};
