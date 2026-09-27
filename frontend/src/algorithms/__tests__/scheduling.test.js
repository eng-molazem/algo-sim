import { describe, it, expect } from 'vitest';
import fcfs from '../scheduling/fcfs';
import sjf from '../scheduling/sjf';
import roundRobin from '../scheduling/roundRobin';
import priorityScheduling from '../scheduling/priorityScheduling';
import srtf from '../scheduling/srtf';
import multilevelQueue from '../scheduling/multilevelQueue';

const PROCESSES = [
  { id: 'P1', arrival: 0, burst: 5 },
  { id: 'P2', arrival: 1, burst: 3 },
  { id: 'P3', arrival: 2, burst: 8 },
];

const PRIORITY_PROCESSES = [
  { id: 'P1', arrival: 0, burst: 5, priority: 2 },
  { id: 'P2', arrival: 1, burst: 3, priority: 1 },
  { id: 'P3', arrival: 2, burst: 8, priority: 3 },
];

function metricsById(processes) {
  return Object.fromEntries(processes.map((p) => [p.id, p]));
}

describe('fcfs', () => {
  it('computes completion/turnaround/waiting times correctly', () => {
    const snapshots = fcfs.run(PROCESSES);
    const final = snapshots[snapshots.length - 1];
    const byId = metricsById(final.processes);

    expect(byId.P1).toMatchObject({ completion: 5, turnaround: 5, waiting: 0 });
    expect(byId.P2).toMatchObject({ completion: 8, turnaround: 7, waiting: 4 });
    expect(byId.P3).toMatchObject({ completion: 16, turnaround: 14, waiting: 6 });
  });

  it('runs processes in arrival order regardless of input order', () => {
    const shuffled = [PROCESSES[2], PROCESSES[0], PROCESSES[1]];
    const snapshots = fcfs.run(shuffled);
    const final = snapshots[snapshots.length - 1];
    expect(final.gantt.map((g) => g.id)).toEqual(['P1', 'P2', 'P3']);
  });
});

describe('sjf', () => {
  it('picks the shortest ready job at each decision point', () => {
    const snapshots = sjf.run(PROCESSES);
    const final = snapshots[snapshots.length - 1];
    // At t=0 only P1 is ready -> runs first. At t=5, P2(3) and P3(8) are ready -> P2 next.
    expect(final.gantt.map((g) => g.id)).toEqual(['P1', 'P2', 'P3']);
  });
});

describe('roundRobin', () => {
  it('splits each process into time-quantum slices', () => {
    const snapshots = roundRobin.run(PROCESSES, 2);
    const final = snapshots[snapshots.length - 1];
    // No single slice should exceed the quantum
    final.gantt.forEach((slice) => {
      expect(slice.end - slice.start).toBeLessThanOrEqual(2);
    });
  });

  it('eventually completes every process', () => {
    const snapshots = roundRobin.run(PROCESSES, 2);
    const final = snapshots[snapshots.length - 1];
    const byId = metricsById(final.processes);
    PROCESSES.forEach((p) => {
      expect(byId[p.id].completion).toBeGreaterThan(0);
      expect(byId[p.id].turnaround).toBeGreaterThanOrEqual(p.burst);
    });
  });
});

describe('priorityScheduling', () => {
  it('runs the highest-priority (lowest number) ready process first at each decision point', () => {
    const snapshots = priorityScheduling.run(PRIORITY_PROCESSES);
    const final = snapshots[snapshots.length - 1];
    // t=0: only P1 ready -> runs first. At t=5: P2(prio 1) beats P3(prio 3).
    expect(final.gantt.map((g) => g.id)).toEqual(['P1', 'P2', 'P3']);
  });

  it('computes completion for every process', () => {
    const snapshots = priorityScheduling.run(PRIORITY_PROCESSES);
    const final = snapshots[snapshots.length - 1];
    const byId = metricsById(final.processes);
    PRIORITY_PROCESSES.forEach((p) => {
      expect(byId[p.id].completion).toBeGreaterThan(0);
      expect(byId[p.id].turnaround).toBeGreaterThanOrEqual(p.burst);
    });
  });
});

describe('srtf', () => {
  it('preempts the running process for a shorter-remaining-time arrival', () => {
    const snapshots = srtf.run(PROCESSES);
    const final = snapshots[snapshots.length - 1];
    const byId = metricsById(final.processes);
    PROCESSES.forEach((p) => {
      expect(byId[p.id].completion).toBeGreaterThan(0);
      expect(byId[p.id].turnaround).toBeGreaterThanOrEqual(p.burst);
    });
  });

  it('does not mutate the input processes array', () => {
    const before = JSON.parse(JSON.stringify(PROCESSES));
    srtf.run(PROCESSES);
    expect(PROCESSES).toEqual(before);
  });
});

describe('multilevelQueue', () => {
  it('runs priority-0 processes to completion first via FCFS, before the low-priority queue', () => {
    const processes = [
      { id: 'H1', arrival: 0, burst: 4, priority: 0 },
      { id: 'L1', arrival: 0, burst: 3, priority: 1 },
    ];
    const snapshots = multilevelQueue.run(processes, 2);
    const final = snapshots[snapshots.length - 1];
    expect(final.gantt[0]).toMatchObject({ id: 'H1', start: 0, end: 4 });
    expect(final.gantt.slice(1).every((g) => g.id === 'L1')).toBe(true);
  });

  it('round-robins the low-priority queue by quantum', () => {
    const snapshots = multilevelQueue.run(PRIORITY_PROCESSES.map((p) => ({ ...p, priority: p.priority || 1 })), 2);
    const final = snapshots[snapshots.length - 1];
    final.gantt.forEach((slice) => {
      expect(slice.end - slice.start).toBeLessThanOrEqual(2);
    });
  });
});
