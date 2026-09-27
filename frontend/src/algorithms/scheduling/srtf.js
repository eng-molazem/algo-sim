export function run(processesInput) {
  const processes = processesInput.map((p) => ({ ...p, remaining: p.burst, done: false }));
  const snapshots = [];
  const gantt = [];
  let time = 0;
  let completed = 0;
  const n = processes.length;
  let lastId = null;

  snapshots.push({ gantt: [], time, activeId: null, tag: 'start', message: 'البدء' });

  while (completed < n) {
    const available = processes.filter((p) => !p.done && p.arrival <= time && p.remaining > 0);
    if (available.length === 0) {
      time += 1;
      continue;
    }
    available.sort((a, b) => a.remaining - b.remaining || a.arrival - b.arrival);
    const chosen = available[0];
    chosen.remaining -= 1;
    if (lastId !== chosen.id) {
      gantt.push({ id: chosen.id, start: time, end: time + 1 });
    } else {
      gantt[gantt.length - 1].end = time + 1;
    }
    time += 1;
    lastId = chosen.id;
    if (chosen.remaining === 0) {
      chosen.done = true;
      chosen.completion = time;
      completed += 1;
    }
    snapshots.push({ gantt: [...gantt], time, activeId: chosen.id, tag: 'run-unit' });
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
  key: 'srtf',
  category: 'scheduling',
  name: { ar: 'أقصر وقت متبقٍ أولاً (SRTF)', en: 'Shortest Remaining Time First' },
  complexity: { best: 'O(n log n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(n)' },
  run,
};
