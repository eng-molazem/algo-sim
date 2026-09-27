export default {
  python: {
    code: `def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    visited = set()
    while len(visited) < len(graph):
        u = min((n for n in graph if n not in visited), key=lambda n: dist[n])
        visited.add(u)
        for neighbor, weight in graph[u]:
            if dist[u] + weight < dist[neighbor]:
                dist[neighbor] = dist[u] + weight
    return dist`,
    lines: { start: [1, 2, 3, 4], visit: [6, 7], relax: [8, 9, 10], done: [11] },
  },
  c: {
    code: `void dijkstra(Graph* g, int start, int* dist) {
    bool visited[MAX] = {false};
    for (int i = 0; i < g->n; i++) dist[i] = INT_MAX;
    dist[start] = 0;
    for (int count = 0; count < g->n; count++) {
        int u = pickClosestUnvisited(dist, visited, g->n);
        visited[u] = true;
        for (int i = 0; i < g->degree[u]; i++) {
            int v = g->adj[u][i], w = g->weight[u][i];
            if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
        }
    }
}`,
    lines: { start: [1, 2, 3, 4], visit: [6, 7], relax: [8, 9, 10], done: [12] },
  },
  cpp: {
    code: `void dijkstra(Graph& g, string start, map<string, int>& dist) {
    set<string> visited;
    for (auto& [node, _] : g) dist[node] = INT_MAX;
    dist[start] = 0;
    while (visited.size() < g.size()) {
        string u = pickClosestUnvisited(g, dist, visited);
        visited.insert(u);
        for (auto& [v, w] : g[u]) {
            if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
        }
    }
}`,
    lines: { start: [1, 2, 3, 4], visit: [6, 7], relax: [8, 9, 10], done: [11] },
  },
  csharp: {
    code: `void Dijkstra(Dictionary<string, List<(string, int)>> graph, string start, Dictionary<string, int> dist) {
    var visited = new HashSet<string>();
    foreach (var node in graph.Keys) dist[node] = int.MaxValue;
    dist[start] = 0;
    while (visited.Count < graph.Count) {
        var u = PickClosestUnvisited(graph, dist, visited);
        visited.Add(u);
        foreach (var (v, w) in graph[u]) {
            if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
        }
    }
}`,
    lines: { start: [1, 2, 3, 4], visit: [6, 7], relax: [8, 9, 10], done: [11] },
  },
  java: {
    code: `void dijkstra(Map<String, List<int[]>> graph, String start, Map<String, Integer> dist) {
    Set<String> visited = new HashSet<>();
    for (String node : graph.keySet()) dist.put(node, Integer.MAX_VALUE);
    dist.put(start, 0);
    while (visited.size() < graph.size()) {
        String u = pickClosestUnvisited(graph, dist, visited);
        visited.add(u);
        for (var edge : graph.get(u)) {
            if (dist.get(u) + edge.weight < dist.get(edge.to)) dist.put(edge.to, dist.get(u) + edge.weight);
        }
    }
}`,
    lines: { start: [1, 2, 3, 4], visit: [6, 7], relax: [8, 9], done: [11] },
  },
  kotlin: {
    code: `fun dijkstra(graph: Map<String, List<Pair<String, Int>>>, start: String): Map<String, Int> {
    val dist = graph.keys.associateWith { Int.MAX_VALUE }.toMutableMap()
    dist[start] = 0
    val visited = mutableSetOf<String>()
    while (visited.size < graph.size) {
        val u = pickClosestUnvisited(graph, dist, visited)
        visited.add(u)
        for ((v, w) in graph[u].orEmpty()) {
            if (dist[u]!! + w < dist[v]!!) dist[v] = dist[u]!! + w
        }
    }
    return dist
}`,
    lines: { start: [1, 2, 3, 4], visit: [6, 7], relax: [8, 9, 10], done: [12] },
  },
  swift: {
    code: `func dijkstra(_ graph: [String: [(String, Int)]], _ start: String) -> [String: Int] {
    var dist = Dictionary(uniqueKeysWithValues: graph.keys.map { ($0, Int.max) })
    dist[start] = 0
    var visited = Set<String>()
    while visited.count < graph.count {
        let u = pickClosestUnvisited(graph, dist, visited)
        visited.insert(u)
        for (v, w) in graph[u] ?? [] {
            if dist[u]! + w < dist[v]! { dist[v] = dist[u]! + w }
        }
    }
    return dist
}`,
    lines: { start: [1, 2, 3, 4], visit: [6, 7], relax: [8, 9, 10], done: [12] },
  },
  javascript: {
    code: `function dijkstra(graph, start) {
  const dist = {};
  Object.keys(graph).forEach((n) => { dist[n] = Infinity; });
  dist[start] = 0;
  const visited = new Set();
  while (visited.size < Object.keys(graph).length) {
    const u = pickClosestUnvisited(graph, dist, visited);
    visited.add(u);
    graph[u].forEach(([v, w]) => {
      if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
    });
  }
  return dist;
}`,
    lines: { start: [1, 2, 3, 4], visit: [6, 7, 8], relax: [9, 10, 11], done: [14] },
  },
  typescript: {
    code: `function dijkstra(graph: Record<string, [string, number][]>, start: string): Record<string, number> {
  const dist: Record<string, number> = {};
  Object.keys(graph).forEach((n) => { dist[n] = Infinity; });
  dist[start] = 0;
  const visited = new Set<string>();
  while (visited.size < Object.keys(graph).length) {
    const u = pickClosestUnvisited(graph, dist, visited);
    visited.add(u);
    graph[u].forEach(([v, w]) => {
      if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
    });
  }
  return dist;
}`,
    lines: { start: [1, 2, 3, 4], visit: [6, 7, 8], relax: [9, 10, 11], done: [14] },
  },
  go: {
    code: `func dijkstra(graph map[string][]Edge, start string) map[string]int {
    dist := map[string]int{}
    for node := range graph {
        dist[node] = math.MaxInt32
    }
    dist[start] = 0
    visited := map[string]bool{}
    for len(visited) < len(graph) {
        u := pickClosestUnvisited(graph, dist, visited)
        visited[u] = true
        for _, e := range graph[u] {
            if dist[u]+e.Weight < dist[e.To] {
                dist[e.To] = dist[u] + e.Weight
            }
        }
    }
    return dist
}`,
    lines: { start: [1, 2, 3, 4, 5, 6], visit: [8, 9, 10], relax: [11, 12, 13], done: [16] },
  },
  rust: {
    code: `fn dijkstra(graph: &HashMap<String, Vec<(String, i32)>>, start: &str) -> HashMap<String, i32> {
    let mut dist: HashMap<String, i32> = graph.keys().map(|k| (k.clone(), i32::MAX)).collect();
    dist.insert(start.to_string(), 0);
    let mut visited: HashSet<String> = HashSet::new();
    while visited.len() < graph.len() {
        let u = pick_closest_unvisited(graph, &dist, &visited);
        visited.insert(u.clone());
        for (v, w) in &graph[&u] {
            if dist[&u] + w < dist[v] {
                dist.insert(v.clone(), dist[&u] + w);
            }
        }
    }
    dist
}`,
    lines: { start: [1, 2, 3, 4], visit: [6, 7], relax: [8, 9, 10, 11], done: [14] },
  },
  php: {
    code: `function dijkstra(array $graph, string $start): array {
    $dist = array_fill_keys(array_keys($graph), PHP_INT_MAX);
    $dist[$start] = 0;
    $visited = [];
    while (count($visited) < count($graph)) {
        $u = pickClosestUnvisited($graph, $dist, $visited);
        $visited[] = $u;
        foreach ($graph[$u] as [$v, $w]) {
            if ($dist[$u] + $w < $dist[$v]) $dist[$v] = $dist[$u] + $w;
        }
    }
    return $dist;
}`,
    lines: { start: [1, 2, 3, 4], visit: [6, 7], relax: [8, 9, 10], done: [12] },
  },
};
