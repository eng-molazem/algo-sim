import { describe, it, expect } from 'vitest';
import bubbleSort from '../sorting/bubbleSort';
import mergeSort from '../sorting/mergeSort';
import quickSort from '../sorting/quickSort';
import insertionSort from '../sorting/insertionSort';
import selectionSort from '../sorting/selectionSort';
import heapSort from '../sorting/heapSort';
import shellSort from '../sorting/shellSort';
import countingSort from '../sorting/countingSort';

const INPUT = [5, 3, 8, 2, 9, 1, 7];
const EXPECTED = [...INPUT].sort((a, b) => a - b);

describe.each([
  ['bubbleSort', bubbleSort],
  ['mergeSort', mergeSort],
  ['quickSort', quickSort],
  ['insertionSort', insertionSort],
  ['selectionSort', selectionSort],
  ['heapSort', heapSort],
  ['shellSort', shellSort],
  ['countingSort', countingSort],
])('%s', (name, algorithm) => {
  it('produces a fully sorted array as the final snapshot', () => {
    const snapshots = algorithm.run(INPUT);
    const finalSnapshot = snapshots[snapshots.length - 1];
    expect(finalSnapshot.array).toEqual(EXPECTED);
  });

  it('does not mutate the original input array', () => {
    const copy = [...INPUT];
    algorithm.run(INPUT);
    expect(INPUT).toEqual(copy);
  });

  it('starts with a "start" tag and ends with a "done" tag', () => {
    const snapshots = algorithm.run(INPUT);
    expect(snapshots[0].tag).toBe('start');
    expect(snapshots[snapshots.length - 1].tag).toBe('done');
  });

  it('marks every index as sorted in the final snapshot', () => {
    const snapshots = algorithm.run(INPUT);
    const finalSnapshot = snapshots[snapshots.length - 1];
    expect(finalSnapshot.sortedIndices.slice().sort((a, b) => a - b)).toEqual(
      INPUT.map((_, i) => i)
    );
  });

  it('handles already-sorted input without error', () => {
    const sorted = [1, 2, 3, 4, 5];
    const snapshots = algorithm.run(sorted);
    expect(snapshots[snapshots.length - 1].array).toEqual(sorted);
  });

  it('handles a single-element array', () => {
    const snapshots = algorithm.run([42]);
    expect(snapshots[snapshots.length - 1].array).toEqual([42]);
  });
});
