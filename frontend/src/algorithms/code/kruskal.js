export default {
  python: {
    code: `def find(parent, x):
    while parent[x] != x:
        x = parent[x]
    return x

def kruskal(nodes, edges):
    parent = {n: n for n in nodes}
    mst = []
    for edge in sorted(edges, key=lambda e: e.weight):
        root_a, root_b = find(parent, edge.a), find(parent, edge.b)
        if root_a != root_b:
            parent[root_a] = root_b
            mst.append(edge)
    return mst`,
    lines: { start: [6, 7, 8, 9], 'accept-edge': [11, 12, 13], 'reject-edge': [10], done: [14] },
  },
  c: {
    code: `int find(int* parent, int x) {
    while (parent[x] != x) x = parent[x];
    return x;
}

void kruskal(Edge edges[], int m, int parent[], Edge mst[], int* mstSize) {
    sortByWeight(edges, m);
    for (int i = 0; i < m; i++) {
        int ra = find(parent, edges[i].a);
        int rb = find(parent, edges[i].b);
        if (ra != rb) {
            parent[ra] = rb;
            mst[(*mstSize)++] = edges[i];
        }
    }
}`,
    lines: { start: [6, 7], 'accept-edge': [11, 12, 13], 'reject-edge': [10], done: [15] },
  },
  cpp: {
    code: `int find(vector<int>& parent, int x) {
    while (parent[x] != x) x = parent[x];
    return x;
}

vector<Edge> kruskal(vector<int>& parent, vector<Edge> edges) {
    sort(edges.begin(), edges.end(), byWeight);
    vector<Edge> mst;
    for (auto& e : edges) {
        int ra = find(parent, e.a), rb = find(parent, e.b);
        if (ra != rb) {
            parent[ra] = rb;
            mst.push_back(e);
        }
    }
    return mst;
}`,
    lines: { start: [6, 7, 8], 'accept-edge': [11, 12, 13], 'reject-edge': [10], done: [16] },
  },
  csharp: {
    code: `int Find(int[] parent, int x) {
    while (parent[x] != x) x = parent[x];
    return x;
}

List<Edge> Kruskal(int[] parent, List<Edge> edges) {
    edges.Sort((a, b) => a.Weight.CompareTo(b.Weight));
    var mst = new List<Edge>();
    foreach (var e in edges) {
        int ra = Find(parent, e.A), rb = Find(parent, e.B);
        if (ra != rb) {
            parent[ra] = rb;
            mst.Add(e);
        }
    }
    return mst;
}`,
    lines: { start: [6, 7, 8], 'accept-edge': [11, 12, 13], 'reject-edge': [10], done: [16] },
  },
  java: {
    code: `int find(int[] parent, int x) {
    while (parent[x] != x) x = parent[x];
    return x;
}

List<Edge> kruskal(int[] parent, List<Edge> edges) {
    edges.sort(Comparator.comparingInt(e -> e.weight));
    List<Edge> mst = new ArrayList<>();
    for (Edge e : edges) {
        int ra = find(parent, e.a), rb = find(parent, e.b);
        if (ra != rb) {
            parent[ra] = rb;
            mst.add(e);
        }
    }
    return mst;
}`,
    lines: { start: [6, 7, 8], 'accept-edge': [11, 12, 13], 'reject-edge': [10], done: [16] },
  },
  kotlin: {
    code: `fun find(parent: IntArray, x: Int): Int {
    var i = x
    while (parent[i] != i) i = parent[i]
    return i
}

fun kruskal(parent: IntArray, edges: List<Edge>): List<Edge> {
    val sorted = edges.sortedBy { it.weight }
    val mst = mutableListOf<Edge>()
    for (e in sorted) {
        val ra = find(parent, e.a); val rb = find(parent, e.b)
        if (ra != rb) {
            parent[ra] = rb
            mst.add(e)
        }
    }
    return mst
}`,
    lines: { start: [6, 7, 8], 'accept-edge': [11, 12, 13], 'reject-edge': [10], done: [16] },
  },
  swift: {
    code: `func find(_ parent: inout [Int], _ x: Int) -> Int {
    var i = x
    while parent[i] != i { i = parent[i] }
    return i
}

func kruskal(_ parent: inout [Int], _ edges: [Edge]) -> [Edge] {
    let sorted = edges.sorted { $0.weight < $1.weight }
    var mst: [Edge] = []
    for e in sorted {
        let ra = find(&parent, e.a), rb = find(&parent, e.b)
        if ra != rb {
            parent[ra] = rb
            mst.append(e)
        }
    }
    return mst
}`,
    lines: { start: [6, 7, 8], 'accept-edge': [11, 12, 13], 'reject-edge': [10], done: [16] },
  },
  javascript: {
    code: `function find(parent, x) {
  while (parent[x] !== x) x = parent[x];
  return x;
}

function kruskal(parent, edges) {
  const sorted = [...edges].sort((a, b) => a.weight - b.weight);
  const mst = [];
  sorted.forEach((e) => {
    const ra = find(parent, e.a);
    const rb = find(parent, e.b);
    if (ra !== rb) {
      parent[ra] = rb;
      mst.push(e);
    }
  });
  return mst;
}`,
    lines: { start: [6, 7, 8], 'accept-edge': [12, 13, 14], 'reject-edge': [11], done: [17] },
  },
  typescript: {
    code: `function find(parent: number[], x: number): number {
  while (parent[x] !== x) x = parent[x];
  return x;
}

function kruskal(parent: number[], edges: Edge[]): Edge[] {
  const sorted = [...edges].sort((a, b) => a.weight - b.weight);
  const mst: Edge[] = [];
  sorted.forEach((e) => {
    const ra = find(parent, e.a);
    const rb = find(parent, e.b);
    if (ra !== rb) {
      parent[ra] = rb;
      mst.push(e);
    }
  });
  return mst;
}`,
    lines: { start: [6, 7, 8], 'accept-edge': [12, 13, 14], 'reject-edge': [11], done: [17] },
  },
  go: {
    code: `func find(parent []int, x int) int {
    for parent[x] != x {
        x = parent[x]
    }
    return x
}

func kruskal(parent []int, edges []Edge) []Edge {
    sort.Slice(edges, func(i, j int) bool { return edges[i].Weight < edges[j].Weight })
    mst := []Edge{}
    for _, e := range edges {
        ra, rb := find(parent, e.A), find(parent, e.B)
        if ra != rb {
            parent[ra] = rb
            mst = append(mst, e)
        }
    }
    return mst
}`,
    lines: { start: [8, 9, 10], 'accept-edge': [13, 14, 15], 'reject-edge': [12], done: [18] },
  },
  rust: {
    code: `fn find(parent: &mut Vec<usize>, x: usize) -> usize {
    let mut i = x;
    while parent[i] != i { i = parent[i]; }
    i
}

fn kruskal(parent: &mut Vec<usize>, mut edges: Vec<Edge>) -> Vec<Edge> {
    edges.sort_by_key(|e| e.weight);
    let mut mst = Vec::new();
    for e in edges {
        let ra = find(parent, e.a);
        let rb = find(parent, e.b);
        if ra != rb {
            parent[ra] = rb;
            mst.push(e);
        }
    }
    mst
}`,
    lines: { start: [7, 8, 9], 'accept-edge': [13, 14, 15], 'reject-edge': [12], done: [18] },
  },
  php: {
    code: `function find(array &$parent, $x) {
    while ($parent[$x] !== $x) $x = $parent[$x];
    return $x;
}

function kruskal(array &$parent, array $edges): array {
    usort($edges, fn($a, $b) => $a->weight <=> $b->weight);
    $mst = [];
    foreach ($edges as $e) {
        $ra = find($parent, $e->a);
        $rb = find($parent, $e->b);
        if ($ra !== $rb) {
            $parent[$ra] = $rb;
            $mst[] = $e;
        }
    }
    return $mst;
}`,
    lines: { start: [6, 7, 8], 'accept-edge': [12, 13, 14], 'reject-edge': [11], done: [17] },
  },
};
