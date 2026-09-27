export default {
  python: {
    code: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, value):
        self.items.append(value)

    def pop(self):
        if not self.items:
            raise IndexError("stack is empty")
        return self.items.pop()`,
    lines: { start: [1, 2, 3], 'push-check': [5], 'push-place': [6], 'pop-check': [8, 9, 10], 'pop-place': [11] },
  },
  c: {
    code: `typedef struct {
    int items[100];
    int top;
} Stack;

void push(Stack* s, int value) {
    s->items[++s->top] = value;
}

int pop(Stack* s) {
    if (s->top == -1) {
        exit(1);
    }
    return s->items[s->top--];
}`,
    lines: { start: [1, 2, 3, 4], 'push-check': [6], 'push-place': [7], 'pop-check': [10, 11, 12, 13], 'pop-place': [14] },
  },
  cpp: {
    code: `class Stack {
    vector<int> items;
public:
    void push(int value) {
        items.push_back(value);
    }
    int pop() {
        if (items.empty()) throw runtime_error("empty");
        int top = items.back();
        items.pop_back();
        return top;
    }
};`,
    lines: { start: [1, 2, 3], 'push-check': [4], 'push-place': [5], 'pop-check': [7, 8], 'pop-place': [9, 10, 11] },
  },
  csharp: {
    code: `class Stack {
    private List<int> items = new List<int>();

    public void Push(int value) {
        items.Add(value);
    }

    public int Pop() {
        if (items.Count == 0) throw new InvalidOperationException("empty");
        int top = items[items.Count - 1];
        items.RemoveAt(items.Count - 1);
        return top;
    }
}`,
    lines: { start: [1, 2], 'push-check': [4], 'push-place': [5], 'pop-check': [8, 9], 'pop-place': [10, 11, 12] },
  },
  java: {
    code: `class Stack {
    private List<Integer> items = new ArrayList<>();

    void push(int value) {
        items.add(value);
    }

    int pop() {
        if (items.isEmpty()) throw new RuntimeException("empty");
        return items.remove(items.size() - 1);
    }
}`,
    lines: { start: [1, 2], 'push-check': [4], 'push-place': [5], 'pop-check': [8, 9], 'pop-place': [10] },
  },
  kotlin: {
    code: `class Stack {
    private val items = mutableListOf<Int>()

    fun push(value: Int) {
        items.add(value)
    }

    fun pop(): Int {
        if (items.isEmpty()) throw RuntimeException("empty")
        return items.removeAt(items.size - 1)
    }
}`,
    lines: { start: [1, 2], 'push-check': [4], 'push-place': [5], 'pop-check': [8, 9], 'pop-place': [10] },
  },
  swift: {
    code: `class Stack {
    var items: [Int] = []

    func push(_ value: Int) {
        items.append(value)
    }

    func pop() -> Int {
        guard !items.isEmpty else { fatalError("empty") }
        return items.removeLast()
    }
}`,
    lines: { start: [1, 2], 'push-check': [4], 'push-place': [5], 'pop-check': [8, 9], 'pop-place': [10] },
  },
  javascript: {
    code: `class Stack {
  constructor() {
    this.items = [];
  }
  push(value) {
    this.items.push(value);
  }
  pop() {
    if (this.items.length === 0) throw new Error('empty');
    return this.items.pop();
  }
}`,
    lines: { start: [1, 2, 3, 4], 'push-check': [5], 'push-place': [6], 'pop-check': [8, 9], 'pop-place': [10] },
  },
  typescript: {
    code: `class Stack {
  private items: number[] = [];

  push(value: number): void {
    this.items.push(value);
  }

  pop(): number {
    if (this.items.length === 0) throw new Error('empty');
    return this.items.pop()!;
  }
}`,
    lines: { start: [1, 2], 'push-check': [4], 'push-place': [5], 'pop-check': [8, 9], 'pop-place': [10] },
  },
  go: {
    code: `type Stack struct {
    items []int
}

func (s *Stack) Push(value int) {
    s.items = append(s.items, value)
}

func (s *Stack) Pop() int {
    n := len(s.items) - 1
    top := s.items[n]
    s.items = s.items[:n]
    return top
}`,
    lines: { start: [1, 2, 3], 'push-check': [5], 'push-place': [6], 'pop-check': [9, 10], 'pop-place': [11, 12, 13] },
  },
  rust: {
    code: `struct Stack {
    items: Vec<i32>,
}

impl Stack {
    fn push(&mut self, value: i32) {
        self.items.push(value);
    }

    fn pop(&mut self) -> i32 {
        self.items.pop().expect("empty")
    }
}`,
    lines: { start: [1, 2, 3, 5], 'push-check': [6], 'push-place': [7], 'pop-check': [10], 'pop-place': [11] },
  },
  php: {
    code: `class Stack {
    private array $items = [];

    public function push(int $value): void {
        $this->items[] = $value;
    }

    public function pop(): int {
        if (empty($this->items)) throw new Exception("empty");
        return array_pop($this->items);
    }
}`,
    lines: { start: [1, 2], 'push-check': [4], 'push-place': [5], 'pop-check': [8, 9], 'pop-place': [10] },
  },
};
