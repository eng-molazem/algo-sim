export default {
  python: {
    code: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    lines: { start: [1], compare: [2, 3], found: [4], 'not-found': [5] },
  },
  c: {
    code: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    lines: { start: [1], compare: [2, 3], found: [4], 'not-found': [7] },
  },
  cpp: {
    code: `int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    lines: { start: [1], compare: [2, 3], found: [4], 'not-found': [7] },
  },
  csharp: {
    code: `int LinearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.Length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    lines: { start: [1], compare: [2, 3], found: [4], 'not-found': [7] },
  },
  java: {
    code: `int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    lines: { start: [1], compare: [2, 3], found: [4], 'not-found': [7] },
  },
  kotlin: {
    code: `fun linearSearch(arr: IntArray, target: Int): Int {
    for (i in arr.indices) {
        if (arr[i] == target) {
            return i
        }
    }
    return -1
}`,
    lines: { start: [1], compare: [2, 3], found: [4], 'not-found': [7] },
  },
  swift: {
    code: `func linearSearch(_ arr: [Int], _ target: Int) -> Int {
    for i in 0..<arr.count {
        if arr[i] == target {
            return i
        }
    }
    return -1
}`,
    lines: { start: [1], compare: [2, 3], found: [4], 'not-found': [7] },
  },
  javascript: {
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    lines: { start: [1], compare: [2, 3], found: [4], 'not-found': [7] },
  },
  typescript: {
    code: `function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    lines: { start: [1], compare: [2, 3], found: [4], 'not-found': [7] },
  },
  go: {
    code: `func linearSearch(arr []int, target int) int {
    for i := 0; i < len(arr); i++ {
        if arr[i] == target {
            return i
        }
    }
    return -1
}`,
    lines: { start: [1], compare: [2, 3], found: [4], 'not-found': [7] },
  },
  rust: {
    code: `fn linear_search(arr: &Vec<i32>, target: i32) -> i32 {
    for i in 0..arr.len() {
        if arr[i] == target {
            return i as i32;
        }
    }
    -1
}`,
    lines: { start: [1], compare: [2, 3], found: [4], 'not-found': [7] },
  },
  php: {
    code: `function linearSearch(array $arr, int $target): int {
    for ($i = 0; $i < count($arr); $i++) {
        if ($arr[$i] === $target) {
            return $i;
        }
    }
    return -1;
}`,
    lines: { start: [1], compare: [2, 3], found: [4], 'not-found': [7] },
  },
};
