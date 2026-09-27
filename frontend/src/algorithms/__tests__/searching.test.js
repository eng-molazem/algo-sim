import { describe, it, expect } from 'vitest';
import linearSearch from '../searching/linearSearch';
import binarySearch from '../searching/binarySearch';
import jumpSearch from '../searching/jumpSearch';
import interpolationSearch from '../searching/interpolationSearch';
import exponentialSearch from '../searching/exponentialSearch';

describe('linearSearch', () => {
  const arr = [5, 3, 8, 2, 9];

  it('finds an existing element at the correct index', () => {
    const snapshots = linearSearch.run(arr, 8);
    const final = snapshots[snapshots.length - 1];
    expect(final.found).toBe(2);
    expect(final.tag).toBe('found');
  });

  it('reports -1-equivalent when the element is missing', () => {
    const snapshots = linearSearch.run(arr, 999);
    const final = snapshots[snapshots.length - 1];
    expect(final.found).toBeNull();
    expect(final.tag).toBe('not-found');
  });

  it('stops scanning as soon as the element is found', () => {
    const snapshots = linearSearch.run(arr, 5);
    // start + 1 compare + final = 3 snapshots, since target is at index 0
    expect(snapshots).toHaveLength(3);
  });
});

describe('binarySearch', () => {
  const arr = [9, 2, 5, 8, 3];
  const sorted = [...arr].sort((a, b) => a - b);

  it('sorts the array internally before searching', () => {
    const snapshots = binarySearch.run(arr, 5);
    expect(snapshots[0].array).toEqual(sorted);
  });

  it('finds an existing element', () => {
    const snapshots = binarySearch.run(arr, 8);
    const final = snapshots[snapshots.length - 1];
    expect(final.found).toBe(sorted.indexOf(8));
    expect(final.tag).toBe('found');
  });

  it('reports not-found for a missing element', () => {
    const snapshots = binarySearch.run(arr, 999);
    const final = snapshots[snapshots.length - 1];
    expect(final.found).toBeNull();
    expect(final.tag).toBe('not-found');
  });
});

describe.each([
  ['jumpSearch', jumpSearch],
  ['interpolationSearch', interpolationSearch],
  ['exponentialSearch', exponentialSearch],
])('%s', (name, algorithm) => {
  const arr = [4, 12, 7, 1, 19, 23, 8, 15, 3, 30, 42, 6];
  const sorted = [...arr].sort((a, b) => a - b);

  it('sorts the array internally before searching', () => {
    const snapshots = algorithm.run(arr, 15);
    expect(snapshots[0].array).toEqual(sorted);
  });

  it.each(sorted)('finds every existing value %i at its correct sorted index', (value) => {
    const snapshots = algorithm.run(arr, value);
    const final = snapshots[snapshots.length - 1];
    expect(final.found).toBe(sorted.indexOf(value));
    expect(final.tag).toBe('found');
  });

  it('reports not-found for a value below the range', () => {
    const snapshots = algorithm.run(arr, -100);
    const final = snapshots[snapshots.length - 1];
    expect(final.found).toBeNull();
    expect(final.tag).toBe('not-found');
  });

  it('reports not-found for a value above the range', () => {
    const snapshots = algorithm.run(arr, 9999);
    const final = snapshots[snapshots.length - 1];
    expect(final.found).toBeNull();
    expect(final.tag).toBe('not-found');
  });

  it('reports not-found for a value inside the range but absent', () => {
    const snapshots = algorithm.run(arr, 13);
    const final = snapshots[snapshots.length - 1];
    expect(final.found).toBeNull();
    expect(final.tag).toBe('not-found');
  });
});
