export default {
  python: {
    code: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr`,
    lines: { start: [1, 2, 3, 4], compare: [8], shift: [9, 10], insert: [11], done: [13] },
  },
  c: {
    code: `void shellSort(int arr[], int n) {
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}`,
    lines: { start: [1, 2], compare: [6], shift: [7, 8], insert: [10], done: [13] },
  },
  cpp: {
    code: `void shellSort(vector<int>& arr) {
    int n = arr.size();
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}`,
    lines: { start: [1, 2, 3], compare: [7], shift: [8, 9], insert: [11], done: [14] },
  },
  csharp: {
    code: `void ShellSort(int[] arr) {
    int n = arr.Length;
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}`,
    lines: { start: [1, 2, 3], compare: [7], shift: [8, 9], insert: [11], done: [14] },
  },
  java: {
    code: `void shellSort(int[] arr) {
    int n = arr.length;
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}`,
    lines: { start: [1, 2, 3], compare: [7], shift: [8, 9], insert: [11], done: [14] },
  },
  kotlin: {
    code: `fun shellSort(arr: IntArray) {
    val n = arr.size
    var gap = n / 2
    while (gap > 0) {
        for (i in gap until n) {
            val temp = arr[i]
            var j = i
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap]
                j -= gap
            }
            arr[j] = temp
        }
        gap /= 2
    }
}`,
    lines: { start: [1, 2, 3, 4], compare: [8], shift: [9, 10], insert: [12], done: [16] },
  },
  swift: {
    code: `func shellSort(_ arr: inout [Int]) {
    let n = arr.count
    var gap = n / 2
    while gap > 0 {
        for i in gap..<n {
            let temp = arr[i]
            var j = i
            while j >= gap && arr[j - gap] > temp {
                arr[j] = arr[j - gap]
                j -= gap
            }
            arr[j] = temp
        }
        gap /= 2
    }
}`,
    lines: { start: [1, 2, 3, 4], compare: [8], shift: [9, 10], insert: [12], done: [16] },
  },
  javascript: {
    code: `function shellSort(arr) {
  const n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}`,
    lines: { start: [1, 2, 3], compare: [7], shift: [8, 9], insert: [11], done: [14, 15] },
  },
  typescript: {
    code: `function shellSort(arr: number[]): number[] {
  const n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}`,
    lines: { start: [1, 2, 3], compare: [7], shift: [8, 9], insert: [11], done: [14, 15] },
  },
  go: {
    code: `func shellSort(arr []int) []int {
    n := len(arr)
    for gap := n / 2; gap > 0; gap /= 2 {
        for i := gap; i < n; i++ {
            temp := arr[i]
            j := i
            for j >= gap && arr[j-gap] > temp {
                arr[j] = arr[j-gap]
                j -= gap
            }
            arr[j] = temp
        }
    }
    return arr
}`,
    lines: { start: [1, 2, 3], compare: [7], shift: [8, 9], insert: [11], done: [14, 15] },
  },
  rust: {
    code: `fn shell_sort(arr: &mut Vec<i32>) {
    let n = arr.len();
    let mut gap = n / 2;
    while gap > 0 {
        for i in gap..n {
            let temp = arr[i];
            let mut j = i;
            while j >= gap && arr[j - gap] > temp {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap /= 2;
    }
}`,
    lines: { start: [1, 2, 3, 4], compare: [8], shift: [9, 10], insert: [12], done: [16] },
  },
  php: {
    code: `function shellSort(array $arr): array {
    $n = count($arr);
    for ($gap = intdiv($n, 2); $gap > 0; $gap = intdiv($gap, 2)) {
        for ($i = $gap; $i < $n; $i++) {
            $temp = $arr[$i];
            $j = $i;
            while ($j >= $gap && $arr[$j - $gap] > $temp) {
                $arr[$j] = $arr[$j - $gap];
                $j -= $gap;
            }
            $arr[$j] = $temp;
        }
    }
    return $arr;
}`,
    lines: { start: [1, 2, 3], compare: [7], shift: [8, 9], insert: [11], done: [14, 15] },
  },
};
