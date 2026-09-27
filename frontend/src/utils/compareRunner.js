import { randomArray } from './randomArray';
import { buildBstFromValues } from '../algorithms/dataStructures/buildTree';

/**
 * Builds one shared "scenario" for a category so that every selected
 * algorithm in that category runs against identical data — required for a
 * fair comparison (final-results table or the live side-by-side race).
 */
const TEXT_INPUT_ALGORITHMS = new Set(['expressionEvaluation', 'balancedParentheses']);

export function buildCompareContext(category) {
  if (category === 'scheduling') {
    return {
      processes: [
        { id: 'P1', arrival: 0, burst: 5, priority: 2 },
        { id: 'P2', arrival: 1, burst: 3, priority: 1 },
        { id: 'P3', arrival: 2, burst: 8, priority: 3 },
        { id: 'P4', arrival: 4, burst: 4, priority: 1 },
      ],
    };
  }
  if (category === 'tree') {
    const values = randomArray(7, 50);
    const target = values[Math.floor(values.length / 2)];
    return { values, target, tree: buildBstFromValues(values) };
  }
  if (category === 'stack') {
    const array = randomArray(14);
    const target = array[Math.floor(array.length / 2)];
    return { array, target, text: '{[()()]}', expression: '(1+2)*(3-4)' };
  }
  if (category === 'graph') {
    return { graphText: 'A-B:4,A-C:2,B-C:1,B-D:5,C-D:8,C-E:10,D-E:2,D-F:6,E-F:3' };
  }
  if (category === 'dp') {
    return {
      dpText: {
        fibonacci: '10',
        knapsack: '10|2:3,3:4,4:5,5:6',
        lcs: 'ABCBDAB|BDCABA',
      },
    };
  }
  const array = randomArray(14);
  const target = array[Math.floor(array.length / 2)];
  return { array, target };
}

export function runAlgorithmForCompare(category, algorithm, ctx) {
  if (category === 'scheduling') {
    const processesCopy = ctx.processes.map((p) => ({ id: p.id, arrival: p.arrival, burst: p.burst, priority: p.priority ?? 0 }));
    return algorithm.key === 'roundRobin' || algorithm.key === 'multilevelQueue'
      ? algorithm.run(processesCopy, 2)
      : algorithm.run(processesCopy);
  }
  if (category === 'tree') {
    if (algorithm.key === 'bstSearch') return algorithm.run(ctx.tree, ctx.target);
    return algorithm.run(ctx.values);
  }
  if (category === 'stack' && TEXT_INPUT_ALGORITHMS.has(algorithm.key)) {
    return algorithm.run(algorithm.key === 'balancedParentheses' ? ctx.text : ctx.expression);
  }
  if (category === 'graph') return algorithm.run(ctx.graphText);
  if (category === 'dp') return algorithm.run(ctx.dpText[algorithm.key]);
  if (category === 'searching') return algorithm.run(ctx.array, ctx.target);
  return algorithm.run(ctx.array);
}
