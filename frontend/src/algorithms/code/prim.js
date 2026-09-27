export default {
  python: {
    code: `def prim(graph, start):
    in_mst = {start}
    mst = []
    while len(in_mst) < len(graph):
        best = None
        for u in in_mst:
            for v, w in graph[u]:
                if v not in in_mst and (best is None or w < best[2]):
                    best = (u, v, w)
        if best is None:
            break
        in_mst.add(best[1])
        mst.append(best)
    return mst`,
    lines: { start: [1, 2, 3], 'accept-edge': [10, 11], unreachable: [8, 9], done: [12] },
  },
  c: {
    code: `void prim(Graph* g, int start, Edge mst[], int* mstSize) {
    bool inMst[MAX] = {false};
    inMst[start] = true;
    int count = 1;
    while (count < g->n) {
        Edge best = findCheapestCrossingEdge(g, inMst);
        if (best.weight == INT_MAX) break;
        inMst[best.to] = true;
        mst[(*mstSize)++] = best;
        count++;
    }
}`,
    lines: { start: [2, 3, 4], 'accept-edge': [8, 9, 10], unreachable: [7], done: [11] },
  },
  cpp: {
    code: `vector<Edge> prim(Graph& g, string start) {
    set<string> inMst = {start};
    vector<Edge> mst;
    while (inMst.size() < g.size()) {
        Edge best = findCheapestCrossingEdge(g, inMst);
        if (!best.valid) break;
        inMst.insert(best.to);
        mst.push_back(best);
    }
    return mst;
}`,
    lines: { start: [1, 2, 3], 'accept-edge': [7, 8], unreachable: [6], done: [10] },
  },
  csharp: {
    code: `List<Edge> Prim(Dictionary<string, List<Edge>> graph, string start) {
    var inMst = new HashSet<string> { start };
    var mst = new List<Edge>();
    while (inMst.Count < graph.Count) {
        var best = FindCheapestCrossingEdge(graph, inMst);
        if (best == null) break;
        inMst.Add(best.To);
        mst.Add(best);
    }
    return mst;
}`,
    lines: { start: [1, 2, 3], 'accept-edge': [7, 8], unreachable: [6], done: [10] },
  },
  java: {
    code: `List<Edge> prim(Map<String, List<Edge>> graph, String start) {
    Set<String> inMst = new HashSet<>(Set.of(start));
    List<Edge> mst = new ArrayList<>();
    while (inMst.size() < graph.size()) {
        Edge best = findCheapestCrossingEdge(graph, inMst);
        if (best == null) break;
        inMst.add(best.to);
        mst.add(best);
    }
    return mst;
}`,
    lines: { start: [1, 2, 3], 'accept-edge': [7, 8], unreachable: [6], done: [10] },
  },
  kotlin: {
    code: `fun prim(graph: Map<String, List<Edge>>, start: String): List<Edge> {
    val inMst = mutableSetOf(start)
    val mst = mutableListOf<Edge>()
    while (inMst.size < graph.size) {
        val best = findCheapestCrossingEdge(graph, inMst) ?: break
        inMst.add(best.to)
        mst.add(best)
    }
    return mst
}`,
    lines: { start: [1, 2, 3], 'accept-edge': [6, 7], unreachable: [5], done: [9] },
  },
  swift: {
    code: `func prim(_ graph: [String: [Edge]], _ start: String) -> [Edge] {
    var inMst: Set<String> = [start]
    var mst: [Edge] = []
    while inMst.count < graph.count {
        guard let best = findCheapestCrossingEdge(graph, inMst) else { break }
        inMst.insert(best.to)
        mst.append(best)
    }
    return mst
}`,
    lines: { start: [1, 2, 3], 'accept-edge': [6, 7], unreachable: [5], done: [9] },
  },
  javascript: {
    code: `function prim(graph, start) {
  const inMst = new Set([start]);
  const mst = [];
  while (inMst.size < Object.keys(graph).length) {
    const best = findCheapestCrossingEdge(graph, inMst);
    if (!best) break;
    inMst.add(best.to);
    mst.push(best);
  }
  return mst;
}`,
    lines: { start: [1, 2, 3], 'accept-edge': [7, 8], unreachable: [6], done: [10] },
  },
  typescript: {
    code: `function prim(graph: Record<string, Edge[]>, start: string): Edge[] {
  const inMst = new Set([start]);
  const mst: Edge[] = [];
  while (inMst.size < Object.keys(graph).length) {
    const best = findCheapestCrossingEdge(graph, inMst);
    if (!best) break;
    inMst.add(best.to);
    mst.push(best);
  }
  return mst;
}`,
    lines: { start: [1, 2, 3], 'accept-edge': [7, 8], unreachable: [6], done: [10] },
  },
  go: {
    code: `func prim(graph map[string][]Edge, start string) []Edge {
    inMst := map[string]bool{start: true}
    mst := []Edge{}
    for len(inMst) < len(graph) {
        best, ok := findCheapestCrossingEdge(graph, inMst)
        if !ok {
            break
        }
        inMst[best.To] = true
        mst = append(mst, best)
    }
    return mst
}`,
    lines: { start: [1, 2, 3], 'accept-edge': [9, 10], unreachable: [6, 7, 8], done: [12] },
  },
  rust: {
    code: `fn prim(graph: &HashMap<String, Vec<Edge>>, start: &str) -> Vec<Edge> {
    let mut in_mst: HashSet<String> = HashSet::from([start.to_string()]);
    let mut mst = Vec::new();
    while in_mst.len() < graph.len() {
        match find_cheapest_crossing_edge(graph, &in_mst) {
            None => break,
            Some(best) => {
                in_mst.insert(best.to.clone());
                mst.push(best);
            }
        }
    }
    mst
}`,
    lines: { start: [1, 2, 3], 'accept-edge': [8, 9], unreachable: [6], done: [13] },
  },
  php: {
    code: `function prim(array $graph, string $start): array {
    $inMst = [$start => true];
    $mst = [];
    while (count($inMst) < count($graph)) {
        $best = findCheapestCrossingEdge($graph, $inMst);
        if ($best === null) break;
        $inMst[$best->to] = true;
        $mst[] = $best;
    }
    return $mst;
}`,
    lines: { start: [1, 2, 3], 'accept-edge': [7, 8], unreachable: [6], done: [10] },
  },
};
