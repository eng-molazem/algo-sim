export default {
  python: {
    code: `def counting_sort(arr):
    if not arr:
        return arr
    max_val = max(arr)
    count = [0] * (max_val + 1)
    output = [0] * len(arr)
    for num in arr:
        count[num] += 1
    for i in range(1, max_val + 1):
        count[i] += count[i - 1]
    for num in reversed(arr):
        output[count[num] - 1] = num
        count[num] -= 1
    return output`,
    lines: { start: [1, 4, 5, 6], count: [7, 8], cumulative: [9, 10], place: [11, 12, 13], done: [14] },
  },
  c: {
    code: `void countingSort(int arr[], int n) {
    int maxVal = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] > maxVal) maxVal = arr[i];
    int* count = calloc(maxVal + 1, sizeof(int));
    int* output = malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        count[arr[i]]++;
    }
    for (int i = 1; i <= maxVal; i++) {
        count[i] += count[i - 1];
    }
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}`,
    lines: { start: [1, 2, 3, 4, 5], count: [6, 7], cumulative: [9, 10], place: [12, 13, 14], done: [16, 17] },
  },
  cpp: {
    code: `void countingSort(vector<int>& arr) {
    int maxVal = *max_element(arr.begin(), arr.end());
    vector<int> count(maxVal + 1, 0);
    vector<int> output(arr.size());
    for (int num : arr) {
        count[num]++;
    }
    for (int i = 1; i <= maxVal; i++) {
        count[i] += count[i - 1];
    }
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    arr = output;
}`,
    lines: { start: [1, 2, 3, 4], count: [5, 6], cumulative: [8, 9], place: [11, 12, 13], done: [15, 16] },
  },
  csharp: {
    code: `int[] CountingSort(int[] arr) {
    int maxVal = arr.Max();
    int[] count = new int[maxVal + 1];
    int[] output = new int[arr.Length];
    foreach (int num in arr) {
        count[num]++;
    }
    for (int i = 1; i <= maxVal; i++) {
        count[i] += count[i - 1];
    }
    for (int i = arr.Length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    return output;
}`,
    lines: { start: [1, 2, 3, 4], count: [5, 6], cumulative: [8, 9], place: [11, 12, 13], done: [15, 16] },
  },
  java: {
    code: `int[] countingSort(int[] arr) {
    int maxVal = Arrays.stream(arr).max().getAsInt();
    int[] count = new int[maxVal + 1];
    int[] output = new int[arr.length];
    for (int num : arr) {
        count[num]++;
    }
    for (int i = 1; i <= maxVal; i++) {
        count[i] += count[i - 1];
    }
    for (int i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    return output;
}`,
    lines: { start: [1, 2, 3, 4], count: [5, 6], cumulative: [8, 9], place: [11, 12, 13], done: [15, 16] },
  },
  kotlin: {
    code: `fun countingSort(arr: IntArray): IntArray {
    val maxVal = arr.max()!!
    val count = IntArray(maxVal + 1)
    val output = IntArray(arr.size)
    for (num in arr) {
        count[num]++
    }
    for (i in 1..maxVal) {
        count[i] += count[i - 1]
    }
    for (i in arr.size - 1 downTo 0) {
        output[count[arr[i]] - 1] = arr[i]
        count[arr[i]]--
    }
    return output
}`,
    lines: { start: [1, 2, 3, 4], count: [5, 6], cumulative: [8, 9], place: [11, 12, 13], done: [15, 16] },
  },
  swift: {
    code: `func countingSort(_ arr: [Int]) -> [Int] {
    let maxVal = arr.max() ?? 0
    var count = [Int](repeating: 0, count: maxVal + 1)
    var output = [Int](repeating: 0, count: arr.count)
    for num in arr {
        count[num] += 1
    }
    for i in 1...maxVal {
        count[i] += count[i - 1]
    }
    for i in stride(from: arr.count - 1, through: 0, by: -1) {
        output[count[arr[i]] - 1] = arr[i]
        count[arr[i]] -= 1
    }
    return output
}`,
    lines: { start: [1, 2, 3, 4], count: [5, 6], cumulative: [8, 9], place: [11, 12, 13], done: [15, 16] },
  },
  javascript: {
    code: `function countingSort(arr) {
  const maxVal = Math.max(...arr);
  const count = new Array(maxVal + 1).fill(0);
  const output = new Array(arr.length).fill(0);
  for (const num of arr) {
    count[num]++;
  }
  for (let i = 1; i <= maxVal; i++) {
    count[i] += count[i - 1];
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  return output;
}`,
    lines: { start: [1, 2, 3, 4], count: [5, 6], cumulative: [8, 9], place: [11, 12, 13], done: [15, 16] },
  },
  typescript: {
    code: `function countingSort(arr: number[]): number[] {
  const maxVal = Math.max(...arr);
  const count = new Array(maxVal + 1).fill(0);
  const output = new Array(arr.length).fill(0);
  for (const num of arr) {
    count[num]++;
  }
  for (let i = 1; i <= maxVal; i++) {
    count[i] += count[i - 1];
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  return output;
}`,
    lines: { start: [1, 2, 3, 4], count: [5, 6], cumulative: [8, 9], place: [11, 12, 13], done: [15, 16] },
  },
  go: {
    code: `func countingSort(arr []int) []int {
    maxVal := arr[0]
    for _, v := range arr {
        if v > maxVal {
            maxVal = v
        }
    }
    count := make([]int, maxVal+1)
    output := make([]int, len(arr))
    for _, num := range arr {
        count[num]++
    }
    for i := 1; i <= maxVal; i++ {
        count[i] += count[i-1]
    }
    for i := len(arr) - 1; i >= 0; i-- {
        output[count[arr[i]]-1] = arr[i]
        count[arr[i]]--
    }
    return output
}`,
    lines: { start: [1, 2, 3, 4, 5, 6, 7, 8, 9], count: [10, 11], cumulative: [13, 14], place: [16, 17, 18], done: [20, 21] },
  },
  rust: {
    code: `fn counting_sort(arr: &Vec<i32>) -> Vec<i32> {
    let max_val = *arr.iter().max().unwrap();
    let mut count = vec![0; (max_val + 1) as usize];
    let mut output = vec![0; arr.len()];
    for &num in arr {
        count[num as usize] += 1;
    }
    for i in 1..=(max_val as usize) {
        count[i] += count[i - 1];
    }
    for i in (0..arr.len()).rev() {
        let num = arr[i] as usize;
        output[count[num] - 1] = arr[i];
        count[num] -= 1;
    }
    output
}`,
    lines: { start: [1, 2, 3, 4], count: [5, 6], cumulative: [8, 9], place: [11, 12, 13, 14], done: [16, 17] },
  },
  php: {
    code: `function countingSort(array $arr): array {
    $maxVal = max($arr);
    $count = array_fill(0, $maxVal + 1, 0);
    $output = array_fill(0, count($arr), 0);
    foreach ($arr as $num) {
        $count[$num]++;
    }
    for ($i = 1; $i <= $maxVal; $i++) {
        $count[$i] += $count[$i - 1];
    }
    for ($i = count($arr) - 1; $i >= 0; $i--) {
        $output[$count[$arr[$i]] - 1] = $arr[$i];
        $count[$arr[$i]]--;
    }
    return $output;
}`,
    lines: { start: [1, 2, 3, 4], count: [5, 6], cumulative: [8, 9], place: [11, 12, 13], done: [15, 16] },
  },
};
