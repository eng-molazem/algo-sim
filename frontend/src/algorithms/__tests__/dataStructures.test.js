import { describe, it, expect } from 'vitest';
import stack from '../dataStructures/stack';
import balancedParentheses from '../dataStructures/balancedParentheses';
import expressionEvaluation from '../dataStructures/expressionEvaluation';
import queue from '../dataStructures/queue';
import circularQueue from '../dataStructures/circularQueue';
import linkedList from '../dataStructures/linkedList';
import doublyLinkedList from '../dataStructures/doublyLinkedList';
import circularLinkedList from '../dataStructures/circularLinkedList';
import bst from '../dataStructures/bst';
import bstSearch from '../dataStructures/bstSearch';
import inOrderTraversal from '../dataStructures/inOrderTraversal';
import preOrderTraversal from '../dataStructures/preOrderTraversal';
import postOrderTraversal from '../dataStructures/postOrderTraversal';
import avlInsert from '../dataStructures/avlInsert';
import { buildBstFromValues, parseLevelOrder } from '../dataStructures/buildTree';

describe('stack', () => {
  it('pushes values in order and pops the last one (LIFO)', () => {
    const snapshots = stack.run([1, 2, 3]);
    const pushSnapshots = snapshots.filter((s) => s.tag === 'push-place');
    expect(pushSnapshots.map((s) => s.items[s.items.length - 1])).toEqual([1, 2, 3]);

    const popSnapshot = snapshots.find((s) => s.tag === 'pop-check');
    expect(popSnapshot.message).toBe('Pop() -> 3');
  });

  it('ends with the popped element removed', () => {
    const snapshots = stack.run([1, 2, 3]);
    const final = snapshots[snapshots.length - 1];
    expect(final.items).toEqual([1, 2]);
  });
});

describe('balancedParentheses', () => {
  it('reports balanced for correctly nested brackets', () => {
    const snapshots = balancedParentheses.run('{[()()]}');
    const final = snapshots[snapshots.length - 1];
    expect(final.tag).toBe('done');
    expect(final.balanced).toBe(true);
  });

  it('reports a mismatch and stops at the offending closing bracket', () => {
    const snapshots = balancedParentheses.run('([)]');
    const final = snapshots[snapshots.length - 1];
    expect(final.tag).toBe('mismatch');
    expect(final.balanced).toBe(false);
  });

  it('reports unbalanced when brackets are left open', () => {
    const snapshots = balancedParentheses.run('([{');
    const final = snapshots[snapshots.length - 1];
    expect(final.tag).toBe('done');
    expect(final.balanced).toBe(false);
  });
});

describe('expressionEvaluation', () => {
  it('converts a simple infix expression to postfix', () => {
    const snapshots = expressionEvaluation.run('(1+2)*3');
    const final = snapshots[snapshots.length - 1];
    expect(final.tag).toBe('done');
    expect(final.outputSoFar).toBe('1 2 + 3 *');
    expect(final.result).toBe(9);
  });

  it('respects operator precedence without parentheses', () => {
    const snapshots = expressionEvaluation.run('2+3*4');
    const final = snapshots[snapshots.length - 1];
    expect(final.outputSoFar).toBe('2 3 4 * +');
    expect(final.result).toBe(14);
  });
});

describe('queue', () => {
  it('enqueues values in order (FIFO)', () => {
    const snapshots = queue.run([1, 2, 3]);
    const enqueueSnapshots = snapshots.filter((s) => s.tag === 'enqueue-place');
    expect(enqueueSnapshots.map((s) => s.items[s.items.length - 1])).toEqual([1, 2, 3]);
  });

  it('dequeues the first-inserted element', () => {
    const snapshots = queue.run([1, 2, 3]);
    const dequeueSnapshot = snapshots.find((s) => s.tag === 'dequeue-check');
    expect(dequeueSnapshot.message).toBe('Dequeue() -> 1');
    const final = snapshots[snapshots.length - 1];
    expect(final.items).toEqual([2, 3]);
  });
});

