import { describe, it, expect } from 'vitest';
import fibonacci from '../dp/fibonacci';
import knapsack from '../dp/knapsack';
import lcs from '../dp/lcs';

describe('fibonacci', () => {
  it('computes fib(10) = 55 via bottom-up DP', () => {
    const snapshots = fibonacci.run('10');
    const final = snapshots[snapshots.length - 1];
    expect(final.table[10]).toBe(55);
    expect(final.tag).toBe('done');
  });

  it('fills every table entry from index 0 to n', () => {
    const snapshots = fibonacci.run('6');
    const final = snapshots[snapshots.length - 1];
    expect(final.table).toEqual([0, 1, 1, 2, 3, 5, 8]);
  });
});

describe('knapsack', () => {
  it('finds the optimal 0/1 knapsack value for a known instance', () => {
    // classic textbook instance: capacity 10, items (w,v): (2,3),(3,4),(4,5),(5,6) -> optimal 13
    const snapshots = knapsack.run('10|2:3,3:4,4:5,5:6');
    const final = snapshots[snapshots.length - 1];
    expect(final.table[4][10]).toBe(13);
    expect(final.tag).toBe('done');
  });

  it('never exceeds capacity in the achievable value', () => {
    const snapshots = knapsack.run('5|10:100');
    const final = snapshots[snapshots.length - 1];
    // the only item is heavier than the capacity, so nothing fits
    expect(final.table[1][5]).toBe(0);
  });
});

describe('lcs', () => {
  it('computes the correct LCS length for a known instance', () => {
    const snapshots = lcs.run('ABCBDAB|BDCABA');
    const final = snapshots[snapshots.length - 1];
    expect(final.table[7][6]).toBe(4); // LCS length is 4 (e.g. BCBA)
    expect(final.tag).toBe('done');
  });

  it('returns 0 when the strings share no characters', () => {
    const snapshots = lcs.run('ABC|XYZ');
    const final = snapshots[snapshots.length - 1];
    expect(final.table[3][3]).toBe(0);
  });
});
