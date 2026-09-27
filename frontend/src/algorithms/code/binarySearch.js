export default {
  python: {
    code: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    lines: { start: [1, 2], 'compute-mid': [4, 5], narrow: [7, 8, 9, 10], found: [6], 'not-found': [11] },
  },
  c: {
    code: `int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
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
    lines: { start: [1, 2], 'compute-mid': [4, 5], narrow: [7, 8, 9, 10], found: [6], 'not-found': [13] },
  },
  cpp: {
    code: `int binarySearch(vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
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
    lines: { start: [1, 2], 'compute-mid': [4, 5], narrow: [7, 8, 9, 10], found: [6], 'not-found': [13] },
  },
  csharp: {
    code: `int BinarySearch(int[] arr, int target) {
    int low = 0, high = arr.Length - 1;
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
    lines: { start: [1, 2], 'compute-mid': [4, 5], narrow: [7, 8, 9, 10], found: [6], 'not-found': [13] },
  },
  java: {
    code: `int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
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
    lines: { start: [1, 2], 'compute-mid': [4, 5], narrow: [7, 8, 9, 10], found: [6], 'not-found': [13] },
  },
  kotlin: {
    code: `fun binarySearch(arr: IntArray, target: Int): Int {
    var low = 0
    var high = arr.size - 1
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
    lines: { start: [1, 2, 3], 'compute-mid': [5, 6], narrow: [8, 9, 10, 11], found: [7], 'not-found': [14] },
  },
  swift: {
    code: `func binarySearch(_ arr: [Int], _ target: Int) -> Int {
    var low = 0
    var high = arr.count - 1
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
    lines: { start: [1, 2, 3], 'compute-mid': [5, 6], narrow: [8, 9, 10, 11], found: [7], 'not-found': [14] },
  },
  javascript: {
    code: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
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
    lines: { start: [1, 2], 'compute-mid': [4, 5], narrow: [7, 8, 9, 10], found: [6], 'not-found': [13] },
  },
  typescript: {
    code: `function binarySearch(arr: number[], target: number): number {
  let low = 0, high = arr.length - 1;
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
    lines: { start: [1, 2], 'compute-mid': [4, 5], narrow: [7, 8, 9, 10], found: [6], 'not-found': [13] },
  },
  go: {
    code: `func binarySearch(arr []int, target int) int {
    low, high := 0, len(arr)-1
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
    lines: { start: [1, 2], 'compute-mid': [4, 5], narrow: [7, 8, 9, 10], found: [6], 'not-found': [13] },
  },
  rust: {
    code: `fn binary_search(arr: &Vec<i32>, target: i32) -> i32 {
    let mut low = 0i32;
    let mut high = arr.len() as i32 - 1;
    while low <= high {
        let mid = (low + high) / 2;
        if arr[mid as usize] == target {
            return mid;
        } else if arr[mid as usize] < target {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    -1
}`,
    lines: { start: [1, 2, 3], 'compute-mid': [5, 6], narrow: [8, 9, 10, 11], found: [7], 'not-found': [14] },
  },
  php: {
    code: `function binarySearch(array $arr, int $target): int {
    $low = 0;
    $high = count($arr) - 1;
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
    lines: { start: [1, 2, 3], 'compute-mid': [5, 6], narrow: [8, 9, 10, 11], found: [7], 'not-found': [14] },
  },
};
