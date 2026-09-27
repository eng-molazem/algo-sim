export default {
  python: {
    code: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    lines: { start: [1, 2], 'mark-min': [4], compare: [5, 6], swap: [8], done: [9] },
  },
  c: {
    code: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`,
    lines: { start: [1], 'mark-min': [3], compare: [4, 5], swap: [9, 10, 11], done: [13] },
  },
  cpp: {
    code: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
    }
}`,
    lines: { start: [1, 2], 'mark-min': [4], compare: [5, 6], swap: [10], done: [12] },
  },
  csharp: {
    code: `void SelectionSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`,
    lines: { start: [1, 2], 'mark-min': [4], compare: [5, 6], swap: [10, 11, 12], done: [14] },
  },
  java: {
    code: `void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`,
    lines: { start: [1, 2], 'mark-min': [4], compare: [5, 6], swap: [10, 11, 12], done: [14] },
  },
  kotlin: {
    code: `fun selectionSort(arr: IntArray) {
    val n = arr.size
    for (i in 0 until n - 1) {
        var minIdx = i
        for (j in i + 1 until n) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j
            }
        }
        val temp = arr[i]
        arr[i] = arr[minIdx]
        arr[minIdx] = temp
    }
}`,
    lines: { start: [1, 2], 'mark-min': [4], compare: [5, 6], swap: [10, 11, 12], done: [14] },
  },
  swift: {
    code: `func selectionSort(_ arr: inout [Int]) {
    let n = arr.count
    for i in 0..<n - 1 {
        var minIdx = i
        for j in (i + 1)..<n {
            if arr[j] < arr[minIdx] {
                minIdx = j
            }
        }
        arr.swapAt(i, minIdx)
    }
}`,
    lines: { start: [1, 2], 'mark-min': [4], compare: [5, 6], swap: [10], done: [12] },
  },
  javascript: {
    code: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
    lines: { start: [1, 2], 'mark-min': [4], compare: [5, 6], swap: [10], done: [12, 13] },
  },
  typescript: {
    code: `function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
    lines: { start: [1, 2], 'mark-min': [4], compare: [5, 6], swap: [10], done: [12, 13] },
  },
  go: {
    code: `func selectionSort(arr []int) []int {
    n := len(arr)
    for i := 0; i < n-1; i++ {
        minIdx := i
        for j := i + 1; j < n; j++ {
            if arr[j] < arr[minIdx] {
                minIdx = j
            }
        }
        arr[i], arr[minIdx] = arr[minIdx], arr[i]
    }
    return arr
}`,
    lines: { start: [1, 2], 'mark-min': [4], compare: [5, 6], swap: [10], done: [12, 13] },
  },
  rust: {
    code: `fn selection_sort(arr: &mut Vec<i32>) {
    let n = arr.len();
    for i in 0..n - 1 {
        let mut min_idx = i;
        for j in i + 1..n {
            if arr[j] < arr[min_idx] {
                min_idx = j;
            }
        }
        arr.swap(i, min_idx);
    }
}`,
    lines: { start: [1, 2], 'mark-min': [4], compare: [5, 6], swap: [10], done: [12] },
  },
  php: {
    code: `function selectionSort(array $arr): array {
    $n = count($arr);
    for ($i = 0; $i < $n - 1; $i++) {
        $minIdx = $i;
        for ($j = $i + 1; $j < $n; $j++) {
            if ($arr[$j] < $arr[$minIdx]) {
                $minIdx = $j;
            }
        }
        [$arr[$i], $arr[$minIdx]] = [$arr[$minIdx], $arr[$i]];
    }
    return $arr;
}`,
    lines: { start: [1, 2], 'mark-min': [4], compare: [5, 6], swap: [10], done: [12, 13] },
  },
};
