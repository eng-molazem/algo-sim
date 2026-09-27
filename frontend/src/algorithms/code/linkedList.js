export default {
  python: {
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert(self, value):
        node = Node(value)
        if not self.head:
            self.head = node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = node

    def delete_at(self, index):
        if index == 0:
            self.head = self.head.next
            return
        current = self.head
        for _ in range(index - 1):
            current = current.next
        current.next = current.next.next`,
    lines: {
      start: [1, 2, 3, 4, 6, 7, 8],
      traverse: [15, 16, 17],
      insert: [12, 13, 18],
      delete: [20, 21, 22, 23, 24, 25, 26],
      'after-delete': [27],
    },
  },
  c: {
    code: `typedef struct Node {
    int value;
    struct Node* next;
} Node;

Node* head = NULL;

void insertAtTail(int value) {
    Node* node = malloc(sizeof(Node));
    node->value = value;
    node->next = NULL;
    if (!head) { head = node; return; }
    Node* current = head;
    while (current->next) current = current->next;
    current->next = node;
}

void deleteAt(int index) {
    if (index == 0) { head = head->next; return; }
    Node* current = head;
    for (int i = 0; i < index - 1; i++) current = current->next;
    current->next = current->next->next;
}`,
    lines: {
      start: [1, 2, 3, 4, 6],
      traverse: [13, 14],
      insert: [9, 10, 11, 12, 15],
      delete: [19, 20, 21],
      'after-delete': [22],
    },
  },
  cpp: {
    code: `struct Node {
    int value;
    Node* next;
    Node(int v) : value(v), next(nullptr) {}
};

class LinkedList {
    Node* head = nullptr;
public:
    void insertAtTail(int value) {
        Node* node = new Node(value);
        if (!head) { head = node; return; }
        Node* current = head;
        while (current->next) current = current->next;
        current->next = node;
    }

    void deleteAt(int index) {
        if (index == 0) { head = head->next; return; }
        Node* current = head;
        for (int i = 0; i < index - 1; i++) current = current->next;
        current->next = current->next->next;
    }
};`,
    lines: {
      start: [1, 2, 3, 4, 5, 7, 8, 9],
      traverse: [13, 14],
      insert: [12, 15],
      delete: [19, 20, 21],
      'after-delete': [22],
    },
  },
  csharp: {
    code: `class Node {
    public int Value;
    public Node Next;
    public Node(int value) { Value = value; }
}

class LinkedList {
    Node head;

    public void InsertAtTail(int value) {
        Node node = new Node(value);
        if (head == null) { head = node; return; }
        Node current = head;
        while (current.Next != null) current = current.Next;
        current.Next = node;
    }

    public void DeleteAt(int index) {
        if (index == 0) { head = head.Next; return; }
        Node current = head;
        for (int i = 0; i < index - 1; i++) current = current.Next;
        current.Next = current.Next.Next;
    }
}`,
    lines: {
      start: [1, 2, 3, 4, 5, 7, 8],
      traverse: [13, 14],
      insert: [12, 15],
      delete: [19, 20, 21],
      'after-delete': [22],
    },
  },
  java: {
    code: `class Node {
    int value;
    Node next;
    Node(int value) { this.value = value; }
}

class LinkedList {
    Node head;

    void insertAtTail(int value) {
        Node node = new Node(value);
        if (head == null) { head = node; return; }
        Node current = head;
        while (current.next != null) current = current.next;
        current.next = node;
    }

    void deleteAt(int index) {
        if (index == 0) { head = head.next; return; }
        Node current = head;
        for (int i = 0; i < index - 1; i++) current = current.next;
        current.next = current.next.next;
    }
}`,
    lines: {
      start: [1, 2, 3, 4, 5, 7, 8],
      traverse: [13, 14],
      insert: [12, 15],
      delete: [19, 20, 21],
      'after-delete': [22],
    },
  },
  kotlin: {
    code: `class Node(var value: Int, var next: Node? = null)

class LinkedList {
    var head: Node? = null

    fun insertAtTail(value: Int) {
        val node = Node(value)
        if (head == null) { head = node; return }
        var current = head
        while (current?.next != null) current = current.next
        current?.next = node
    }

    fun deleteAt(index: Int) {
        if (index == 0) { head = head?.next; return }
        var current = head
        for (i in 0 until index - 1) current = current?.next
        current?.next = current?.next?.next
    }
}`,
    lines: {
      start: [1, 3, 4],
      traverse: [9, 10],
      insert: [8, 11],
      delete: [15, 16, 17],
      'after-delete': [18],
    },
  },
  swift: {
    code: `class Node {
    var value: Int
    var next: Node?
    init(_ value: Int) { self.value = value }
}

class LinkedList {
    var head: Node?

    func insertAtTail(_ value: Int) {
        let node = Node(value)
        if head == nil { head = node; return }
        var current = head
        while current?.next != nil { current = current?.next }
        current?.next = node
    }

    func deleteAt(_ index: Int) {
        if index == 0 { head = head?.next; return }
        var current = head
        for _ in 0..<index - 1 { current = current?.next }
        current?.next = current?.next?.next
    }
}`,
    lines: {
      start: [1, 2, 3, 4, 5, 7, 8],
      traverse: [13, 14],
      insert: [12, 15],
      delete: [19, 20, 21],
      'after-delete': [22],
    },
  },
  javascript: {
    code: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertAtTail(value) {
    const node = new Node(value);
    if (!this.head) { this.head = node; return; }
    let current = this.head;
    while (current.next) current = current.next;
    current.next = node;
  }

  deleteAt(index) {
    if (index === 0) { this.head = this.head.next; return; }
    let current = this.head;
    for (let i = 0; i < index - 1; i++) current = current.next;
    current.next = current.next.next;
  }
}`,
    lines: {
      start: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11],
      traverse: [16, 17],
      insert: [15, 18],
      delete: [22, 23, 24],
      'after-delete': [25],
    },
  },
  typescript: {
    code: `class Node {
  value: number;
  next: Node | null;
  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  head: Node | null;
  constructor() {
    this.head = null;
  }

  insertAtTail(value: number): void {
    const node = new Node(value);
    if (!this.head) { this.head = node; return; }
    let current = this.head;
    while (current.next) current = current.next;
    current.next = node;
  }

  deleteAt(index: number): void {
    if (index === 0) { this.head = this.head!.next; return; }
    let current = this.head;
    for (let i = 0; i < index - 1; i++) current = current!.next;
    current!.next = current!.next!.next;
  }
}`,
    lines: {
      start: [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13],
      traverse: [18, 19],
      insert: [17, 20],
      delete: [24, 25, 26],
      'after-delete': [27],
    },
  },
  go: {
    code: `type Node struct {
    value int
    next  *Node
}

type LinkedList struct {
    head *Node
}

func (l *LinkedList) InsertAtTail(value int) {
    node := &Node{value: value}
    if l.head == nil {
        l.head = node
        return
    }
    current := l.head
    for current.next != nil {
        current = current.next
    }
    current.next = node
}

func (l *LinkedList) DeleteAt(index int) {
    if index == 0 {
        l.head = l.head.next
        return
    }
    current := l.head
    for i := 0; i < index-1; i++ {
        current = current.next
    }
    current.next = current.next.next
}`,
    lines: {
      start: [1, 2, 3, 6, 7],
      traverse: [16, 17, 18, 19],
      insert: [12, 13, 20],
      delete: [24, 25, 26, 28, 29, 30, 31],
      'after-delete': [32],
    },
  },
  rust: {
    code: `struct Node {
    value: i32,
    next: Option<Box<Node>>,
}

struct LinkedList {
    head: Option<Box<Node>>,
}

impl LinkedList {
    fn insert_at_tail(&mut self, value: i32) {
        let new_node = Box::new(Node { value, next: None });
        match self.head.as_mut() {
            None => self.head = Some(new_node),
            Some(mut current) => {
                while current.next.is_some() {
                    current = current.next.as_mut().unwrap();
                }
                current.next = Some(new_node);
            }
        }
    }

    fn delete_at(&mut self, index: usize) {
        if index == 0 {
            self.head = self.head.take().and_then(|n| n.next);
            return;
        }
        let mut current = self.head.as_mut().unwrap();
        for _ in 0..index - 1 {
            current = current.next.as_mut().unwrap();
        }
        current.next = current.next.take().and_then(|n| n.next);
    }
}`,
    lines: {
      start: [1, 2, 3, 6, 7, 10],
      traverse: [16, 17, 18],
      insert: [14, 19],
      delete: [25, 26, 27, 29, 30, 31, 32],
      'after-delete': [33],
    },
  },
  php: {
    code: `class Node {
    public $value;
    public $next = null;
    public function __construct($value) { $this->value = $value; }
}

class LinkedList {
    public $head = null;

    public function insertAtTail($value) {
        $node = new Node($value);
        if (!$this->head) { $this->head = $node; return; }
        $current = $this->head;
        while ($current->next) $current = $current->next;
        $current->next = $node;
    }

    public function deleteAt($index) {
        if ($index === 0) { $this->head = $this->head->next; return; }
        $current = $this->head;
        for ($i = 0; $i < $index - 1; $i++) $current = $current->next;
        $current->next = $current->next->next;
    }
}`,
    lines: {
      start: [1, 2, 3, 4, 5, 7, 8],
      traverse: [13, 14],
      insert: [12, 15],
      delete: [19, 20, 21],
      'after-delete': [22],
    },
  },
};
