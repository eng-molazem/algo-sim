export function run(processesInput, quantum = 2) {
  const processes = processesInput
    .map((p) => ({ ...p, remaining: p.burst }))
    .sort((a, b) => a.arrival - b.arrival);

  const snapshots = [];
  const gantt = [];
  const queue = [];
  const arrived = new Set();
  let time = 0;
  let completedCount = 0;
  const n = processes.length;
  const completion = {};

  snapshots.push({ gantt: [], time, activeId: null, message: 'البدء', tag: 'start' });

  function enqueueArrivals(currentTime) {
    processes
      .filter((p) => p.arrival <= currentTime && !arrived.has(p.id))
      .sort((a, b) => a.arrival - b.arrival)
      .forEach((p) => {
        queue.push(p.id);
        arrived.add(p.id);
      });
  }

  enqueueArrivals(time);
  if (queue.length === 0 && processes.length) {
    time = processes[0].arrival;
    enqueueArrivals(time);
  }

  while (completedCount < n) {
    if (queue.length === 0) {
      time += 1;
      enqueueArrivals(time);
      continue;
    }
    const id = queue.shift();
    const proc = processes.find((p) => p.id === id);
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
      completion[id] = time;
      completedCount += 1;
    }
    snapshots.push({ gantt: [...gantt], time, activeId: id, tag: 'run-slice' });
  }

  const withMetrics = processes.map((p) => {
    const turnaround = completion[p.id] - p.arrival;
    const waiting = turnaround - p.burst;
    return { ...p, completion: completion[p.id], turnaround, waiting };
  });

  snapshots.push({ gantt: [...gantt], time, activeId: null, processes: withMetrics, message: 'اكتملت الجدولة', tag: 'done' });

  return snapshots;
}

export default {
  key: 'roundRobin',
  category: 'scheduling',
  name: { ar: 'التناوب الدوري (Round Robin)', en: 'Round Robin' },
  complexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(n)' },
  run,
};
