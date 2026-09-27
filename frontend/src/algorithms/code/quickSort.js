export default {
  python: {
    code: `def quick_sort(arr, low, high):
    if low >= high:
        return
    p = partition(arr, low, high)
    quick_sort(arr, low, p - 1)
    quick_sort(arr, p + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    lines: { start: [1], compare: [11, 12], swap: [13, 14], 'place-pivot': [15], done: [1] },
  },
  c: {
    code: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp2 = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp2;
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low >= high) return;
    int p = partition(arr, low, high);
    quickSort(arr, low, p - 1);
    quickSort(arr, p + 1, high);
}`,
    lines: { start: [18], compare: [4, 5], swap: [6, 7, 8, 9], 'place-pivot': [12, 13, 14], done: [18] },
  },
  cpp: {
    code: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low >= high) return;
    int p = partition(arr, low, high);
    quickSort(arr, low, p - 1);
    quickSort(arr, p + 1, high);
}`,
    lines: { start: [14], compare: [4, 5], swap: [6, 7], 'place-pivot': [10], done: [14] },
  },
  csharp: {
    code: `int Partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp2 = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp2;
    return i + 1;
}

void QuickSort(int[] arr, int low, int high) {
    if (low >= high) return;
    int p = Partition(arr, low, high);
    QuickSort(arr, low, p - 1);
    QuickSort(arr, p + 1, high);
}`,
    lines: { start: [18], compare: [4, 5], swap: [6, 7, 8, 9], 'place-pivot': [12, 13, 14], done: [18] },
  },
  java: {
    code: `int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp2 = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp2;
    return i + 1;
}

void quickSort(int[] arr, int low, int high) {
    if (low >= high) return;
    int p = partition(arr, low, high);
    quickSort(arr, low, p - 1);
    quickSort(arr, p + 1, high);
}`,
    lines: { start: [18], compare: [4, 5], swap: [6, 7, 8, 9], 'place-pivot': [12, 13, 14], done: [18] },
  },
  kotlin: {
    code: `fun partition(arr: IntArray, low: Int, high: Int): Int {
    val pivot = arr[high]
    var i = low - 1
    for (j in low until high) {
        if (arr[j] < pivot) {
            i++
            val temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }
    val temp2 = arr[i + 1]
    arr[i + 1] = arr[high]
    arr[high] = temp2
    return i + 1
}

fun quickSort(arr: IntArray, low: Int, high: Int) {
    if (low >= high) return
    val p = partition(arr, low, high)
    quickSort(arr, low, p - 1)
    quickSort(arr, p + 1, high)
}`,
    lines: { start: [18], compare: [4, 5], swap: [6, 7, 8, 9], 'place-pivot': [12, 13, 14], done: [18] },
  },
  swift: {
    code: `func partition(_ arr: inout [Int], _ low: Int, _ high: Int) -> Int {
    let pivot = arr[high]
    var i = low - 1
    for j in low..<high {
        if arr[j] < pivot {
            i += 1
            arr.swapAt(i, j)
        }
    }
    arr.swapAt(i + 1, high)
    return i + 1
}

func quickSort(_ arr: inout [Int], _ low: Int, _ high: Int) {
    if low >= high { return }
    let p = partition(&arr, low, high)
    quickSort(&arr, low, p - 1)
    quickSort(&arr, p + 1, high)
}`,
    lines: { start: [14], compare: [4, 5], swap: [6, 7], 'place-pivot': [10], done: [14] },
  },
  javascript: {
    code: `function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

function quickSort(arr, low, high) {
  if (low >= high) return;
  const p = partition(arr, low, high);
  quickSort(arr, low, p - 1);
  quickSort(arr, p + 1, high);
}`,
    lines: { start: [14], compare: [4, 5], swap: [6, 7], 'place-pivot': [10], done: [14] },
  },
  typescript: {
    code: `function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

function quickSort(arr: number[], low: number, high: number): void {
  if (low >= high) return;
  const p = partition(arr, low, high);
  quickSort(arr, low, p - 1);
  quickSort(arr, p + 1, high);
}`,
    lines: { start: [14], compare: [4, 5], swap: [6, 7], 'place-pivot': [10], done: [14] },
  },
  go: {
    code: `func partition(arr []int, low, high int) int {
    pivot := arr[high]
    i := low - 1
    for j := low; j < high; j++ {
        if arr[j] < pivot {
            i++
            arr[i], arr[j] = arr[j], arr[i]
        }
    }
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1
}

func quickSort(arr []int, low, high int) {
    if low >= high {
        return
    }
    p := partition(arr, low, high)
    quickSort(arr, low, p-1)
    quickSort(arr, p+1, high)
}`,
    lines: { start: [14], compare: [4, 5], swap: [6, 7], 'place-pivot': [10], done: [14] },
  },
  rust: {
    code: `fn partition(arr: &mut Vec<i32>, low: usize, high: usize) -> usize {
    let pivot = arr[high];
    let mut i = low as i32 - 1;
    for j in low..high {
        if arr[j] < pivot {
            i += 1;
            arr.swap(i as usize, j);
        }
    }
    arr.swap((i + 1) as usize, high);
    (i + 1) as usize
}

fn quick_sort(arr: &mut Vec<i32>, low: usize, high: usize) {
    if low >= high { return; }
    let p = partition(arr, low, high);
    if p > 0 { quick_sort(arr, low, p - 1); }
    quick_sort(arr, p + 1, high);
}`,
    lines: { start: [14], compare: [4, 5], swap: [6, 7], 'place-pivot': [10], done: [14] },
  },
  php: {
    code: `function partition(array &$arr, int $low, int $high): int {
    $pivot = $arr[$high];
    $i = $low - 1;
    for ($j = $low; $j < $high; $j++) {
        if ($arr[$j] < $pivot) {
            $i++;
            [$arr[$i], $arr[$j]] = [$arr[$j], $arr[$i]];
        }
    }
    [$arr[$i + 1], $arr[$high]] = [$arr[$high], $arr[$i + 1]];
    return $i + 1;
}

function quickSort(array &$arr, int $low, int $high): void {
    if ($low >= $high) return;
    $p = partition($arr, $low, $high);
    quickSort($arr, $low, $p - 1);
    quickSort($arr, $p + 1, $high);
}`,
    lines: { start: [14], compare: [4, 5], swap: [6, 7], 'place-pivot': [10], done: [14] },
  },
};
