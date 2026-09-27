import bubbleSort from './sorting/bubbleSort';
import mergeSort from './sorting/mergeSort';
import quickSort from './sorting/quickSort';
import insertionSort from './sorting/insertionSort';
import selectionSort from './sorting/selectionSort';
import heapSort from './sorting/heapSort';
import shellSort from './sorting/shellSort';
import countingSort from './sorting/countingSort';
import linearSearch from './searching/linearSearch';
import binarySearch from './searching/binarySearch';
import jumpSearch from './searching/jumpSearch';
import interpolationSearch from './searching/interpolationSearch';
import exponentialSearch from './searching/exponentialSearch';
import fcfs from './scheduling/fcfs';
import sjf from './scheduling/sjf';
import roundRobin from './scheduling/roundRobin';
import priorityScheduling from './scheduling/priorityScheduling';
import srtf from './scheduling/srtf';
import multilevelQueue from './scheduling/multilevelQueue';
import stack from './dataStructures/stack';
import balancedParentheses from './dataStructures/balancedParentheses';
import expressionEvaluation from './dataStructures/expressionEvaluation';
import queue from './dataStructures/queue';
import circularQueue from './dataStructures/circularQueue';
import linkedList from './dataStructures/linkedList';
import doublyLinkedList from './dataStructures/doublyLinkedList';
import circularLinkedList from './dataStructures/circularLinkedList';
import bst from './dataStructures/bst';
import bstSearch from './dataStructures/bstSearch';
import inOrderTraversal from './dataStructures/inOrderTraversal';
import preOrderTraversal from './dataStructures/preOrderTraversal';
import postOrderTraversal from './dataStructures/postOrderTraversal';
import avlInsert from './dataStructures/avlInsert';
import bfs from './graph/bfs';
import dfs from './graph/dfs';
import dijkstra from './graph/dijkstra';
import kruskal from './graph/kruskal';
import prim from './graph/prim';
import fibonacci from './dp/fibonacci';
import knapsack from './dp/knapsack';
import lcs from './dp/lcs';
import hashChaining from './hashing/hashChaining';
import hashLinearProbing from './hashing/hashLinearProbing';

/**
 * Strategy-pattern registry: the UI and the simulation engine depend only
 * on this uniform catalog of algorithms (each exposing a `run` strategy
 * and complexity metadata), never on a specific algorithm implementation.
 * Adding a new algorithm means registering a new module here — no change
 * to the engine or the visualization layer is required.
 */
export const CATEGORIES = [
  'sorting',
  'searching',
  'scheduling',
  'linkedList',
  'stack',
  'queue',
  'tree',
  'graph',
  'dp',
  'hashing',
];

export const ALGORITHMS = [
  bubbleSort,
  mergeSort,
  quickSort,
  insertionSort,
  selectionSort,
  heapSort,
  shellSort,
  countingSort,
  linearSearch,
  binarySearch,
  jumpSearch,
  interpolationSearch,
  exponentialSearch,
  fcfs,
  sjf,
  roundRobin,
  priorityScheduling,
  srtf,
  multilevelQueue,
  stack,
  balancedParentheses,
  expressionEvaluation,
  queue,
  circularQueue,
  linkedList,
  doublyLinkedList,
  circularLinkedList,
  bst,
  bstSearch,
  inOrderTraversal,
  preOrderTraversal,
  postOrderTraversal,
  avlInsert,
  bfs,
  dfs,
  dijkstra,
  kruskal,
  prim,
  fibonacci,
  knapsack,
  lcs,
  hashChaining,
  hashLinearProbing,
];

export function getAlgorithmsByCategory(category) {
  return ALGORITHMS.filter((a) => a.category === category);
}

export function getAlgorithm(key) {
  return ALGORITHMS.find((a) => a.key === key);
}

/**
 * Suggests a "what to try next" algorithm after a simulation completes:
 * prefers the next algorithm in the same category, wrapping around, so a
 * learner naturally keeps exploring related algorithms.
 */
export function getNextAlgorithmSuggestion(currentKey) {
  const current = getAlgorithm(currentKey);
  if (!current) return null;
  const siblings = getAlgorithmsByCategory(current.category).filter((a) => a.key !== currentKey);
  if (siblings.length) {
    const currentIndex = ALGORITHMS.findIndex((a) => a.key === currentKey);
    const nextSibling = siblings.find((a) => ALGORITHMS.findIndex((x) => x.key === a.key) > currentIndex);
    return nextSibling || siblings[0];
  }
  const currentCategoryIndex = CATEGORIES.indexOf(current.category);
  for (let i = 1; i <= CATEGORIES.length; i += 1) {
    const nextCategory = CATEGORIES[(currentCategoryIndex + i) % CATEGORIES.length];
    const candidates = getAlgorithmsByCategory(nextCategory);
    if (candidates.length) return candidates[0];
  }
  return null;
}
