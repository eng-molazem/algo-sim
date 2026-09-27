export default {
  python: {
    code: `def insert(table, table_size, value):
    index = value % table_size
    probes = 0
    while table[index] is not None and probes < table_size:
        index = (index + 1) % table_size
        probes += 1
    if probes < table_size:
        table[index] = value`,
    lines: { start: [1, 2, 3], hash: [2], collision: [4, 5, 6], full: [7], insert: [8] },
  },
  c: {
    code: `void insert(int table[], int tableSize, int value) {
    int index = value % tableSize, probes = 0;
    while (table[index] != -1 && probes < tableSize) {
        index = (index + 1) % tableSize;
        probes++;
    }
    if (probes < tableSize) table[index] = value;
}`,
    lines: { start: [1, 2], hash: [2], collision: [3, 4, 5], full: [7], insert: [7] },
  },
  cpp: {
    code: `void insert(vector<optional<int>>& table, int value) {
    int index = value % table.size(), probes = 0;
    while (table[index].has_value() && probes < (int)table.size()) {
        index = (index + 1) % table.size();
        probes++;
    }
    if (probes < (int)table.size()) table[index] = value;
}`,
    lines: { start: [1, 2], hash: [2], collision: [3, 4, 5], full: [7], insert: [7] },
  },
  csharp: {
    code: `void Insert(int?[] table, int value) {
    int index = value % table.Length, probes = 0;
    while (table[index] != null && probes < table.Length) {
        index = (index + 1) % table.Length;
        probes++;
    }
    if (probes < table.Length) table[index] = value;
}`,
    lines: { start: [1, 2], hash: [2], collision: [3, 4, 5], full: [7], insert: [7] },
  },
  java: {
    code: `void insert(Integer[] table, int value) {
    int index = value % table.length, probes = 0;
    while (table[index] != null && probes < table.length) {
        index = (index + 1) % table.length;
        probes++;
    }
    if (probes < table.length) table[index] = value;
}`,
    lines: { start: [1, 2], hash: [2], collision: [3, 4, 5], full: [7], insert: [7] },
  },
  kotlin: {
    code: `fun insert(table: Array<Int?>, value: Int) {
    var index = value % table.size
    var probes = 0
    while (table[index] != null && probes < table.size) {
        index = (index + 1) % table.size
        probes++
    }
    if (probes < table.size) table[index] = value
}`,
    lines: { start: [1, 2, 3], hash: [2], collision: [4, 5, 6], full: [8], insert: [8] },
  },
  swift: {
    code: `func insert(_ table: inout [Int?], _ value: Int) {
    var index = value % table.count
    var probes = 0
    while table[index] != nil && probes < table.count {
        index = (index + 1) % table.count
        probes += 1
    }
    if probes < table.count { table[index] = value }
}`,
    lines: { start: [1, 2, 3], hash: [2], collision: [4, 5, 6], full: [8], insert: [8] },
  },
  javascript: {
    code: `function insert(table, value) {
  let index = value % table.length;
  let probes = 0;
  while (table[index] !== null && probes < table.length) {
    index = (index + 1) % table.length;
    probes += 1;
  }
  if (probes < table.length) table[index] = value;
}`,
    lines: { start: [1, 2, 3], hash: [2], collision: [4, 5, 6], full: [8], insert: [8] },
  },
  typescript: {
    code: `function insert(table: (number | null)[], value: number): void {
  let index = value % table.length;
  let probes = 0;
  while (table[index] !== null && probes < table.length) {
    index = (index + 1) % table.length;
    probes += 1;
  }
  if (probes < table.length) table[index] = value;
}`,
    lines: { start: [1, 2, 3], hash: [2], collision: [4, 5, 6], full: [8], insert: [8] },
  },
  go: {
    code: `func insert(table []*int, value int) {
    index := value % len(table)
    probes := 0
    for table[index] != nil && probes < len(table) {
        index = (index + 1) % len(table)
        probes++
    }
    if probes < len(table) {
        table[index] = &value
    }
}`,
    lines: { start: [1, 2, 3], hash: [2], collision: [4, 5, 6], full: [8, 9, 10], insert: [8, 9, 10] },
  },
  rust: {
    code: `fn insert(table: &mut Vec<Option<i32>>, value: i32) {
    let mut index = (value as usize) % table.len();
    let mut probes = 0;
    while table[index].is_some() && probes < table.len() {
        index = (index + 1) % table.len();
        probes += 1;
    }
    if probes < table.len() { table[index] = Some(value); }
}`,
    lines: { start: [1, 2, 3], hash: [2], collision: [4, 5, 6], full: [8], insert: [8] },
  },
  php: {
    code: `function insert(array &$table, int $value): void {
    $index = $value % count($table);
    $probes = 0;
    while ($table[$index] !== null && $probes < count($table)) {
        $index = ($index + 1) % count($table);
        $probes++;
    }
    if ($probes < count($table)) $table[$index] = $value;
}`,
    lines: { start: [1, 2, 3], hash: [2], collision: [4, 5, 6], full: [8], insert: [8] },
  },
};
