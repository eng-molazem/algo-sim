export default {
  python: {
    code: `def bfs(graph, start):
    visited = [start]
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.append(neighbor)
                queue.append(neighbor)
    return visited`,
    lines: { start: [1, 2, 3], visit: [5], enqueue: [6, 7, 8, 9], done: [10] },
  },
  c: {
    code: `void bfs(Graph* g, int start, int* visited, int* count) {
    int queue[100], front = 0, back = 0;
    queue[back++] = start;
    visited[start] = 1;
    while (front < back) {
        int node = queue[front++];
        for (int i = 0; i < g->degree[node]; i++) {
            int neighbor = g->adj[node][i];
            if (!visited[neighbor]) {
                visited[neighbor] = 1;
                queue[back++] = neighbor;
            }
        }
    }
}`,
    lines: { start: [1, 2, 3, 4], visit: [6], enqueue: [7, 8, 9, 10, 11], done: [14] },
  },
  cpp: {
    code: `void bfs(Graph& g, string start) {
    vector<string> visited = {start};
    queue<string> q;
    q.push(start);
    while (!q.empty()) {
        string node = q.front(); q.pop();
        for (auto& neighbor : g[node]) {
            if (find(visited.begin(), visited.end(), neighbor) == visited.end()) {
                visited.push_back(neighbor);
                q.push(neighbor);
            }
        }
    }
}`,
    lines: { start: [1, 2, 3, 4], visit: [6], enqueue: [7, 8, 9, 10], done: [13] },
  },
  csharp: {
    code: `void Bfs(Dictionary<string, List<string>> graph, string start) {
    var visited = new List<string> { start };
    var queue = new Queue<string>();
    queue.Enqueue(start);
    while (queue.Count > 0) {
        var node = queue.Dequeue();
        foreach (var neighbor in graph[node]) {
            if (!visited.Contains(neighbor)) {
                visited.Add(neighbor);
                queue.Enqueue(neighbor);
            }
        }
    }
}`,
    lines: { start: [1, 2, 3, 4], visit: [6], enqueue: [7, 8, 9, 10], done: [13] },
  },
  java: {
    code: `void bfs(Map<String, List<String>> graph, String start) {
    List<String> visited = new ArrayList<>(List.of(start));
    Queue<String> queue = new LinkedList<>(List.of(start));
    while (!queue.isEmpty()) {
        String node = queue.poll();
        for (String neighbor : graph.get(node)) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.add(neighbor);
            }
        }
    }
}`,
    lines: { start: [1, 2, 3], visit: [5], enqueue: [6, 7, 8, 9], done: [12] },
  },
  kotlin: {
    code: `fun bfs(graph: Map<String, List<String>>, start: String): List<String> {
    val visited = mutableListOf(start)
    val queue = ArrayDeque(listOf(start))
    while (queue.isNotEmpty()) {
        val node = queue.removeFirst()
        for (neighbor in graph[node].orEmpty()) {
            if (neighbor !in visited) {
                visited.add(neighbor)
                queue.addLast(neighbor)
            }
        }
    }
    return visited
}`,
    lines: { start: [1, 2, 3], visit: [5], enqueue: [6, 7, 8, 9], done: [12] },
  },
  swift: {
    code: `func bfs(_ graph: [String: [String]], _ start: String) -> [String] {
    var visited = [start]
    var queue = [start]
    while !queue.isEmpty {
        let node = queue.removeFirst()
        for neighbor in graph[node] ?? [] {
            if !visited.contains(neighbor) {
                visited.append(neighbor)
                queue.append(neighbor)
            }
        }
    }
    return visited
}`,
    lines: { start: [1, 2, 3], visit: [5], enqueue: [6, 7, 8, 9], done: [12] },
  },
  javascript: {
    code: `function bfs(graph, start) {
  const visited = [start];
  const queue = [start];
  while (queue.length) {
    const node = queue.shift();
    graph[node].forEach((neighbor) => {
      if (!visited.includes(neighbor)) {
        visited.push(neighbor);
        queue.push(neighbor);
      }
    });
  }
  return visited;
}`,
    lines: { start: [1, 2, 3], visit: [5], enqueue: [6, 7, 8, 9, 10], done: [13] },
  },
  typescript: {
    code: `function bfs(graph: Record<string, string[]>, start: string): string[] {
  const visited = [start];
  const queue = [start];
  while (queue.length) {
    const node = queue.shift()!;
    graph[node].forEach((neighbor) => {
      if (!visited.includes(neighbor)) {
        visited.push(neighbor);
        queue.push(neighbor);
      }
    });
  }
  return visited;
}`,
    lines: { start: [1, 2, 3], visit: [5], enqueue: [6, 7, 8, 9, 10], done: [13] },
  },
  go: {
    code: `func bfs(graph map[string][]string, start string) []string {
    visited := []string{start}
    queue := []string{start}
    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        for _, neighbor := range graph[node] {
            if !contains(visited, neighbor) {
                visited = append(visited, neighbor)
                queue = append(queue, neighbor)
            }
        }
    }
    return visited
}`,
    lines: { start: [1, 2, 3], visit: [5, 6], enqueue: [8, 9, 10, 11], done: [14] },
  },
  rust: {
    code: `fn bfs(graph: &HashMap<String, Vec<String>>, start: &str) -> Vec<String> {
    let mut visited = vec![start.to_string()];
    let mut queue = VecDeque::from([start.to_string()]);
    while let Some(node) = queue.pop_front() {
        for neighbor in &graph[&node] {
            if !visited.contains(neighbor) {
                visited.push(neighbor.clone());
                queue.push_back(neighbor.clone());
            }
        }
    }
    visited
}`,
    lines: { start: [1, 2, 3], visit: [4], enqueue: [5, 6, 7, 8], done: [11] },
  },
  php: {
    code: `function bfs(array $graph, string $start): array {
    $visited = [$start];
    $queue = [$start];
    while (!empty($queue)) {
        $node = array_shift($queue);
        foreach ($graph[$node] as $neighbor) {
            if (!in_array($neighbor, $visited)) {
                $visited[] = $neighbor;
                $queue[] = $neighbor;
            }
        }
    }
    return $visited;
}`,
    lines: { start: [1, 2, 3], visit: [5], enqueue: [6, 7, 8, 9], done: [12] },
  },
};
