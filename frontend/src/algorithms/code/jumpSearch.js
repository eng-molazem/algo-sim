export default {
  python: {
    code: `def jump_search(arr, target):
    n = len(arr)
    step = max(1, int(n ** 0.5))
    prev = 0
    curr = min(step, n) - 1
    while curr < n and arr[curr] < target:
        prev = curr + 1
        curr = min(curr + step, n - 1)
        if prev > n - 1:
            return -1
    for i in range(prev, min(curr, n - 1) + 1):
        if arr[i] == target:
            return i
    return -1`,
    lines: { start: [1, 2, 3, 4, 5], jump: [6, 7, 8], 'linear-search': [11, 12], found: [13], 'not-found': [14] },
  },
  c: {
    code: `int jumpSearch(int arr[], int n, int target) {
    int step = (int)sqrt((double)n);
    if (step < 1) step = 1;
    int prev = 0;
    int curr = (step < n ? step : n) - 1;
    while (curr < n && arr[curr] < target) {
        prev = curr + 1;
        curr += step;
        if (curr > n - 1) curr = n - 1;
        if (prev > n - 1) return -1;
    }
    for (int i = prev; i <= curr && i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    lines: { start: [1, 2, 3, 4, 5], jump: [6, 7, 8, 9], 'linear-search': [12, 13], found: [14], 'not-found': [17] },
  },
  cpp: {
    code: `int jumpSearch(vector<int>& arr, int target) {
    int n = arr.size();
    int step = max(1, (int)sqrt(n));
    int prev = 0;
    int curr = min(step, n) - 1;
    while (curr < n && arr[curr] < target) {
        prev = curr + 1;
        curr = min(curr + step, n - 1);
        if (prev > n - 1) return -1;
    }
    for (int i = prev; i <= curr && i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    lines: { start: [1, 2, 3, 4, 5], jump: [6, 7, 8, 9], 'linear-search': [11, 12], found: [13], 'not-found': [16] },
  },
  csharp: {
    code: `int JumpSearch(int[] arr, int target) {
    int n = arr.Length;
    int step = Math.Max(1, (int)Math.Sqrt(n));
    int prev = 0;
    int curr = Math.Min(step, n) - 1;
    while (curr < n && arr[curr] < target) {
        prev = curr + 1;
        curr = Math.Min(curr + step, n - 1);
        if (prev > n - 1) return -1;
    }
    for (int i = prev; i <= curr && i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    lines: { start: [1, 2, 3, 4, 5], jump: [6, 7, 8, 9], 'linear-search': [11, 12], found: [13], 'not-found': [16] },
  },
  java: {
    code: `int jumpSearch(int[] arr, int target) {
    int n = arr.length;
    int step = Math.max(1, (int) Math.sqrt(n));
    int prev = 0;
    int curr = Math.min(step, n) - 1;
    while (curr < n && arr[curr] < target) {
        prev = curr + 1;
        curr = Math.min(curr + step, n - 1);
        if (prev > n - 1) return -1;
    }
    for (int i = prev; i <= curr && i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    lines: { start: [1, 2, 3, 4, 5], jump: [6, 7, 8, 9], 'linear-search': [11, 12], found: [13], 'not-found': [16] },
  },
  kotlin: {
    code: `fun jumpSearch(arr: IntArray, target: Int): Int {
    val n = arr.size
    val step = maxOf(1, Math.sqrt(n.toDouble()).toInt())
    var prev = 0
    var curr = minOf(step, n) - 1
    while (curr < n && arr[curr] < target) {
        prev = curr + 1
        curr = minOf(curr + step, n - 1)
        if (prev > n - 1) return -1
    }
    for (i in prev..minOf(curr, n - 1)) {
        if (arr[i] == target) {
            return i
        }
    }
    return -1
}`,
    lines: { start: [1, 2, 3, 4, 5], jump: [6, 7, 8, 9], 'linear-search': [11, 12], found: [13], 'not-found': [16] },
  },
  swift: {
    code: `func jumpSearch(_ arr: [Int], _ target: Int) -> Int {
    let n = arr.count
    let step = max(1, Int(Double(n).squareRoot()))
    var prev = 0
    var curr = min(step, n) - 1
    while curr < n && arr[curr] < target {
        prev = curr + 1
        curr = min(curr + step, n - 1)
        if prev > n - 1 { return -1 }
    }
    var i = prev
    while i <= curr && i < n {
        if arr[i] == target {
            return i
        }
        i += 1
    }
    return -1
}`,
    lines: { start: [1, 2, 3, 4, 5], jump: [6, 7, 8, 9], 'linear-search': [12, 13], found: [14], 'not-found': [18] },
  },
  javascript: {
    code: `function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.max(1, Math.floor(Math.sqrt(n)));
  let prev = 0;
  let curr = Math.min(step, n) - 1;
  while (curr < n && arr[curr] < target) {
    prev = curr + 1;
    curr = Math.min(curr + step, n - 1);
    if (prev > n - 1) return -1;
  }
  for (let i = prev; i <= curr && i < n; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    lines: { start: [1, 2, 3, 4, 5], jump: [6, 7, 8, 9], 'linear-search': [11, 12], found: [13], 'not-found': [16] },
  },
  typescript: {
    code: `function jumpSearch(arr: number[], target: number): number {
  const n = arr.length;
  const step = Math.max(1, Math.floor(Math.sqrt(n)));
  let prev = 0;
  let curr = Math.min(step, n) - 1;
  while (curr < n && arr[curr] < target) {
    prev = curr + 1;
    curr = Math.min(curr + step, n - 1);
    if (prev > n - 1) return -1;
  }
  for (let i = prev; i <= curr && i < n; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    lines: { start: [1, 2, 3, 4, 5], jump: [6, 7, 8, 9], 'linear-search': [11, 12], found: [13], 'not-found': [16] },
  },
  go: {
    code: `func jumpSearch(arr []int, target int) int {
    n := len(arr)
    step := max(1, int(math.Sqrt(float64(n))))
    prev := 0
    curr := min(step, n) - 1
    for curr < n && arr[curr] < target {
        prev = curr + 1
        curr = min(curr+step, n-1)
        if prev > n-1 {
            return -1
        }
    }
    for i := prev; i <= curr && i < n; i++ {
        if arr[i] == target {
            return i
        }
    }
    return -1
}`,
    lines: { start: [1, 2, 3, 4, 5], jump: [6, 7, 8, 9], 'linear-search': [13, 14], found: [15], 'not-found': [18] },
  },
  rust: {
    code: `fn jump_search(arr: &Vec<i32>, target: i32) -> i32 {
    let n = arr.len();
    let step = ((n as f64).sqrt() as usize).max(1);
    let mut prev = 0;
    let mut curr = step.min(n) - 1;
    while curr < n && arr[curr] < target {
        prev = curr + 1;
        curr = (curr + step).min(n - 1);
        if prev > n - 1 {
            return -1;
        }
    }
    for i in prev..=curr.min(n - 1) {
        if arr[i] == target {
            return i as i32;
        }
    }
    -1
}`,
    lines: { start: [1, 2, 3, 4, 5], jump: [6, 7, 8, 9], 'linear-search': [13, 14], found: [15], 'not-found': [18] },
  },
  php: {
    code: `function jumpSearch(array $arr, int $target): int {
    $n = count($arr);
    $step = max(1, (int) sqrt($n));
    $prev = 0;
    $curr = min($step, $n) - 1;
    while ($curr < $n && $arr[$curr] < $target) {
        $prev = $curr + 1;
        $curr = min($curr + $step, $n - 1);
        if ($prev > $n - 1) return -1;
    }
    for ($i = $prev; $i <= $curr && $i < $n; $i++) {
        if ($arr[$i] === $target) {
            return $i;
        }
    }
    return -1;
}`,
    lines: { start: [1, 2, 3, 4, 5], jump: [6, 7, 8, 9], 'linear-search': [11, 12], found: [13], 'not-found': [16] },
  },
};
