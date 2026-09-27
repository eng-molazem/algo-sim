export default {
  python: {
    code: `class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, value):
        self.items.append(value)

    def dequeue(self):
        if not self.items:
            raise IndexError("queue is empty")
        return self.items.pop(0)`,
    lines: { start: [1, 2, 3], 'enqueue-check': [5], 'enqueue-place': [6], 'dequeue-check': [8, 9, 10], 'dequeue-place': [11] },
  },
  c: {
    code: `typedef struct {
    int items[100];
    int front, rear;
} Queue;

void enqueue(Queue* q, int value) {
    q->items[++q->rear] = value;
}

int dequeue(Queue* q) {
    if (q->front > q->rear) exit(1);
    return q->items[q->front++];
}`,
    lines: { start: [1, 2, 3, 4], 'enqueue-check': [6], 'enqueue-place': [7], 'dequeue-check': [10, 11], 'dequeue-place': [12] },
  },
  cpp: {
    code: `class Queue {
    deque<int> items;
public:
    void enqueue(int value) {
        items.push_back(value);
    }
    int dequeue() {
        int front = items.front();
        items.pop_front();
        return front;
    }
};`,
    lines: { start: [1, 2, 3], 'enqueue-check': [4], 'enqueue-place': [5], 'dequeue-check': [7, 8], 'dequeue-place': [9] },
  },
  csharp: {
    code: `class Queue {
    Queue<int> items = new();
    public void Enqueue(int value) => items.Enqueue(value);
    public int Dequeue() => items.Dequeue();
}`,
    lines: { start: [1, 2], 'enqueue-check': [3], 'enqueue-place': [3], 'dequeue-check': [4], 'dequeue-place': [4] },
  },
  java: {
    code: `class Queue {
    private Deque<Integer> items = new ArrayDeque<>();

    void enqueue(int value) {
        items.addLast(value);
    }

    int dequeue() {
        return items.removeFirst();
    }
}`,
    lines: { start: [1, 2], 'enqueue-check': [4], 'enqueue-place': [5], 'dequeue-check': [8], 'dequeue-place': [9] },
  },
  kotlin: {
    code: `class Queue {
    private val items = ArrayDeque<Int>()

    fun enqueue(value: Int) {
        items.addLast(value)
    }

    fun dequeue(): Int = items.removeFirst()
}`,
    lines: { start: [1, 2], 'enqueue-check': [4], 'enqueue-place': [5], 'dequeue-check': [8], 'dequeue-place': [8] },
  },
  swift: {
    code: `struct Queue {
    var items: [Int] = []

    mutating func enqueue(_ value: Int) {
        items.append(value)
    }

    mutating func dequeue() -> Int {
        return items.removeFirst()
    }
}`,
    lines: { start: [1, 2], 'enqueue-check': [4], 'enqueue-place': [5], 'dequeue-check': [8], 'dequeue-place': [8] },
  },
  javascript: {
    code: `class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(value) {
    this.items.push(value);
  }

  dequeue() {
    return this.items.shift();
  }
}`,
    lines: { start: [1, 2, 3], 'enqueue-check': [6], 'enqueue-place': [7], 'dequeue-check': [10], 'dequeue-place': [11] },
  },
  typescript: {
    code: `class Queue {
  private items: number[] = [];

  enqueue(value: number): void {
    this.items.push(value);
  }

  dequeue(): number | undefined {
    return this.items.shift();
  }
}`,
    lines: { start: [1, 2], 'enqueue-check': [4], 'enqueue-place': [5], 'dequeue-check': [8], 'dequeue-place': [9] },
  },
  go: {
    code: `type Queue struct {
    items []int
}

func (q *Queue) Enqueue(value int) {
    q.items = append(q.items, value)
}

func (q *Queue) Dequeue() int {
    front := q.items[0]
    q.items = q.items[1:]
    return front
}`,
    lines: { start: [1, 2, 3], 'enqueue-check': [5], 'enqueue-place': [6], 'dequeue-check': [9, 10], 'dequeue-place': [11] },
  },
  rust: {
    code: `struct Queue {
    items: VecDeque<i32>,
}

impl Queue {
    fn enqueue(&mut self, value: i32) {
        self.items.push_back(value);
    }

    fn dequeue(&mut self) -> Option<i32> {
        self.items.pop_front()
    }
}`,
    lines: { start: [1, 2, 3], 'enqueue-check': [6], 'enqueue-place': [7], 'dequeue-check': [10], 'dequeue-place': [11] },
  },
  php: {
    code: `class Queue {
    private array $items = [];

    public function enqueue($value): void {
        $this->items[] = $value;
    }

    public function dequeue() {
        return array_shift($this->items);
    }
}`,
    lines: { start: [1, 2], 'enqueue-check': [4], 'enqueue-place': [5], 'dequeue-check': [8], 'dequeue-place': [9] },
  },
};
