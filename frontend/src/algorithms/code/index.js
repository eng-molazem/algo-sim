import bubbleSort from './bubbleSort';
import mergeSort from './mergeSort';
import quickSort from './quickSort';
import insertionSort from './insertionSort';
import selectionSort from './selectionSort';
import heapSort from './heapSort';
import shellSort from './shellSort';
import countingSort from './countingSort';
import linearSearch from './linearSearch';
import binarySearch from './binarySearch';
import jumpSearch from './jumpSearch';
import interpolationSearch from './interpolationSearch';
import exponentialSearch from './exponentialSearch';
import fcfs from './fcfs';
import sjf from './sjf';
import roundRobin from './roundRobin';
import priorityScheduling from './priorityScheduling';
import srtf from './srtf';
import multilevelQueue from './multilevelQueue';
import stack from './stack';
import balancedParentheses from './balancedParentheses';
import expressionEvaluation from './expressionEvaluation';
import queue from './queue';
import circularQueue from './circularQueue';
import linkedList from './linkedList';
import doublyLinkedList from './doublyLinkedList';
import circularLinkedList from './circularLinkedList';
import bst from './bst';
import bstSearch from './bstSearch';
import inOrderTraversal from './inOrderTraversal';
import preOrderTraversal from './preOrderTraversal';
import postOrderTraversal from './postOrderTraversal';
import avlInsert from './avlInsert';
import bfs from './bfs';
import dfs from './dfs';
import dijkstra from './dijkstra';
import kruskal from './kruskal';
import prim from './prim';
import fibonacci from './fibonacci';
import knapsack from './knapsack';
import lcs from './lcs';
import hashChaining from './hashChaining';
import hashLinearProbing from './hashLinearProbing';

const CODE_BY_ALGORITHM = {
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
};

export const LANGUAGES = [
  { key: 'python', label: 'Python' },
  { key: 'c', label: 'C' },
  { key: 'cpp', label: 'C++' },
  { key: 'csharp', label: 'C#' },
  { key: 'java', label: 'Java' },
  { key: 'kotlin', label: 'Kotlin' },
  { key: 'swift', label: 'Swift' },
  { key: 'javascript', label: 'JavaScript' },
  { key: 'typescript', label: 'TypeScript' },
  { key: 'go', label: 'Go' },
  { key: 'rust', label: 'Rust' },
  { key: 'php', label: 'PHP' },
];

export function getAlgorithmCode(algorithmKey) {
  return CODE_BY_ALGORITHM[algorithmKey] || null;
}

export function getActiveLines(algorithmKey, language, tag) {
  const entry = getAlgorithmCode(algorithmKey);
  if (!entry || !tag) return [];
  const langEntry = entry[language];
  if (!langEntry) return [];
  return langEntry.lines[tag] || [];
}