describe('circularQueue', () => {
  it('wraps the rear index around the fixed-capacity buffer', () => {
    const snapshots = circularQueue.run([1, 2, 3, 4, 5]);
    const final = snapshots[snapshots.length - 1];
    expect(final.rear).toBe(4);
  });

  it('rejects enqueues once the buffer is full', () => {
    const snapshots = circularQueue.run([1, 2, 3, 4, 5, 6]);
    const fullSnapshot = snapshots.find((s) => s.tag === 'full');
    expect(fullSnapshot).toBeDefined();
    expect(fullSnapshot.message).toContain('6');
  });

  it('advances the front index after dequeue', () => {
    const snapshots = circularQueue.run([10, 20, 30]);
    const final = snapshots[snapshots.length - 1];
    expect(final.front).toBe(1);
  });
});

describe('linkedList', () => {
  it('inserts values at the tail in order', () => {
    const snapshots = linkedList.run([10, 20, 30]);
    const insertSnapshots = snapshots.filter((s) => s.tag === 'insert');
    expect(insertSnapshots.map((s) => s.nodes[s.nodes.length - 1].value)).toEqual([10, 20, 30]);
  });

  it('deletes the node at index 1 and shifts the rest', () => {
    const snapshots = linkedList.run([10, 20, 30]);
    const final = snapshots[snapshots.length - 1];
    expect(final.nodes.map((n) => n.value)).toEqual([10, 30]);
  });
});

describe('doublyLinkedList', () => {
  it('inserts values at the tail in order', () => {
    const snapshots = doublyLinkedList.run([10, 20, 30]);
    const insertSnapshots = snapshots.filter((s) => s.tag === 'insert');
    expect(insertSnapshots.map((s) => s.nodes[s.nodes.length - 1].value)).toEqual([10, 20, 30]);
  });

  it('traverses forward then backward before deleting', () => {
    const snapshots = doublyLinkedList.run([10, 20, 30]);
    const forward = snapshots.filter((s) => s.tag === 'traverse-forward').map((s) => s.nodes[s.activeIndex].value);
    const backward = snapshots.filter((s) => s.tag === 'traverse-backward').map((s) => s.nodes[s.activeIndex].value);
    expect(forward).toEqual([10, 20, 30]);
    expect(backward).toEqual([30, 20, 10]);
  });

  it('deletes the node at index 1 and shifts the rest', () => {
    const snapshots = doublyLinkedList.run([10, 20, 30]);
    const final = snapshots[snapshots.length - 1];
    expect(final.nodes.map((n) => n.value)).toEqual([10, 30]);
    expect(final.variant).toBe('doubly');
  });
});

describe('circularLinkedList', () => {
  it('inserts values at the tail in order', () => {
    const snapshots = circularLinkedList.run([10, 20, 30]);
    const insertSnapshots = snapshots.filter((s) => s.tag === 'insert');
    expect(insertSnapshots.map((s) => s.nodes[s.nodes.length - 1].value)).toEqual([10, 20, 30]);
  });

  it('wraps back to the head after one full lap', () => {
    const snapshots = circularLinkedList.run([10, 20, 30]);
    const wrapSnapshot = snapshots.find((s) => s.tag === 'wrap');
    expect(wrapSnapshot).toBeDefined();
    expect(wrapSnapshot.nodes[wrapSnapshot.activeIndex].value).toBe(10);
  });

  it('deletes the node at index 1 and stays circular', () => {
    const snapshots = circularLinkedList.run([10, 20, 30]);
    const final = snapshots[snapshots.length - 1];
    expect(final.nodes.map((n) => n.value)).toEqual([10, 30]);
    expect(final.variant).toBe('circular');
  });
});

describe('bst', () => {
  it('places the first inserted value as the root', () => {
    const snapshots = bst.run([5, 3, 8, 2, 9]);
    const final = snapshots[snapshots.length - 1];
    expect(final.tree.value).toBe(5);
  });

  it('respects BST ordering: smaller values go left, larger go right', () => {
    const snapshots = bst.run([5, 3, 8, 2, 9]);
    const final = snapshots[snapshots.length - 1];
    expect(final.tree.left.value).toBe(3);
    expect(final.tree.right.value).toBe(8);
    expect(final.tree.left.left.value).toBe(2);
    expect(final.tree.right.right.value).toBe(9);
  });

  it('flags inserting a duplicate value instead of creating a new node', () => {
    const snapshots = bst.run([5, 3, 5]);
    const duplicateSnapshot = snapshots.find((s) => s.tag === 'duplicate');
    expect(duplicateSnapshot).toBeDefined();
    expect(duplicateSnapshot.message).toContain('موجودة مسبقاً');
  });
});

