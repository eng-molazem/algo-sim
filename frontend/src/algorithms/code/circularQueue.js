export default {
  python: {
    code: `class CircularQueue:
    def __init__(self, capacity):
        self.buffer = [None] * capacity
        self.capacity = capacity
        self.front = self.rear = -1
        self.size = 0

    def enqueue(self, value):
        if self.size == self.capacity:
            raise OverflowError("queue is full")
        self.rear = (self.rear + 1) % self.capacity
        self.buffer[self.rear] = value
        if self.front == -1:
            self.front = self.rear
        self.size += 1

    def dequeue(self):
        value = self.buffer[self.front]
        self.buffer[self.front] = None
        self.size -= 1
        if self.size == 0:
            self.front = self.rear = -1
        else:
            self.front = (self.front + 1) % self.capacity
        return value`,
    lines: {
      start: [1, 2, 3, 4, 5, 6],
      full: [9, 10],
      'enqueue-check': [8, 9],
      'enqueue-place': [11, 12, 13, 14, 15],
      'dequeue-check': [18],
      'dequeue-place': [19, 20, 21, 22, 23, 24, 25],
    },
  },
  c: {
    code: `typedef struct {
    int buffer[CAPACITY];
    int front, rear, size;
} CircularQueue;

void enqueue(CircularQueue* q, int value) {
    if (q->size == CAPACITY) return;
    q->rear = (q->rear + 1) % CAPACITY;
    q->buffer[q->rear] = value;
    if (q->front == -1) q->front = q->rear;
    q->size++;
}

int dequeue(CircularQueue* q) {
    int value = q->buffer[q->front];
    q->size--;
    if (q->size == 0) { q->front = q->rear = -1; }
    else { q->front = (q->front + 1) % CAPACITY; }
    return value;
}`,
    lines: {
      start: [1, 2, 3],
      'enqueue-check': [6, 7],
      'enqueue-place': [8, 9, 10, 11],
      full: [7],
      'dequeue-check': [14, 15],
      'dequeue-place': [16, 17, 18],
    },
  },
  cpp: {
    code: `class CircularQueue {
    vector<int> buffer;
    int frontIdx = -1, rearIdx = -1, size = 0, capacity;
public:
    CircularQueue(int cap) : buffer(cap, 0), capacity(cap) {}
    void enqueue(int value) {
        if (size == capacity) return;
        rearIdx = (rearIdx + 1) % capacity;
        buffer[rearIdx] = value;
        if (frontIdx == -1) frontIdx = rearIdx;
        size++;
    }
    int dequeue() {
        int value = buffer[frontIdx];
        size--;
        if (size == 0) { frontIdx = rearIdx = -1; }
        else { frontIdx = (frontIdx + 1) % capacity; }
        return value;
    }
};`,
    lines: {
      start: [1, 2, 3, 4, 5],
      'enqueue-check': [6, 7],
      'enqueue-place': [8, 9, 10, 11],
      full: [7],
      'dequeue-check': [13, 14],
      'dequeue-place': [15, 16, 17],
    },
  },
  csharp: {
    code: `class CircularQueue {
    int[] buffer; int front = -1, rear = -1, size = 0, capacity;
    public CircularQueue(int cap) { buffer = new int[cap]; capacity = cap; }
    public void Enqueue(int value) {
        if (size == capacity) return;
        rear = (rear + 1) % capacity;
        buffer[rear] = value;
        if (front == -1) front = rear;
        size++;
    }
    public int Dequeue() {
        int value = buffer[front];
        size--;
        if (size == 0) { front = rear = -1; }
        else { front = (front + 1) % capacity; }
        return value;
    }
}`,
    lines: {
      start: [1, 2, 3],
      'enqueue-check': [4, 5],
      'enqueue-place': [6, 7, 8, 9],
      full: [5],
      'dequeue-check': [11, 12],
      'dequeue-place': [13, 14, 15],
    },
  },
  java: {
    code: `class CircularQueue {
    int[] buffer; int front = -1, rear = -1, size = 0, capacity;
    CircularQueue(int cap) { buffer = new int[cap]; capacity = cap; }
    void enqueue(int value) {
        if (size == capacity) return;
        rear = (rear + 1) % capacity;
        buffer[rear] = value;
        if (front == -1) front = rear;
        size++;
    }
    int dequeue() {
        int value = buffer[front];
        size--;
        if (size == 0) { front = rear = -1; }
        else { front = (front + 1) % capacity; }
        return value;
    }
}`,
    lines: {
      start: [1, 2, 3],
      'enqueue-check': [4, 5],
      'enqueue-place': [6, 7, 8, 9],
      full: [5],
      'dequeue-check': [11, 12],
      'dequeue-place': [13, 14, 15],
    },
  },
  kotlin: {
    code: `class CircularQueue(private val capacity: Int) {
    val buffer = IntArray(capacity)
    var front = -1; var rear = -1; var size = 0
    fun enqueue(value: Int) {
        if (size == capacity) return
        rear = (rear + 1) % capacity
        buffer[rear] = value
        if (front == -1) front = rear
        size++
    }
    fun dequeue(): Int {
        val value = buffer[front]
        size--
        if (size == 0) { front = -1; rear = -1 } else { front = (front + 1) % capacity }
        return value
    }
}`,
    lines: {
      start: [1, 2, 3],
      'enqueue-check': [4, 5],
      'enqueue-place': [6, 7, 8, 9],
      full: [5],
      'dequeue-check': [11, 12],
      'dequeue-place': [13, 14],
    },
  },
  swift: {
    code: `struct CircularQueue {
    var buffer: [Int?]
    var front = -1, rear = -1, size = 0
    let capacity: Int
    init(_ cap: Int) { capacity = cap; buffer = Array(repeating: nil, count: cap) }
    mutating func enqueue(_ value: Int) {
        if size == capacity { return }
        rear = (rear + 1) % capacity
        buffer[rear] = value
        if front == -1 { front = rear }
        size += 1
    }
    mutating func dequeue() -> Int? {
        let value = buffer[front]
        size -= 1
        if size == 0 { front = -1; rear = -1 } else { front = (front + 1) % capacity }
        return value
    }
}`,
    lines: {
      start: [1, 2, 3, 4, 5],
      'enqueue-check': [6, 7],
      'enqueue-place': [8, 9, 10, 11],
      full: [7],
      'dequeue-check': [13, 14],
      'dequeue-place': [15, 16],
    },
  },
  javascript: {
    code: `class CircularQueue {
  constructor(capacity) {
    this.capacity = capacity;
    this.buffer = new Array(capacity).fill(null);
    this.front = -1;
    this.rear = -1;
    this.size = 0;
  }

  enqueue(value) {
    if (this.size === this.capacity) return;
    this.rear = (this.rear + 1) % this.capacity;
    this.buffer[this.rear] = value;
    if (this.front === -1) this.front = this.rear;
    this.size += 1;
  }

  dequeue() {
    const value = this.buffer[this.front];
    this.size -= 1;
    if (this.size === 0) {
      this.front = -1;
      this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.capacity;
    }
    return value;
  }
}`,
    lines: {
      start: [1, 2, 3, 4, 5, 6, 7],
      'enqueue-check': [10, 11],
      'enqueue-place': [12, 13, 14, 15],
      full: [11],
      'dequeue-check': [19, 20],
      'dequeue-place': [21, 22, 23, 24, 25, 26],
    },
  },
  typescript: {
    code: `class CircularQueue {
  private buffer: (number | null)[];
  private front = -1;
  private rear = -1;
  private size = 0;
  constructor(private capacity: number) {
    this.buffer = new Array(capacity).fill(null);
  }

  enqueue(value: number): void {
    if (this.size === this.capacity) return;
    this.rear = (this.rear + 1) % this.capacity;
    this.buffer[this.rear] = value;
    if (this.front === -1) this.front = this.rear;
    this.size += 1;
  }

  dequeue(): number | null {
    const value = this.buffer[this.front];
    this.size -= 1;
    if (this.size === 0) {
      this.front = -1;
      this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.capacity;
    }
    return value;
  }
}`,
    lines: {
      start: [1, 2, 3, 4, 5, 6, 7],
      'enqueue-check': [10, 11],
      'enqueue-place': [12, 13, 14, 15],
      full: [11],
      'dequeue-check': [19, 20],
      'dequeue-place': [21, 22, 23, 24, 25, 26],
    },
  },
  go: {
    code: `type CircularQueue struct {
    buffer               []int
    front, rear, size    int
    capacity             int
}

func (q *CircularQueue) Enqueue(value int) {
    if q.size == q.capacity {
        return
    }
    q.rear = (q.rear + 1) % q.capacity
    q.buffer[q.rear] = value
    if q.front == -1 {
        q.front = q.rear
    }
    q.size++
}

func (q *CircularQueue) Dequeue() int {
    value := q.buffer[q.front]
    q.size--
    if q.size == 0 {
        q.front, q.rear = -1, -1
    } else {
        q.front = (q.front + 1) % q.capacity
    }
    return value
}`,
    lines: {
      start: [1, 2, 3, 4, 5],
      'enqueue-check': [7, 8, 9],
      'enqueue-place': [11, 12, 13, 14, 15, 16],
      full: [8],
      'dequeue-check': [20, 21],
      'dequeue-place': [22, 23, 24, 25],
    },
  },
  rust: {
    code: `struct CircularQueue {
    buffer: Vec<Option<i32>>,
    front: i32,
    rear: i32,
    size: usize,
    capacity: usize,
}

impl CircularQueue {
    fn enqueue(&mut self, value: i32) {
        if self.size == self.capacity { return; }
        self.rear = (self.rear + 1) % self.capacity as i32;
        self.buffer[self.rear as usize] = Some(value);
        if self.front == -1 { self.front = self.rear; }
        self.size += 1;
    }

    fn dequeue(&mut self) -> Option<i32> {
        let value = self.buffer[self.front as usize];
        self.size -= 1;
        if self.size == 0 {
            self.front = -1;
            self.rear = -1;
        } else {
            self.front = (self.front + 1) % self.capacity as i32;
        }
        value
    }
}`,
    lines: {
      start: [1, 2, 3, 4, 5, 6],
      'enqueue-check': [10, 11],
      'enqueue-place': [12, 13, 14, 15],
      full: [11],
      'dequeue-check': [19, 20],
      'dequeue-place': [21, 22, 23, 24, 25, 26],
    },
  },
  php: {
    code: `class CircularQueue {
    private array $buffer;
    private int $front = -1, $rear = -1, $size = 0;
    public function __construct(private int $capacity) {
        $this->buffer = array_fill(0, $capacity, null);
    }

    public function enqueue($value): void {
        if ($this->size === $this->capacity) return;
        $this->rear = ($this->rear + 1) % $this->capacity;
        $this->buffer[$this->rear] = $value;
        if ($this->front === -1) $this->front = $this->rear;
        $this->size++;
    }

    public function dequeue() {
        $value = $this->buffer[$this->front];
        $this->size--;
        if ($this->size === 0) {
            $this->front = $this->rear = -1;
        } else {
            $this->front = ($this->front + 1) % $this->capacity;
        }
        return $value;
    }
}`,
    lines: {
      start: [1, 2, 3, 4, 5, 6],
      'enqueue-check': [9, 10],
      'enqueue-place': [11, 12, 13, 14],
      full: [10],
      'dequeue-check': [18, 19],
      'dequeue-place': [20, 21, 22, 23, 24, 25],
    },
  },
};
