export default {
  python: {
    code: `def merge_sort(arr, start, end):
    if end - start <= 1:
        return
    mid = (start + end) // 2
    merge_sort(arr, start, mid)
    merge_sort(arr, mid, end)
    merge(arr, start, mid, end)

def merge(arr, start, mid, end):
    left = arr[start:mid]
    right = arr[mid:end]
    i = j = 0
    k = start
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            arr[k] = left[i]
            i += 1
        else:
            arr[k] = right[j]
            j += 1
        k += 1
    while i < len(left):
        arr[k] = left[i]
        i += 1
        k += 1
    while j < len(right):
        arr[k] = right[j]
        j += 1
        k += 1`,
    lines: {
      start: [1],
      compare: [14, 15],
      place: [16, 17, 19, 20, 21],
      'copy-rest': [23, 24, 25, 27, 28, 29],
      done: [7],
    },
  },
  c: {
    code: `void mergeSort(int arr[], int start, int end) {
    if (end - start <= 1) return;
    int mid = (start + end) / 2;
    mergeSort(arr, start, mid);
    mergeSort(arr, mid, end);
    merge(arr, start, mid, end);
}

void merge(int arr[], int start, int mid, int end) {
    int left[100], right[100];
    int leftLen = mid - start, rightLen = end - mid;
    for (int x = 0; x < leftLen; x++) left[x] = arr[start + x];
    for (int x = 0; x < rightLen; x++) right[x] = arr[mid + x];
    int i = 0, j = 0, k = start;
    while (i < leftLen && j < rightLen) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        k++;
    }
    while (i < leftLen) { arr[k++] = left[i++]; }
    while (j < rightLen) { arr[k++] = right[j++]; }
}`,
    lines: { start: [1], compare: [15, 16], place: [17, 18, 20, 21, 23], 'copy-rest': [25, 26], done: [6] },
  },
  cpp: {
    code: `void mergeSort(vector<int>& arr, int start, int end) {
    if (end - start <= 1) return;
    int mid = (start + end) / 2;
    mergeSort(arr, start, mid);
    mergeSort(arr, mid, end);
    merge(arr, start, mid, end);
}

void merge(vector<int>& arr, int start, int mid, int end) {
    vector<int> left(arr.begin() + start, arr.begin() + mid);
    vector<int> right(arr.begin() + mid, arr.begin() + end);
    int i = 0, j = 0, k = start;
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        k++;
    }
    while (i < left.size()) { arr[k++] = left[i++]; }
    while (j < right.size()) { arr[k++] = right[j++]; }
}`,
    lines: { start: [1], compare: [13, 14], place: [15, 16, 18, 19, 21], 'copy-rest': [23, 24], done: [6] },
  },
  csharp: {
    code: `void MergeSort(int[] arr, int start, int end) {
    if (end - start <= 1) return;
    int mid = (start + end) / 2;
    MergeSort(arr, start, mid);
    MergeSort(arr, mid, end);
    Merge(arr, start, mid, end);
}

void Merge(int[] arr, int start, int mid, int end) {
    int[] left = arr[start..mid];
    int[] right = arr[mid..end];
    int i = 0, j = 0, k = start;
    while (i < left.Length && j < right.Length) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        k++;
    }
    while (i < left.Length) arr[k++] = left[i++];
    while (j < right.Length) arr[k++] = right[j++];
}`,
    lines: { start: [1], compare: [13, 14], place: [15, 16, 18, 19, 21], 'copy-rest': [23, 24], done: [6] },
  },
  java: {
    code: `void mergeSort(int[] arr, int start, int end) {
    if (end - start <= 1) return;
    int mid = (start + end) / 2;
    mergeSort(arr, start, mid);
    mergeSort(arr, mid, end);
    merge(arr, start, mid, end);
}

void merge(int[] arr, int start, int mid, int end) {
    int[] left = Arrays.copyOfRange(arr, start, mid);
    int[] right = Arrays.copyOfRange(arr, mid, end);
    int i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        k++;
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
}`,
    lines: { start: [1], compare: [13, 14], place: [15, 16, 18, 19, 21], 'copy-rest': [23, 24], done: [6] },
  },
  kotlin: {
    code: `fun mergeSort(arr: IntArray, start: Int, end: Int) {
    if (end - start <= 1) return
    val mid = (start + end) / 2
    mergeSort(arr, start, mid)
    mergeSort(arr, mid, end)
    merge(arr, start, mid, end)
}

fun merge(arr: IntArray, start: Int, mid: Int, end: Int) {
    val left = arr.copyOfRange(start, mid)
    val right = arr.copyOfRange(mid, end)
    var i = 0
    var j = 0
    var k = start
    while (i < left.size && j < right.size) {
        if (left[i] <= right[j]) {
            arr[k] = left[i]
            i++
        } else {
            arr[k] = right[j]
            j++
        }
        k++
    }
    while (i < left.size) { arr[k++] = left[i++] }
    while (j < right.size) { arr[k++] = right[j++] }
}`,
    lines: { start: [1], compare: [15, 16], place: [17, 18, 20, 21, 23], 'copy-rest': [25, 26], done: [6] },
  },
  swift: {
    code: `func mergeSort(_ arr: inout [Int], _ start: Int, _ end: Int) {
    if end - start <= 1 { return }
    let mid = (start + end) / 2
    mergeSort(&arr, start, mid)
    mergeSort(&arr, mid, end)
    merge(&arr, start, mid, end)
}

func merge(_ arr: inout [Int], _ start: Int, _ mid: Int, _ end: Int) {
    let left = Array(arr[start..<mid])
    let right = Array(arr[mid..<end])
    var i = 0, j = 0, k = start
    while i < left.count && j < right.count {
        if left[i] <= right[j] {
            arr[k] = left[i]
            i += 1
        } else {
            arr[k] = right[j]
            j += 1
        }
        k += 1
    }
    while i < left.count { arr[k] = left[i]; i += 1; k += 1 }
    while j < right.count { arr[k] = right[j]; j += 1; k += 1 }
}`,
    lines: { start: [1], compare: [13, 14], place: [15, 16, 18, 19, 21], 'copy-rest': [23, 24], done: [6] },
  },
  javascript: {
    code: `function mergeSort(arr, start, end) {
  if (end - start <= 1) return;
  const mid = Math.floor((start + end) / 2);
  mergeSort(arr, start, mid);
  mergeSort(arr, mid, end);
  merge(arr, start, mid, end);
}

function merge(arr, start, mid, end) {
  const left = arr.slice(start, mid);
  const right = arr.slice(mid, end);
  let i = 0, j = 0, k = start;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    k++;
  }
  while (i < left.length) arr[k++] = left[i++];
  while (j < right.length) arr[k++] = right[j++];
}`,
    lines: { start: [1], compare: [13, 14], place: [15, 16, 18, 19, 21], 'copy-rest': [23, 24], done: [6] },
  },
  typescript: {
    code: `function mergeSort(arr: number[], start: number, end: number): void {
  if (end - start <= 1) return;
  const mid = Math.floor((start + end) / 2);
  mergeSort(arr, start, mid);
  mergeSort(arr, mid, end);
  merge(arr, start, mid, end);
}

function merge(arr: number[], start: number, mid: number, end: number): void {
  const left = arr.slice(start, mid);
  const right = arr.slice(mid, end);
  let i = 0, j = 0, k = start;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    k++;
  }
  while (i < left.length) arr[k++] = left[i++];
  while (j < right.length) arr[k++] = right[j++];
}`,
    lines: { start: [1], compare: [13, 14], place: [15, 16, 18, 19, 21], 'copy-rest': [23, 24], done: [6] },
  },
  go: {
    code: `func mergeSort(arr []int, start, end int) {
    if end-start <= 1 {
        return
    }
    mid := (start + end) / 2
    mergeSort(arr, start, mid)
    mergeSort(arr, mid, end)
    merge(arr, start, mid, end)
}

func merge(arr []int, start, mid, end int) {
    left := append([]int{}, arr[start:mid]...)
    right := append([]int{}, arr[mid:end]...)
    i, j, k := 0, 0, start
    for i < len(left) && j < len(right) {
        if left[i] <= right[j] {
            arr[k] = left[i]
            i++
        } else {
            arr[k] = right[j]
            j++
        }
        k++
    }
    for i < len(left) {
        arr[k] = left[i]
        i++
        k++
    }
    for j < len(right) {
        arr[k] = right[j]
        j++
        k++
    }
}`,
    lines: {
      start: [1],
      compare: [15, 16],
      place: [17, 18, 20, 21, 23],
      'copy-rest': [25, 26, 27, 28, 30, 31, 32, 33],
      done: [8],
    },
  },
  rust: {
    code: `fn merge_sort(arr: &mut Vec<i32>, start: usize, end: usize) {
    if end - start <= 1 { return; }
    let mid = (start + end) / 2;
    merge_sort(arr, start, mid);
    merge_sort(arr, mid, end);
    merge(arr, start, mid, end);
}

fn merge(arr: &mut Vec<i32>, start: usize, mid: usize, end: usize) {
    let left = arr[start..mid].to_vec();
    let right = arr[mid..end].to_vec();
    let (mut i, mut j, mut k) = (0, 0, start);
    while i < left.len() && j < right.len() {
        if left[i] <= right[j] {
            arr[k] = left[i];
            i += 1;
        } else {
            arr[k] = right[j];
            j += 1;
        }
        k += 1;
    }
    while i < left.len() { arr[k] = left[i]; i += 1; k += 1; }
    while j < right.len() { arr[k] = right[j]; j += 1; k += 1; }
}`,
    lines: { start: [1], compare: [13, 14], place: [15, 16, 18, 19, 21], 'copy-rest': [23, 24], done: [6] },
  },
  php: {
    code: `function mergeSort(array &$arr, int $start, int $end): void {
    if ($end - $start <= 1) return;
    $mid = intdiv($start + $end, 2);
    mergeSort($arr, $start, $mid);
    mergeSort($arr, $mid, $end);
    merge($arr, $start, $mid, $end);
}

function merge(array &$arr, int $start, int $mid, int $end): void {
    $left = array_slice($arr, $start, $mid - $start);
    $right = array_slice($arr, $mid, $end - $mid);
    $i = 0; $j = 0; $k = $start;
    while ($i < count($left) && $j < count($right)) {
        if ($left[$i] <= $right[$j]) {
            $arr[$k] = $left[$i];
            $i++;
        } else {
            $arr[$k] = $right[$j];
            $j++;
        }
        $k++;
    }
    while ($i < count($left)) { $arr[$k++] = $left[$i++]; }
    while ($j < count($right)) { $arr[$k++] = $right[$j++]; }
}`,
    lines: { start: [1], compare: [13, 14], place: [15, 16, 18, 19, 21], 'copy-rest': [23, 24], done: [6] },
  },
};
