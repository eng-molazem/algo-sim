export default {
  python: {
    code: `def lcs(a, b):
    n, m = len(a), len(b)
    table = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                table[i][j] = table[i - 1][j - 1] + 1
            else:
                table[i][j] = max(table[i - 1][j], table[i][j - 1])
    return table[n][m]`,
    lines: { 'base-case': [1, 2, 3], match: [6, 7], mismatch: [8, 9], done: [10] },
  },
  c: {
    code: `int lcs(char* a, char* b, int n, int m) {
    int table[n + 1][m + 1];
    memset(table, 0, sizeof(table));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (a[i - 1] == b[j - 1]) {
                table[i][j] = table[i - 1][j - 1] + 1;
            } else {
                table[i][j] = max(table[i - 1][j], table[i][j - 1]);
            }
        }
    }
    return table[n][m];
}`,
    lines: { 'base-case': [2, 3], match: [6, 7], mismatch: [8, 9], done: [13] },
  },
  cpp: {
    code: `int lcs(string a, string b) {
    int n = a.size(), m = b.size();
    vector<vector<int>> table(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (a[i - 1] == b[j - 1]) {
                table[i][j] = table[i - 1][j - 1] + 1;
            } else {
                table[i][j] = max(table[i - 1][j], table[i][j - 1]);
            }
        }
    }
    return table[n][m];
}`,
    lines: { 'base-case': [1, 2, 3], match: [6, 7], mismatch: [8, 9], done: [13] },
  },
  csharp: {
    code: `int Lcs(string a, string b) {
    int n = a.Length, m = b.Length;
    var table = new int[n + 1, m + 1];
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (a[i - 1] == b[j - 1]) {
                table[i, j] = table[i - 1, j - 1] + 1;
            } else {
                table[i, j] = Math.Max(table[i - 1, j], table[i, j - 1]);
            }
        }
    }
    return table[n, m];
}`,
    lines: { 'base-case': [1, 2, 3], match: [6, 7], mismatch: [8, 9], done: [13] },
  },
  java: {
    code: `int lcs(String a, String b) {
    int n = a.length(), m = b.length();
    int[][] table = new int[n + 1][m + 1];
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (a.charAt(i - 1) == b.charAt(j - 1)) {
                table[i][j] = table[i - 1][j - 1] + 1;
            } else {
                table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
            }
        }
    }
    return table[n][m];
}`,
    lines: { 'base-case': [1, 2, 3], match: [6, 7], mismatch: [8, 9], done: [13] },
  },
  kotlin: {
    code: `fun lcs(a: String, b: String): Int {
    val n = a.length; val m = b.length
    val table = Array(n + 1) { IntArray(m + 1) }
    for (i in 1..n) {
        for (j in 1..m) {
            table[i][j] = if (a[i - 1] == b[j - 1]) {
                table[i - 1][j - 1] + 1
            } else {
                maxOf(table[i - 1][j], table[i][j - 1])
            }
        }
    }
    return table[n][m]
}`,
    lines: { 'base-case': [1, 2, 3], match: [6, 7], mismatch: [8, 9], done: [13] },
  },
  swift: {
    code: `func lcs(_ a: String, _ b: String) -> Int {
    let aChars = Array(a); let bChars = Array(b)
    let n = aChars.count; let m = bChars.count
    var table = Array(repeating: Array(repeating: 0, count: m + 1), count: n + 1)
    guard n > 0 && m > 0 else { return 0 }
    for i in 1...n {
        for j in 1...m {
            if aChars[i - 1] == bChars[j - 1] {
                table[i][j] = table[i - 1][j - 1] + 1
            } else {
                table[i][j] = max(table[i - 1][j], table[i][j - 1])
            }
        }
    }
    return table[n][m]
}`,
    lines: { 'base-case': [1, 2, 3, 4, 5], match: [8, 9], mismatch: [10, 11], done: [15] },
  },
  javascript: {
    code: `function lcs(a, b) {
  const n = a.length;
  const m = b.length;
  const table = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        table[i][j] = table[i - 1][j - 1] + 1;
      } else {
        table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
      }
    }
  }
  return table[n][m];
}`,
    lines: { 'base-case': [1, 2, 3, 4], match: [7, 8], mismatch: [9, 10], done: [14] },
  },
  typescript: {
    code: `function lcs(a: string, b: string): number {
  const n = a.length;
  const m = b.length;
  const table = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        table[i][j] = table[i - 1][j - 1] + 1;
      } else {
        table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
      }
    }
  }
  return table[n][m];
}`,
    lines: { 'base-case': [1, 2, 3, 4], match: [7, 8], mismatch: [9, 10], done: [14] },
  },
  go: {
    code: `func lcs(a, b string) int {
    n, m := len(a), len(b)
    table := make([][]int, n+1)
    for i := range table {
        table[i] = make([]int, m+1)
    }
    for i := 1; i <= n; i++ {
        for j := 1; j <= m; j++ {
            if a[i-1] == b[j-1] {
                table[i][j] = table[i-1][j-1] + 1
            } else {
                table[i][j] = max(table[i-1][j], table[i][j-1])
            }
        }
    }
    return table[n][m]
}`,
    lines: { 'base-case': [2, 3, 4, 5, 6], match: [9, 10], mismatch: [11, 12], done: [16] },
  },
  rust: {
    code: `fn lcs(a: &str, b: &str) -> i32 {
    let (a, b): (Vec<char>, Vec<char>) = (a.chars().collect(), b.chars().collect());
    let (n, m) = (a.len(), b.len());
    let mut table = vec![vec![0; m + 1]; n + 1];
    for i in 1..=n {
        for j in 1..=m {
            if a[i - 1] == b[j - 1] {
                table[i][j] = table[i - 1][j - 1] + 1;
            } else {
                table[i][j] = table[i - 1][j].max(table[i][j - 1]);
            }
        }
    }
    table[n][m]
}`,
    lines: { 'base-case': [1, 2, 3, 4], match: [7, 8], mismatch: [9, 10], done: [14] },
  },
  php: {
    code: `function lcs(string $a, string $b): int {
    $n = strlen($a);
    $m = strlen($b);
    $table = array_fill(0, $n + 1, array_fill(0, $m + 1, 0));
    for ($i = 1; $i <= $n; $i++) {
        for ($j = 1; $j <= $m; $j++) {
            if ($a[$i - 1] === $b[$j - 1]) {
                $table[$i][$j] = $table[$i - 1][$j - 1] + 1;
            } else {
                $table[$i][$j] = max($table[$i - 1][$j], $table[$i][$j - 1]);
            }
        }
    }
    return $table[$n][$m];
}`,
    lines: { 'base-case': [1, 2, 3, 4], match: [7, 8], mismatch: [9, 10], done: [14] },
  },
};
