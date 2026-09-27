export default {
  python: {
    code: `def insert(table, table_size, value):
    index = value % table_size
    if table[index]:
        table[index].append(value)
    else:
        table[index] = [value]`,
    lines: { start: [1], hash: [2], collision: [3, 4], insert: [5, 6] },
  },
  c: {
    code: `void insert(Node* table[], int tableSize, int value) {
    int index = value % tableSize;
    Node* node = malloc(sizeof(Node));
    node->value = value;
    node->next = table[index];
    table[index] = node;
}`,
    lines: { start: [1], hash: [2], collision: [3, 4, 5, 6], insert: [3, 4, 5, 6] },
  },
  cpp: {
    code: `void insert(vector<list<int>>& table, int value) {
    int index = value % table.size();
    table[index].push_back(value);
}`,
    lines: { start: [1], hash: [2], collision: [3], insert: [3] },
  },
  csharp: {
    code: `void Insert(List<int>[] table, int value) {
    int index = value % table.Length;
    table[index].Add(value);
}`,
    lines: { start: [1], hash: [2], collision: [3], insert: [3] },
  },
  java: {
    code: `void insert(List<List<Integer>> table, int value) {
    int index = value % table.size();
    table.get(index).add(value);
}`,
    lines: { start: [1], hash: [2], collision: [3], insert: [3] },
  },
  kotlin: {
    code: `fun insert(table: Array<MutableList<Int>>, value: Int) {
    val index = value % table.size
    table[index].add(value)
}`,
    lines: { start: [1], hash: [2], collision: [3], insert: [3] },
  },
  swift: {
    code: `func insert(_ table: inout [[Int]], _ value: Int) {
    let index = value % table.count
    table[index].append(value)
}`,
    lines: { start: [1], hash: [2], collision: [3], insert: [3] },
  },
  javascript: {
    code: `function insert(table, value) {
  const index = value % table.length;
  table[index].push(value);
}`,
    lines: { start: [1], hash: [2], collision: [3], insert: [3] },
  },
  typescript: {
    code: `function insert(table: number[][], value: number): void {
  const index = value % table.length;
  table[index].push(value);
}`,
    lines: { start: [1], hash: [2], collision: [3], insert: [3] },
  },
  go: {
    code: `func insert(table [][]int, value int) [][]int {
    index := value % len(table)
    table[index] = append(table[index], value)
    return table
}`,
    lines: { start: [1], hash: [2], collision: [3], insert: [3] },
  },
  rust: {
    code: `fn insert(table: &mut Vec<Vec<i32>>, value: i32) {
    let index = (value as usize) % table.len();
    table[index].push(value);
}`,
    lines: { start: [1], hash: [2], collision: [3], insert: [3] },
  },
  php: {
    code: `function insert(array &$table, int $value): void {
    $index = $value % count($table);
    $table[$index][] = $value;
}`,
    lines: { start: [1], hash: [2], collision: [3], insert: [3] },
  },
};
