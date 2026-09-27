export default {
  python: {
    code: `def dfs(graph, start):
    visited = []
    stack = [start]
    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.append(node)
        for neighbor in reversed(graph[node]):
            if neighbor not in visited:
                stack.append(neighbor)
    return visited`,
    lines: { start: [1, 2, 3], visit: [5, 6, 7, 8], push: [9, 10, 11], done: [12] },
  },
  c: {
    code: `void dfs(Graph* g, int start, int* visited, int* count) {
    int stack[100], top = 0;
    stack[top++] = start;
    while (top > 0) {
        int node = stack[--top];
        if (visited[node]) continue;
        visited[node] = 1;
        for (int i = g->degree[node] - 1; i >= 0; i--) {
            int neighbor = g->adj[node][i];
            if (!visited[neighbor]) stack[top++] = neighbor;
        }
    }
}`,
    lines: { start: [1, 2, 3], visit: [5, 6, 7], push: [8, 9, 10, 11], done: [13] },
  },
  cpp: {
    code: `void dfs(Graph& g, string start) {
    vector<string> visited;
    stack<string> st;
    st.push(start);
    while (!st.empty()) {
        string node = st.top(); st.pop();
        if (count(visited.begin(), visited.end(), node)) continue;
        visited.push_back(node);
        for (auto it = g[node].rbegin(); it != g[node].rend(); ++it) {
            if (!count(visited.begin(), visited.end(), *it)) st.push(*it);
        }
    }
}`,
    lines: { start: [1, 2, 3, 4], visit: [6, 7, 8], push: [9, 10, 11], done: [13] },
  },
  csharp: {
    code: `void Dfs(Dictionary<string, List<string>> graph, string start) {
    var visited = new List<string>();
    var stack = new Stack<string>();
    stack.Push(start);
    while (stack.Count > 0) {
        var node = stack.Pop();
        if (visited.Contains(node)) continue;
        visited.Add(node);
        foreach (var neighbor in Enumerable.Reverse(graph[node])) {
            if (!visited.Contains(neighbor)) stack.Push(neighbor);
        }
    }
}`,
    lines: { start: [1, 2, 3, 4], visit: [6, 7, 8], push: [9, 10, 11], done: [13] },
  },
  java: {
    code: `void dfs(Map<String, List<String>> graph, String start) {
    List<String> visited = new ArrayList<>();
    Deque<String> stack = new ArrayDeque<>(List.of(start));
    while (!stack.isEmpty()) {
        String node = stack.pop();
        if (visited.contains(node)) continue;
        visited.add(node);
        List<String> neighbors = new ArrayList<>(graph.get(node));
        Collections.reverse(neighbors);
        for (String neighbor : neighbors) {
            if (!visited.contains(neighbor)) stack.push(neighbor);
        }
    }
}`,
    lines: { start: [1, 2, 3], visit: [5, 6, 7], push: [8, 9, 10, 11, 12], done: [14] },
  },
  kotlin: {
    code: `fun dfs(graph: Map<String, List<String>>, start: String): List<String> {
    val visited = mutableListOf<String>()
    val stack = ArrayDeque(listOf(start))
    while (stack.isNotEmpty()) {
        val node = stack.removeLast()
        if (node in visited) continue
        visited.add(node)
        for (neighbor in graph[node].orEmpty().asReversed()) {
            if (neighbor !in visited) stack.addLast(neighbor)
        }
    }
    return visited
}`,
    lines: { start: [1, 2, 3], visit: [5, 6, 7], push: [8, 9, 10], done: [12] },
  },
  swift: {
    code: `func dfs(_ graph: [String: [String]], _ start: String) -> [String] {
    var visited: [String] = []
    var stack = [start]
    while !stack.isEmpty {
        let node = stack.removeLast()
        if visited.contains(node) { continue }
        visited.append(node)
        for neighbor in (graph[node] ?? []).reversed() {
            if !visited.contains(neighbor) { stack.append(neighbor) }
        }
    }
    return visited
}`,
    lines: { start: [1, 2, 3], visit: [5, 6, 7], push: [8, 9, 10], done: [12] },
  },
  javascript: {
    code: `function dfs(graph, start) {
  const visited = [];
  const stack = [start];
  while (stack.length) {
    const node = stack.pop();
    if (visited.includes(node)) continue;
    visited.push(node);
    [...graph[node]].reverse().forEach((neighbor) => {
      if (!visited.includes(neighbor)) stack.push(neighbor);
    });
  }
  return visited;
}`,
    lines: { start: [1, 2, 3], visit: [5, 6, 7], push: [8, 9, 10], done: [13] },
  },
  typescript: {
    code: `function dfs(graph: Record<string, string[]>, start: string): string[] {
  const visited: string[] = [];
  const stack = [start];
  while (stack.length) {
    const node = stack.pop()!;
    if (visited.includes(node)) continue;
    visited.push(node);
    [...graph[node]].reverse().forEach((neighbor) => {
      if (!visited.includes(neighbor)) stack.push(neighbor);
    });
  }
  return visited;
}`,
    lines: { start: [1, 2, 3], visit: [5, 6, 7], push: [8, 9, 10], done: [13] },
  },
  go: {
    code: `func dfs(graph map[string][]string, start string) []string {
    visited := []string{}
    stack := []string{start}
    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        if contains(visited, node) {
            continue
        }
        visited = append(visited, node)
        for _, neighbor := range reverse(graph[node]) {
            if !contains(visited, neighbor) {
                stack = append(stack, neighbor)
            }
        }
    }
    return visited
}`,
    lines: { start: [1, 2, 3], visit: [5, 6, 7, 8, 9, 10], push: [12, 13, 14, 15, 16], done: [19] },
  },
  rust: {
    code: `fn dfs(graph: &HashMap<String, Vec<String>>, start: &str) -> Vec<String> {
    let mut visited: Vec<String> = Vec::new();
    let mut stack = vec![start.to_string()];
    while let Some(node) = stack.pop() {
        if visited.contains(&node) { continue; }
        visited.push(node.clone());
        for neighbor in graph[&node].iter().rev() {
            if !visited.contains(neighbor) { stack.push(neighbor.clone()); }
        }
    }
    visited
}`,
    lines: { start: [1, 2, 3], visit: [4, 5, 6], push: [7, 8, 9], done: [11] },
  },
  php: {
    code: `function dfs(array $graph, string $start): array {
    $visited = [];
    $stack = [$start];
    while (!empty($stack)) {
        $node = array_pop($stack);
        if (in_array($node, $visited)) continue;
        $visited[] = $node;
        foreach (array_reverse($graph[$node]) as $neighbor) {
            if (!in_array($neighbor, $visited)) $stack[] = $neighbor;
        }
    }
    return $visited;
}`,
    lines: { start: [1, 2, 3], visit: [5, 6, 7], push: [8, 9, 10], done: [12] },
  },
};
