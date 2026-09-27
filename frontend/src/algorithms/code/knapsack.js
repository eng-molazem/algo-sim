export default {
  python: {
    code: `def knapsack(items, capacity):
    n = len(items)
    table = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        weight, value = items[i - 1]
        for w in range(capacity + 1):
            if weight > w:
                table[i][w] = table[i - 1][w]
            else:
                table[i][w] = max(table[i - 1][w], value + table[i - 1][w - weight])
    return table[n][capacity]`,
    lines: { 'base-case': [1, 2, 3], skip: [7, 8], compute: [9, 10], done: [11] },
  },
  c: {
    code: `int knapsack(Item items[], int n, int capacity) {
    int table[n + 1][capacity + 1];
    memset(table, 0, sizeof(table));
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (items[i - 1].weight > w) {
                table[i][w] = table[i - 1][w];
            } else {
                int with = items[i - 1].value + table[i - 1][w - items[i - 1].weight];
                table[i][w] = max(table[i - 1][w], with);
            }
        }
    }
    return table[n][capacity];
}`,
    lines: { 'base-case': [2, 3], skip: [6, 7], compute: [8, 9, 10], done: [14] },
  },
  cpp: {
    code: `int knapsack(vector<Item>& items, int capacity) {
    int n = items.size();
    vector<vector<int>> table(n + 1, vector<int>(capacity + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (items[i - 1].weight > w) {
                table[i][w] = table[i - 1][w];
            } else {
                table[i][w] = max(table[i - 1][w], items[i - 1].value + table[i - 1][w - items[i - 1].weight]);
            }
        }
    }
    return table[n][capacity];
}`,
    lines: { 'base-case': [1, 2, 3], skip: [6, 7], compute: [8, 9], done: [13] },
  },
  csharp: {
    code: `int Knapsack(Item[] items, int capacity) {
    int n = items.Length;
    var table = new int[n + 1, capacity + 1];
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (items[i - 1].Weight > w) {
                table[i, w] = table[i - 1, w];
            } else {
                table[i, w] = Math.Max(table[i - 1, w], items[i - 1].Value + table[i - 1, w - items[i - 1].Weight]);
            }
        }
    }
    return table[n, capacity];
}`,
    lines: { 'base-case': [1, 2, 3], skip: [6, 7], compute: [8, 9], done: [13] },
  },
  java: {
    code: `int knapsack(Item[] items, int capacity) {
    int n = items.length;
    int[][] table = new int[n + 1][capacity + 1];
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (items[i - 1].weight > w) {
                table[i][w] = table[i - 1][w];
            } else {
                table[i][w] = Math.max(table[i - 1][w], items[i - 1].value + table[i - 1][w - items[i - 1].weight]);
            }
        }
    }
    return table[n][capacity];
}`,
    lines: { 'base-case': [1, 2, 3], skip: [6, 7], compute: [8, 9], done: [13] },
  },
  kotlin: {
    code: `fun knapsack(items: List<Item>, capacity: Int): Int {
    val n = items.size
    val table = Array(n + 1) { IntArray(capacity + 1) }
    for (i in 1..n) {
        for (w in 0..capacity) {
            table[i][w] = if (items[i - 1].weight > w) {
                table[i - 1][w]
            } else {
                maxOf(table[i - 1][w], items[i - 1].value + table[i - 1][w - items[i - 1].weight])
            }
        }
    }
    return table[n][capacity]
}`,
    lines: { 'base-case': [1, 2, 3], skip: [6, 7], compute: [8, 9], done: [13] },
  },
  swift: {
    code: `func knapsack(_ items: [Item], _ capacity: Int) -> Int {
    let n = items.count
    var table = Array(repeating: Array(repeating: 0, count: capacity + 1), count: n + 1)
    guard n > 0 else { return 0 }
    for i in 1...n {
        for w in 0...capacity {
            if items[i - 1].weight > w {
                table[i][w] = table[i - 1][w]
            } else {
                table[i][w] = max(table[i - 1][w], items[i - 1].value + table[i - 1][w - items[i - 1].weight])
            }
        }
    }
    return table[n][capacity]
}`,
    lines: { 'base-case': [1, 2, 3, 4], skip: [7, 8], compute: [9, 10], done: [14] },
  },
  javascript: {
    code: `function knapsack(items, capacity) {
  const n = items.length;
  const table = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (items[i - 1].weight > w) {
        table[i][w] = table[i - 1][w];
      } else {
        table[i][w] = Math.max(table[i - 1][w], items[i - 1].value + table[i - 1][w - items[i - 1].weight]);
      }
    }
  }
  return table[n][capacity];
}`,
    lines: { 'base-case': [1, 2, 3], skip: [6, 7], compute: [8, 9], done: [13] },
  },
  typescript: {
    code: `function knapsack(items: Item[], capacity: number): number {
  const n = items.length;
  const table = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (items[i - 1].weight > w) {
        table[i][w] = table[i - 1][w];
      } else {
        table[i][w] = Math.max(table[i - 1][w], items[i - 1].value + table[i - 1][w - items[i - 1].weight]);
      }
    }
  }
  return table[n][capacity];
}`,
    lines: { 'base-case': [1, 2, 3], skip: [6, 7], compute: [8, 9], done: [13] },
  },
  go: {
    code: `func knapsack(items []Item, capacity int) int {
    n := len(items)
    table := make([][]int, n+1)
    for i := range table {
        table[i] = make([]int, capacity+1)
    }
    for i := 1; i <= n; i++ {
        for w := 0; w <= capacity; w++ {
            if items[i-1].Weight > w {
                table[i][w] = table[i-1][w]
            } else {
                table[i][w] = max(table[i-1][w], items[i-1].Value+table[i-1][w-items[i-1].Weight])
            }
        }
    }
    return table[n][capacity]
}`,
    lines: { 'base-case': [2, 3, 4, 5, 6], skip: [9, 10], compute: [11, 12], done: [16] },
  },
  rust: {
    code: `fn knapsack(items: &[Item], capacity: usize) -> i32 {
    let n = items.len();
    let mut table = vec![vec![0; capacity + 1]; n + 1];
    for i in 1..=n {
        for w in 0..=capacity {
            if items[i - 1].weight > w {
                table[i][w] = table[i - 1][w];
            } else {
                table[i][w] = table[i - 1][w].max(items[i - 1].value + table[i - 1][w - items[i - 1].weight]);
            }
        }
    }
    table[n][capacity]
}`,
    lines: { 'base-case': [1, 2, 3], skip: [6, 7], compute: [8, 9], done: [13] },
  },
  php: {
    code: `function knapsack(array $items, int $capacity): int {
    $n = count($items);
    $table = array_fill(0, $n + 1, array_fill(0, $capacity + 1, 0));
    for ($i = 1; $i <= $n; $i++) {
        for ($w = 0; $w <= $capacity; $w++) {
            if ($items[$i - 1]['weight'] > $w) {
                $table[$i][$w] = $table[$i - 1][$w];
            } else {
                $table[$i][$w] = max($table[$i - 1][$w], $items[$i - 1]['value'] + $table[$i - 1][$w - $items[$i - 1]['weight']]);
            }
        }
    }
    return $table[$n][$capacity];
}`,
    lines: { 'base-case': [1, 2, 3], skip: [6, 7], compute: [8, 9], done: [13] },
  },
};
