export default {
  python: {
    code: `def interpolation_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high and arr[low] <= target <= arr[high]:
        if arr[high] == arr[low]:
            return low if arr[low] == target else -1
        pos = low + (target - arr[low]) * (high - low) // (arr[high] - arr[low])
        if arr[pos] == target:
            return pos
        elif arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1
    return -1`,
    lines: { start: [1, 2], 'compute-pos': [6, 7], narrow: [9, 10, 11, 12], found: [8], 'not-found': [13] },
  },
  c: {
    code: `int interpolationSearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (arr[high] == arr[low]) {
            return (arr[low] == target) ? low : -1;
        }
        int pos = low + (target - arr[low]) * (high - low) / (arr[high] - arr[low]);
        if (arr[pos] == target) {
            return pos;
        } else if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    return -1;
}`,
    lines: { start: [1, 2], 'compute-pos': [7, 8], narrow: [10, 11, 12, 13], found: [9], 'not-found': [16] },
  },
  cpp: {
    code: `int interpolationSearch(vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (arr[high] == arr[low]) {
            return (arr[low] == target) ? low : -1;
        }
        int pos = low + (target - arr[low]) * (high - low) / (arr[high] - arr[low]);
        if (arr[pos] == target) {
            return pos;
        } else if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    return -1;
}`,
    lines: { start: [1, 2], 'compute-pos': [7, 8], narrow: [10, 11, 12, 13], found: [9], 'not-found': [16] },
  },
  csharp: {
    code: `int InterpolationSearch(int[] arr, int target) {
    int low = 0, high = arr.Length - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (arr[high] == arr[low]) {
            return (arr[low] == target) ? low : -1;
        }
        int pos = low + (target - arr[low]) * (high - low) / (arr[high] - arr[low]);
        if (arr[pos] == target) {
            return pos;
        } else if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    return -1;
}`,
    lines: { start: [1, 2], 'compute-pos': [7, 8], narrow: [10, 11, 12, 13], found: [9], 'not-found': [16] },
  },
  java: {
    code: `int interpolationSearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (arr[high] == arr[low]) {
            return (arr[low] == target) ? low : -1;
        }
        int pos = low + (target - arr[low]) * (high - low) / (arr[high] - arr[low]);
        if (arr[pos] == target) {
            return pos;
        } else if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    return -1;
}`,
    lines: { start: [1, 2], 'compute-pos': [7, 8], narrow: [10, 11, 12, 13], found: [9], 'not-found': [16] },
  },
  kotlin: {
    code: `fun interpolationSearch(arr: IntArray, target: Int): Int {
    var low = 0
    var high = arr.size - 1
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (arr[high] == arr[low]) {
            return if (arr[low] == target) low else -1
        }
        val pos = low + (target - arr[low]) * (high - low) / (arr[high] - arr[low])
        if (arr[pos] == target) {
            return pos
        } else if (arr[pos] < target) {
            low = pos + 1
        } else {
            high = pos - 1
        }
    }
    return -1
}`,
    lines: { start: [1, 2, 3], 'compute-pos': [8, 9], narrow: [11, 12, 13, 14], found: [10], 'not-found': [17] },
  },
  swift: {
    code: `func interpolationSearch(_ arr: [Int], _ target: Int) -> Int {
    var low = 0
    var high = arr.count - 1
    while low <= high && target >= arr[low] && target <= arr[high] {
        if arr[high] == arr[low] {
            return arr[low] == target ? low : -1
        }
        let pos = low + (target - arr[low]) * (high - low) / (arr[high] - arr[low])
        if arr[pos] == target {
            return pos
        } else if arr[pos] < target {
            low = pos + 1
        } else {
            high = pos - 1
        }
    }
    return -1
}`,
    lines: { start: [1, 2, 3], 'compute-pos': [8, 9], narrow: [11, 12, 13, 14], found: [10], 'not-found': [17] },
  },
  javascript: {
    code: `function interpolationSearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (arr[high] === arr[low]) {
      return arr[low] === target ? low : -1;
    }
    const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
    if (arr[pos] === target) {
      return pos;
    } else if (arr[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }
  return -1;
}`,
    lines: { start: [1, 2, 3], 'compute-pos': [8, 9], narrow: [11, 12, 13, 14], found: [10], 'not-found': [17] },
  },
  typescript: {
    code: `function interpolationSearch(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (arr[high] === arr[low]) {
      return arr[low] === target ? low : -1;
    }
    const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
    if (arr[pos] === target) {
      return pos;
    } else if (arr[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }
  return -1;
}`,
    lines: { start: [1, 2, 3], 'compute-pos': [8, 9], narrow: [11, 12, 13, 14], found: [10], 'not-found': [17] },
  },
  go: {
    code: `func interpolationSearch(arr []int, target int) int {
    low, high := 0, len(arr)-1
    for low <= high && target >= arr[low] && target <= arr[high] {
        if arr[high] == arr[low] {
            if arr[low] == target {
                return low
            }
            return -1
        }
        pos := low + (target-arr[low])*(high-low)/(arr[high]-arr[low])
        if arr[pos] == target {
            return pos
        } else if arr[pos] < target {
            low = pos + 1
        } else {
            high = pos - 1
        }
    }
    return -1
}`,
    lines: { start: [1, 2], 'compute-pos': [10, 11], narrow: [13, 14, 15, 16], found: [12], 'not-found': [19] },
  },
  rust: {
    code: `fn interpolation_search(arr: &Vec<i32>, target: i32) -> i32 {
    let mut low = 0i32;
    let mut high = arr.len() as i32 - 1;
    while low <= high && target >= arr[low as usize] && target <= arr[high as usize] {
        if arr[high as usize] == arr[low as usize] {
            return if arr[low as usize] == target { low } else { -1 };
        }
        let pos = low + (target - arr[low as usize]) * (high - low) / (arr[high as usize] - arr[low as usize]);
        if arr[pos as usize] == target {
            return pos;
        } else if arr[pos as usize] < target {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    -1
}`,
    lines: { start: [1, 2, 3], 'compute-pos': [8, 9], narrow: [11, 12, 13, 14], found: [10], 'not-found': [17] },
  },
  php: {
    code: `function interpolationSearch(array $arr, int $target): int {
    $low = 0;
    $high = count($arr) - 1;
    while ($low <= $high && $target >= $arr[$low] && $target <= $arr[$high]) {
        if ($arr[$high] === $arr[$low]) {
            return $arr[$low] === $target ? $low : -1;
        }
        $pos = $low + intdiv(($target - $arr[$low]) * ($high - $low), $arr[$high] - $arr[$low]);
        if ($arr[$pos] === $target) {
            return $pos;
        } elseif ($arr[$pos] < $target) {
            $low = $pos + 1;
        } else {
            $high = $pos - 1;
        }
    }
    return -1;
}`,
    lines: { start: [1, 2, 3], 'compute-pos': [8, 9], narrow: [11, 12, 13, 14], found: [10], 'not-found': [17] },
  },
};
