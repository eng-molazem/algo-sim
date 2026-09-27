export default {
  python: {
    code: `def heapify(arr, size, root):
    largest = root
    left = 2 * root + 1
    right = 2 * root + 2
    if left < size and arr[left] > arr[largest]:
        largest = left
    if right < size and arr[right] > arr[largest]:
        largest = right
    if largest != root:
        arr[root], arr[largest] = arr[largest], arr[root]
        heapify(arr, size, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr`,
    lines: { start: [13, 14, 15, 16], compare: [5, 6, 7, 8], swap: [10, 18], 'heapify-done': [17], done: [20] },
  },
  c: {
    code: `void heapify(int arr[], int size, int root) {
    int largest = root;
    int left = 2 * root + 1;
    int right = 2 * root + 2;
    if (left < size && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < size && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest != root) {
        int temp = arr[root];
        arr[root] = arr[largest];
        arr[largest] = temp;
        heapify(arr, size, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
    lines: { start: [19, 20, 21], compare: [5, 6, 8, 9], swap: [12, 13, 14, 24, 25, 26], 'heapify-done': [23], done: [29] },
  },
  cpp: {
    code: `void heapify(vector<int>& arr, int size, int root) {
    int largest = root;
    int left = 2 * root + 1;
    int right = 2 * root + 2;
    if (left < size && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < size && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest != root) {
        swap(arr[root], arr[largest]);
        heapify(arr, size, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
    lines: { start: [17, 18, 19, 20], compare: [5, 6, 8, 9], swap: [12, 23], 'heapify-done': [22], done: [26] },
  },
  csharp: {
    code: `void Heapify(int[] arr, int size, int root) {
    int largest = root;
    int left = 2 * root + 1;
    int right = 2 * root + 2;
    if (left < size && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < size && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest != root) {
        int temp = arr[root];
        arr[root] = arr[largest];
        arr[largest] = temp;
        Heapify(arr, size, largest);
    }
}

void HeapSort(int[] arr) {
    int n = arr.Length;
    for (int i = n / 2 - 1; i >= 0; i--) {
        Heapify(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        Heapify(arr, i, 0);
    }
}`,
    lines: { start: [19, 20, 21], compare: [5, 6, 8, 9], swap: [12, 13, 14, 24, 25, 26], 'heapify-done': [23], done: [29] },
  },
  java: {
    code: `void heapify(int[] arr, int size, int root) {
    int largest = root;
    int left = 2 * root + 1;
    int right = 2 * root + 2;
    if (left < size && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < size && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest != root) {
        int temp = arr[root];
        arr[root] = arr[largest];
        arr[largest] = temp;
        heapify(arr, size, largest);
    }
}

void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
    lines: { start: [19, 20, 21], compare: [5, 6, 8, 9], swap: [12, 13, 14, 24, 25, 26], 'heapify-done': [23], done: [29] },
  },
  kotlin: {
    code: `fun heapify(arr: IntArray, size: Int, root: Int) {
    var largest = root
    val left = 2 * root + 1
    val right = 2 * root + 2
    if (left < size && arr[left] > arr[largest]) {
        largest = left
    }
    if (right < size && arr[right] > arr[largest]) {
        largest = right
    }
    if (largest != root) {
        val temp = arr[root]
        arr[root] = arr[largest]
        arr[largest] = temp
        heapify(arr, size, largest)
    }
}

fun heapSort(arr: IntArray) {
    val n = arr.size
    for (i in n / 2 - 1 downTo 0) {
        heapify(arr, n, i)
    }
    for (i in n - 1 downTo 1) {
        val temp = arr[0]
        arr[0] = arr[i]
        arr[i] = temp
        heapify(arr, i, 0)
    }
}`,
    lines: { start: [19, 20, 21], compare: [5, 6, 8, 9], swap: [12, 13, 14, 24, 25, 26], 'heapify-done': [23], done: [29] },
  },
  swift: {
    code: `func heapify(_ arr: inout [Int], _ size: Int, _ root: Int) {
    var largest = root
    let left = 2 * root + 1
    let right = 2 * root + 2
    if left < size && arr[left] > arr[largest] {
        largest = left
    }
    if right < size && arr[right] > arr[largest] {
        largest = right
    }
    if largest != root {
        arr.swapAt(root, largest)
        heapify(&arr, size, largest)
    }
}

func heapSort(_ arr: inout [Int]) {
    let n = arr.count
    for i in stride(from: n / 2 - 1, through: 0, by: -1) {
        heapify(&arr, n, i)
    }
    for i in stride(from: n - 1, through: 1, by: -1) {
        arr.swapAt(0, i)
        heapify(&arr, i, 0)
    }
}`,
    lines: { start: [17, 18, 19, 20], compare: [5, 6, 8, 9], swap: [12, 23], 'heapify-done': [22], done: [26] },
  },
  javascript: {
    code: `function heapify(arr, size, root) {
  let largest = root;
  const left = 2 * root + 1;
  const right = 2 * root + 2;
  if (left < size && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < size && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== root) {
    [arr[root], arr[largest]] = [arr[largest], arr[root]];
    heapify(arr, size, largest);
  }
}

function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}`,
    lines: { start: [17, 18, 19, 20], compare: [5, 6, 8, 9], swap: [12, 23], 'heapify-done': [22], done: [26, 27] },
  },
  typescript: {
    code: `function heapify(arr: number[], size: number, root: number): void {
  let largest = root;
  const left = 2 * root + 1;
  const right = 2 * root + 2;
  if (left < size && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < size && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== root) {
    [arr[root], arr[largest]] = [arr[largest], arr[root]];
    heapify(arr, size, largest);
  }
}

function heapSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}`,
    lines: { start: [17, 18, 19, 20], compare: [5, 6, 8, 9], swap: [12, 23], 'heapify-done': [22], done: [26, 27] },
  },
  go: {
    code: `func heapify(arr []int, size, root int) {
    largest := root
    left := 2*root + 1
    right := 2*root + 2
    if left < size && arr[left] > arr[largest] {
        largest = left
    }
    if right < size && arr[right] > arr[largest] {
        largest = right
    }
    if largest != root {
        arr[root], arr[largest] = arr[largest], arr[root]
        heapify(arr, size, largest)
    }
}

func heapSort(arr []int) []int {
    n := len(arr)
    for i := n/2 - 1; i >= 0; i-- {
        heapify(arr, n, i)
    }
    for i := n - 1; i > 0; i-- {
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    }
    return arr
}`,
    lines: { start: [17, 18, 19, 20], compare: [5, 6, 8, 9], swap: [12, 23], 'heapify-done': [22], done: [26, 27] },
  },
  rust: {
    code: `fn heapify(arr: &mut Vec<i32>, size: usize, root: usize) {
    let mut largest = root;
    let left = 2 * root + 1;
    let right = 2 * root + 2;
    if left < size && arr[left] > arr[largest] {
        largest = left;
    }
    if right < size && arr[right] > arr[largest] {
        largest = right;
    }
    if largest != root {
        arr.swap(root, largest);
        heapify(arr, size, largest);
    }
}

fn heap_sort(arr: &mut Vec<i32>) {
    let n = arr.len();
    for i in (0..n / 2).rev() {
        heapify(arr, n, i);
    }
    for i in (1..n).rev() {
        arr.swap(0, i);
        heapify(arr, i, 0);
    }
}`,
    lines: { start: [17, 18, 19, 20], compare: [5, 6, 8, 9], swap: [12, 23], 'heapify-done': [22], done: [26] },
  },
  php: {
    code: `function heapify(array &$arr, int $size, int $root): void {
    $largest = $root;
    $left = 2 * $root + 1;
    $right = 2 * $root + 2;
    if ($left < $size && $arr[$left] > $arr[$largest]) {
        $largest = $left;
    }
    if ($right < $size && $arr[$right] > $arr[$largest]) {
        $largest = $right;
    }
    if ($largest !== $root) {
        [$arr[$root], $arr[$largest]] = [$arr[$largest], $arr[$root]];
        heapify($arr, $size, $largest);
    }
}

function heapSort(array $arr): array {
    $n = count($arr);
    for ($i = intdiv($n, 2) - 1; $i >= 0; $i--) {
        heapify($arr, $n, $i);
    }
    for ($i = $n - 1; $i > 0; $i--) {
        [$arr[0], $arr[$i]] = [$arr[$i], $arr[0]];
        heapify($arr, $i, 0);
    }
    return $arr;
}`,
    lines: { start: [17, 18, 19, 20], compare: [5, 6, 8, 9], swap: [12, 23], 'heapify-done': [22], done: [26, 27] },
  },
};
