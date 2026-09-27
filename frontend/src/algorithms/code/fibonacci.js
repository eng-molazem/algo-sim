export default {
  python: {
    code: `def fibonacci(n):
    table = [0] * (n + 1)
    table[0] = 0
    if n >= 1:
        table[1] = 1
    for i in range(2, n + 1):
        table[i] = table[i - 1] + table[i - 2]
    return table[n]`,
    lines: { 'base-case': [2, 3, 4, 5], compute: [6, 7], done: [8] },
  },
  c: {
    code: `int fibonacci(int n) {
    int table[n + 1];
    table[0] = 0;
    if (n >= 1) table[1] = 1;
    for (int i = 2; i <= n; i++) {
        table[i] = table[i - 1] + table[i - 2];
    }
    return table[n];
}`,
    lines: { 'base-case': [2, 3, 4], compute: [5, 6, 7], done: [8] },
  },
  cpp: {
    code: `int fibonacci(int n) {
    vector<int> table(n + 1);
    table[0] = 0;
    if (n >= 1) table[1] = 1;
    for (int i = 2; i <= n; i++) {
        table[i] = table[i - 1] + table[i - 2];
    }
    return table[n];
}`,
    lines: { 'base-case': [2, 3, 4], compute: [5, 6, 7], done: [8] },
  },
  csharp: {
    code: `int Fibonacci(int n) {
    var table = new int[n + 1];
    table[0] = 0;
    if (n >= 1) table[1] = 1;
    for (int i = 2; i <= n; i++) {
        table[i] = table[i - 1] + table[i - 2];
    }
    return table[n];
}`,
    lines: { 'base-case': [2, 3, 4], compute: [5, 6, 7], done: [8] },
  },
  java: {
    code: `int fibonacci(int n) {
    int[] table = new int[n + 1];
    table[0] = 0;
    if (n >= 1) table[1] = 1;
    for (int i = 2; i <= n; i++) {
        table[i] = table[i - 1] + table[i - 2];
    }
    return table[n];
}`,
    lines: { 'base-case': [2, 3, 4], compute: [5, 6, 7], done: [8] },
  },
  kotlin: {
    code: `fun fibonacci(n: Int): Int {
    val table = IntArray(n + 1)
    table[0] = 0
    if (n >= 1) table[1] = 1
    for (i in 2..n) {
        table[i] = table[i - 1] + table[i - 2]
    }
    return table[n]
}`,
    lines: { 'base-case': [2, 3, 4], compute: [5, 6, 7], done: [8] },
  },
  swift: {
    code: `func fibonacci(_ n: Int) -> Int {
    var table = [Int](repeating: 0, count: n + 1)
    table[0] = 0
    if n >= 1 { table[1] = 1 }
    var i = 2
    while i <= n {
        table[i] = table[i - 1] + table[i - 2]
        i += 1
    }
    return table[n]
}`,
    lines: { 'base-case': [2, 3, 4, 5], compute: [6, 7, 8], done: [10] },
  },
  javascript: {
    code: `function fibonacci(n) {
  const table = new Array(n + 1).fill(0);
  table[0] = 0;
  if (n >= 1) table[1] = 1;
  for (let i = 2; i <= n; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }
  return table[n];
}`,
    lines: { 'base-case': [2, 3, 4], compute: [5, 6, 7], done: [8] },
  },
  typescript: {
    code: `function fibonacci(n: number): number {
  const table = new Array(n + 1).fill(0);
  table[0] = 0;
  if (n >= 1) table[1] = 1;
  for (let i = 2; i <= n; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }
  return table[n];
}`,
    lines: { 'base-case': [2, 3, 4], compute: [5, 6, 7], done: [8] },
  },
  go: {
    code: `func fibonacci(n int) int {
    table := make([]int, n+1)
    table[0] = 0
    if n >= 1 {
        table[1] = 1
    }
    for i := 2; i <= n; i++ {
        table[i] = table[i-1] + table[i-2]
    }
    return table[n]
}`,
    lines: { 'base-case': [2, 3, 4, 5, 6], compute: [7, 8, 9], done: [10] },
  },
  rust: {
    code: `fn fibonacci(n: usize) -> i64 {
    let mut table = vec![0i64; n + 1];
    table[0] = 0;
    if n >= 1 { table[1] = 1; }
    for i in 2..=n {
        table[i] = table[i - 1] + table[i - 2];
    }
    table[n]
}`,
    lines: { 'base-case': [2, 3, 4], compute: [5, 6, 7], done: [8] },
  },
  php: {
    code: `function fibonacci(int $n): int {
    $table = array_fill(0, $n + 1, 0);
    $table[0] = 0;
    if ($n >= 1) $table[1] = 1;
    for ($i = 2; $i <= $n; $i++) {
        $table[$i] = $table[$i - 1] + $table[$i - 2];
    }
    return $table[$n];
}`,
    lines: { 'base-case': [2, 3, 4], compute: [5, 6, 7], done: [8] },
  },
};
