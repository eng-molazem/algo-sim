import { describe, it, expect } from 'vitest';
import bfs from '../graph/bfs';
import dfs from '../graph/dfs';
import dijkstra from '../graph/dijkstra';
import kruskal from '../graph/kruskal';
import prim from '../graph/prim';
import { parseGraph } from '../graph/buildGraph';

const SAMPLE = 'A-B:4,A-C:2,B-C:1,B-D:5,C-D:8,C-E:10,D-E:2,D-F:6,E-F:3';

describe('parseGraph', () => {
  it('extracts unique nodes in order of first appearance', () => {
    const { nodeOrder } = parseGraph('A-B,B-C,A-C');
    expect(nodeOrder).toEqual(['A', 'B', 'C']);
  });

  it('parses weights, defaulting to 1 when omitted', () => {
    const { edges } = parseGraph('A-B:5,B-C');
    expect(edges[0]).toMatchObject({ from: 'A', to: 'B', weight: 5 });
    expect(edges[1]).toMatchObject({ from: 'B', to: 'C', weight: 1 });
  });

  it('builds an undirected adjacency list by default', () => {
    const { adjacency } = parseGraph('A-B:3');
    expect(adjacency.A).toEqual([{ to: 'B', weight: 3 }]);
    expect(adjacency.B).toEqual([{ to: 'A', weight: 3 }]);
  });

  it('lays nodes out on a circle without NaN coordinates', () => {
    const { nodes } = parseGraph(SAMPLE);
    nodes.forEach((n) => {
      expect(Number.isNaN(n.x)).toBe(false);
      expect(Number.isNaN(n.y)).toBe(false);
    });
  });
});

describe('bfs', () => {
  it('visits every reachable node starting from the first node', () => {
    const snapshots = bfs.run(SAMPLE);
    const final = snapshots[snapshots.length - 1];
    expect(final.visited.sort()).toEqual(['A', 'B', 'C', 'D', 'E', 'F'].sort());
    expect(final.visited[0]).toBe('A');
  });
});

describe('dfs', () => {
  it('visits every reachable node starting from the first node', () => {
    const snapshots = dfs.run(SAMPLE);
    const final = snapshots[snapshots.length - 1];
    expect(final.visited.sort()).toEqual(['A', 'B', 'C', 'D', 'E', 'F'].sort());
    expect(final.visited[0]).toBe('A');
  });
});

describe('dijkstra', () => {
  it('computes the correct shortest distances from the source', () => {
    const snapshots = dijkstra.run(SAMPLE);
    const final = snapshots[snapshots.length - 1];
    expect(final.distances.A).toBe(0);
    expect(final.distances.C).toBe(2);
    expect(final.distances.B).toBe(3); // A->C->B (2+1) beats direct A->B (4)
    expect(final.distances.D).toBe(8); // A->C->B->D (2+1+5)
  });
});

describe('kruskal', () => {
  it('builds a minimum spanning tree connecting every node with V-1 edges', () => {
    const snapshots = kruskal.run(SAMPLE);
    const final = snapshots[snapshots.length - 1];
    expect(final.mstEdges).toHaveLength(5); // 6 nodes -> 5 edges
    const totalWeight = final.mstEdges.reduce((s, e) => s + e.weight, 0);
    expect(totalWeight).toBe(1 + 2 + 5 + 2 + 3); // B-C, A-C, B-D, D-E, E-F
  });
});

describe('prim', () => {
  it('builds a minimum spanning tree with the same total weight as Kruskal', () => {
    const kruskalFinal = kruskal.run(SAMPLE).pop();
    const primFinal = prim.run(SAMPLE).pop();
    const weightOf = (mst) => mst.mstEdges.reduce((s, e) => s + e.weight, 0);
    expect(weightOf(primFinal)).toBe(weightOf(kruskalFinal));
    expect(primFinal.mstEdges).toHaveLength(5);
  });
});
