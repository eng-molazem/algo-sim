export default {
  python: {
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    lines: { start: [1, 2], compare: [4, 5], swap: [6], 'mark-sorted': [3], done: [7] },
  },
  c: {
    code: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    lines: { start: [1], compare: [3, 4], swap: [5, 6, 7], 'mark-sorted': [2], done: [10, 11] },
  },
  cpp: {
    code: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
    lines: { start: [1, 2], compare: [4, 5], swap: [6], 'mark-sorted': [3], done: [9, 10] },
  },
  csharp: {
    code: `void BubbleSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    lines: { start: [1, 2], compare: [4, 5], swap: [6, 7, 8], 'mark-sorted': [3], done: [11, 12] },
  },
  java: {
    code: `void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    lines: { start: [1, 2], compare: [4, 5], swap: [6, 7, 8], 'mark-sorted': [3], done: [11, 12] },
  },
  kotlin: {
    code: `fun bubbleSort(arr: IntArray) {
    val n = arr.size
    for (i in 0 until n - 1) {
        for (j in 0 until n - i - 1) {
            if (arr[j] > arr[j + 1]) {
                val temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
}`,
    lines: { start: [1, 2], compare: [4, 5], swap: [6, 7, 8], 'mark-sorted': [3], done: [11, 12] },
  },
  swift: {
    code: `func bubbleSort(_ arr: inout [Int]) {
    let n = arr.count
    for i in 0..<n - 1 {
        for j in 0..<n - i - 1 {
            if arr[j] > arr[j + 1] {
                arr.swapAt(j, j + 1)
            }
        }
    }
}`,
    lines: { start: [1, 2], compare: [4, 5], swap: [6], 'mark-sorted': [3], done: [9, 10] },
  },
  javascript: {
    code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    lines: { start: [1, 2], compare: [4, 5], swap: [6], 'mark-sorted': [3], done: [10, 11] },
  },
  typescript: {
    code: `function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    lines: { start: [1, 2], compare: [4, 5], swap: [6], 'mark-sorted': [3], done: [10, 11] },
  },
  go: {
    code: `func bubbleSort(arr []int) []int {
    n := len(arr)
    for i := 0; i < n-1; i++ {
        for j := 0; j < n-i-1; j++ {
            if arr[j] > arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
            }
        }
    }
    return arr
}`,
    lines: { start: [1, 2], compare: [4, 5], swap: [6], 'mark-sorted': [3], done: [10, 11] },
  },
  rust: {
    code: `fn bubble_sort(arr: &mut Vec<i32>) {
    let n = arr.len();
    for i in 0..n - 1 {
        for j in 0..n - i - 1 {
            if arr[j] > arr[j + 1] {
                arr.swap(j, j + 1);
            }
        }
    }
}`,
    lines: { start: [1, 2], compare: [4, 5], swap: [6], 'mark-sorted': [3], done: [9, 10] },
  },
  php: {
    code: `function bubbleSort(array $arr): array {
    $n = count($arr);
    for ($i = 0; $i < $n - 1; $i++) {
        for ($j = 0; $j < $n - $i - 1; $j++) {
            if ($arr[$j] > $arr[$j + 1]) {
                [$arr[$j], $arr[$j + 1]] = [$arr[$j + 1], $arr[$j]];
            }
        }
    }
    return $arr;
}`,
    lines: { start: [1, 2], compare: [4, 5], swap: [6], 'mark-sorted': [3], done: [10, 11] },
  },
};
