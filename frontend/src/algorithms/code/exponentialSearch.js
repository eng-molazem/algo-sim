export default {
  python: {
    code: `def exponential_search(arr, target):
    n = len(arr)
    if arr[0] == target:
        return 0
    i = 1
    while i < n and arr[i] <= target:
        i *= 2
    low = i // 2
    high = min(i, n - 1)
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    lines: { start: [1, 2, 3, 4], range: [6, 7], compare: [10, 11, 12], found: [13], narrow: [14, 15, 16, 17], 'not-found': [18] },
  },
  c: {
    code: `int exponentialSearch(int arr[], int n, int target) {
    if (arr[0] == target) return 0;
    int i = 1;
    while (i < n && arr[i] <= target) {
        i *= 2;
    }
    int low = i / 2;
    int high = (i < n - 1) ? i : n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`,
    lines: { start: [1, 2, 3], range: [4, 5], compare: [9, 10, 11], found: [12], narrow: [13, 14, 15, 16], 'not-found': [19] },
  },
  cpp: {
    code: `int exponentialSearch(vector<int>& arr, int target) {
    int n = arr.size();
    if (arr[0] == target) return 0;
    int i = 1;
    while (i < n && arr[i] <= target) {
        i *= 2;
    }
    int low = i / 2;
    int high = min(i, n - 1);
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`,
    lines: { start: [1, 2, 3, 4], range: [5, 6], compare: [10, 11, 12], found: [13], narrow: [14, 15, 16, 17], 'not-found': [20] },
  },
  csharp: {
    code: `int ExponentialSearch(int[] arr, int target) {
    int n = arr.Length;
    if (arr[0] == target) return 0;
    int i = 1;
    while (i < n && arr[i] <= target) {
        i *= 2;
    }
    int low = i / 2;
    int high = Math.Min(i, n - 1);
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`,
    lines: { start: [1, 2, 3, 4], range: [5, 6], compare: [10, 11, 12], found: [13], narrow: [14, 15, 16, 17], 'not-found': [20] },
  },
  java: {
    code: `int exponentialSearch(int[] arr, int target) {
    int n = arr.length;
    if (arr[0] == target) return 0;
    int i = 1;
    while (i < n && arr[i] <= target) {
        i *= 2;
    }
    int low = i / 2;
    int high = Math.min(i, n - 1);
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`,
    lines: { start: [1, 2, 3, 4], range: [5, 6], compare: [10, 11, 12], found: [13], narrow: [14, 15, 16, 17], 'not-found': [20] },
  },
  kotlin: {
    code: `fun exponentialSearch(arr: IntArray, target: Int): Int {
    val n = arr.size
    if (arr[0] == target) return 0
    var i = 1
    while (i < n && arr[i] <= target) {
        i *= 2
    }
    var low = i / 2
    var high = minOf(i, n - 1)
    while (low <= high) {
        val mid = (low + high) / 2
        if (arr[mid] == target) {
            return mid
        } else if (arr[mid] < target) {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return -1
}`,
    lines: { start: [1, 2, 3, 4], range: [5, 6], compare: [10, 11, 12], found: [13], narrow: [14, 15, 16, 17], 'not-found': [20] },
  },
  swift: {
    code: `func exponentialSearch(_ arr: [Int], _ target: Int) -> Int {
    let n = arr.count
    if arr[0] == target { return 0 }
    var i = 1
    while i < n && arr[i] <= target {
        i *= 2
    }
    var low = i / 2
    var high = min(i, n - 1)
    while low <= high {
        let mid = (low + high) / 2
        if arr[mid] == target {
            return mid
        } else if arr[mid] < target {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return -1
}`,
    lines: { start: [1, 2, 3, 4], range: [5, 6], compare: [10, 11, 12], found: [13], narrow: [14, 15, 16, 17], 'not-found': [20] },
  },
  javascript: {
    code: `function exponentialSearch(arr, target) {
  const n = arr.length;
  if (arr[0] === target) return 0;
  let i = 1;
  while (i < n && arr[i] <= target) {
    i *= 2;
  }
  let low = Math.floor(i / 2);
  let high = Math.min(i, n - 1);
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}`,
    lines: { start: [1, 2, 3, 4], range: [5, 6], compare: [10, 11, 12], found: [13], narrow: [14, 15, 16, 17], 'not-found': [20] },
  },
  typescript: {
    code: `function exponentialSearch(arr: number[], target: number): number {
  const n = arr.length;
  if (arr[0] === target) return 0;
  let i = 1;
  while (i < n && arr[i] <= target) {
    i *= 2;
  }
  let low = Math.floor(i / 2);
  let high = Math.min(i, n - 1);
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}`,
    lines: { start: [1, 2, 3, 4], range: [5, 6], compare: [10, 11, 12], found: [13], narrow: [14, 15, 16, 17], 'not-found': [20] },
  },
  go: {
    code: `func exponentialSearch(arr []int, target int) int {
    n := len(arr)
    if arr[0] == target {
        return 0
    }
    i := 1
    for i < n && arr[i] <= target {
        i *= 2
    }
    low := i / 2
    high := min(i, n-1)
    for low <= high {
        mid := (low + high) / 2
        if arr[mid] == target {
            return mid
        } else if arr[mid] < target {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return -1
}`,
    lines: { start: [1, 2, 3, 4, 5, 6], range: [7, 8], compare: [12, 13, 14], found: [15], narrow: [16, 17, 18, 19], 'not-found': [22] },
  },
  rust: {
    code: `fn exponential_search(arr: &Vec<i32>, target: i32) -> i32 {
    let n = arr.len();
    if arr[0] == target {
        return 0;
    }
    let mut i = 1;
    while i < n && arr[i] <= target {
        i *= 2;
    }
    let mut low = i / 2;
    let mut high = i.min(n - 1);
    while low <= high {
        let mid = (low + high) / 2;
        if arr[mid] == target {
            return mid as i32;
        } else if arr[mid] < target {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    -1
}`,
    lines: { start: [1, 2, 3, 4, 5, 6], range: [7, 8], compare: [12, 13, 14], found: [15], narrow: [16, 17, 18, 19], 'not-found': [22] },
  },
  php: {
    code: `function exponentialSearch(array $arr, int $target): int {
    $n = count($arr);
    if ($arr[0] === $target) return 0;
    $i = 1;
    while ($i < $n && $arr[$i] <= $target) {
        $i *= 2;
    }
    $low = intdiv($i, 2);
    $high = min($i, $n - 1);
    while ($low <= $high) {
        $mid = intdiv($low + $high, 2);
        if ($arr[$mid] === $target) {
            return $mid;
        } elseif ($arr[$mid] < $target) {
            $low = $mid + 1;
        } else {
            $high = $mid - 1;
        }
    }
    return -1;
}`,
    lines: { start: [1, 2, 3, 4], range: [5, 6], compare: [10, 11, 12], found: [13], narrow: [14, 15, 16, 17], 'not-found': [20] },
  },
};