describe('inOrderTraversal', () => {
  it('visits nodes in ascending sorted order', () => {
    const snapshots = inOrderTraversal.run([5, 3, 8, 2, 9]);
    const final = snapshots[snapshots.length - 1];
    expect(final.outputSoFar).toBe('2, 3, 5, 8, 9');
    expect(final.tag).toBe('done');
  });
});

describe('preOrderTraversal', () => {
  it('visits root before its children', () => {
    const snapshots = preOrderTraversal.run([5, 3, 8, 2, 9]);
    const final = snapshots[snapshots.length - 1];
    expect(final.outputSoFar).toBe('5, 3, 2, 8, 9');
  });
});

describe('postOrderTraversal', () => {
  it('visits children before the root', () => {
    const snapshots = postOrderTraversal.run([5, 3, 8, 2, 9]);
    const final = snapshots[snapshots.length - 1];
    expect(final.outputSoFar).toBe('2, 3, 9, 8, 5');
  });
});

describe('avlInsert', () => {
  it('performs a single left rotation (RR case) to stay balanced', () => {
    const snapshots = avlInsert.run([10, 20, 30]);
    const final = snapshots[snapshots.length - 1];
    expect(snapshots.some((s) => s.tag === 'rotate-left')).toBe(true);
    expect(final.tree.value).toBe(20);
    expect(final.tree.left.value).toBe(10);
    expect(final.tree.right.value).toBe(30);
  });

  it('performs a single right rotation (LL case) to stay balanced', () => {
    const snapshots = avlInsert.run([30, 20, 10]);
    const final = snapshots[snapshots.length - 1];
    expect(snapshots.some((s) => s.tag === 'rotate-right')).toBe(true);
    expect(final.tree.value).toBe(20);
    expect(final.tree.left.value).toBe(10);
    expect(final.tree.right.value).toBe(30);
  });

  it('performs a double left-right rotation (LR case) to stay balanced', () => {
    const snapshots = avlInsert.run([30, 10, 20]);
    const final = snapshots[snapshots.length - 1];
    expect(snapshots.some((s) => s.tag === 'rotate-left-right')).toBe(true);
    expect(final.tree.value).toBe(20);
    expect(final.tree.left.value).toBe(10);
    expect(final.tree.right.value).toBe(30);
  });

  it('flags inserting a duplicate value instead of creating a new node', () => {
    const snapshots = avlInsert.run([5, 3, 5]);
    const duplicateSnapshot = snapshots.find((s) => s.tag === 'duplicate');
    expect(duplicateSnapshot).toBeDefined();
  });
});

describe('buildTree helpers', () => {
  it('builds a valid BST from a flat list of values', () => {
    const tree = buildBstFromValues([5, 3, 8, 2, 9]);
    expect(tree.value).toBe(5);
    expect(tree.left.value).toBe(3);
    expect(tree.right.value).toBe(8);
  });

  it('parses level-order notation with gaps into the correct tree shape', () => {
    const tree = parseLevelOrder('8,3,10,1,6,,14');
    expect(tree.value).toBe(8);
    expect(tree.left.value).toBe(3);
    expect(tree.right.value).toBe(10);
    expect(tree.left.left.value).toBe(1);
    expect(tree.left.right.value).toBe(6);
    expect(tree.right.left).toBeNull();
    expect(tree.right.right.value).toBe(14);
  });

  it('rejects an invalid level-order string', () => {
    expect(parseLevelOrder('not,a,tree')).toBeNull();
    expect(parseLevelOrder('')).toBeNull();
  });
});

describe('bstSearch', () => {
  const tree = parseLevelOrder('8,3,10,1,6,,14,,,4,7,,,,13');

  it('finds a value that exists and colors the correct path', () => {
    const snapshots = bstSearch.run(tree, 7);
    const final = snapshots[snapshots.length - 1];
    expect(final.tag).toBe('found');
    expect(final.notFound).toBe(false);
  });

  it('reports not-found for a value that does not exist, stopping at the right node', () => {
    const snapshots = bstSearch.run(tree, 99);
    const final = snapshots[snapshots.length - 1];
    expect(final.tag).toBe('not-found');
    expect(final.notFound).toBe(true);
  });

  it('never mutates the tree it searches', () => {
    const before = JSON.stringify(tree);
    bstSearch.run(tree, 6);
    expect(JSON.stringify(tree)).toBe(before);
  });
});
