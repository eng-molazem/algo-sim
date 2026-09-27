export default {
  python: {
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class CircularLinkedList:
    def __init__(self):
        self.tail = None

    def insert(self, value):
        node = Node(value)
        if not self.tail:
            node.next = node
            self.tail = node
            return
        node.next = self.tail.next
        self.tail.next = node
        self.tail = node

    def traverse_one_lap(self):
        if not self.tail:
            return
        current = self.tail.next
        while True:
            current = current.next
            if current == self.tail.next:
                break

    def delete_at(self, index):
        prev = self.tail
        current = self.tail.next
        for _ in range(index):
            prev = current
            current = current.next
        prev.next = current.next
        if current == self.tail:
            self.tail = prev`,
    lines: {
      start: [1, 2, 3, 4, 6, 7, 8],
      insert: [10, 11, 12, 13, 14, 15, 16, 17, 18],
      traverse: [22, 23, 24],
      wrap: [25, 26],
      delete: [29, 30, 31, 32, 33, 34, 35, 36, 37],
      'after-delete': [37],
    },
  },
  c: {
    code: `typedef struct Node {
    int value;
    struct Node* next;
} Node;

Node* insertTail(Node* tail, int value) {
    Node* node = malloc(sizeof(Node));
    node->value = value;
    if (!tail) { node->next = node; return node; }
    node->next = tail->next;
    tail->next = node;
    return node;
}

void traverseOneLap(Node* tail) {
    Node* start = tail->next;
    Node* cur = start;
    do {
        cur = cur->next;
    } while (cur != start);
}

void deleteNode(Node* tail, Node* prev, Node* node) {
    prev->next = node->next;
}`,
    lines: {
      start: [1, 2, 3],
      insert: [6, 7, 8, 9, 10, 11, 12],
      traverse: [16, 17, 18, 19],
      wrap: [20],
      delete: [23, 24],
      'after-delete': [24],
    },
  },
  cpp: {
    code: `struct Node {
    int value;
    Node* next = nullptr;
};

Node* insertTail(Node* tail, int value) {
    Node* node = new Node{value};
    if (!tail) { node->next = node; return node; }
    node->next = tail->next;
    tail->next = node;
    return node;
}

void traverseOneLap(Node* tail) {
    Node* start = tail->next;
    Node* cur = start;
    do {
        cur = cur->next;
    } while (cur != start);
}

void deleteNode(Node* prev, Node* node) {
    prev->next = node->next;
}`,
    lines: {
      start: [1, 2, 3],
      insert: [5, 6, 7, 8, 9, 10, 11],
      traverse: [14, 15, 16, 17],
      wrap: [18],
      delete: [21, 22],
      'after-delete': [22],
    },
  },
  csharp: {
    code: `class Node {
    public int Value;
    public Node Next;
}

Node InsertTail(Node tail, int value) {
    var node = new Node { Value = value };
    if (tail == null) { node.Next = node; return node; }
    node.Next = tail.Next;
    tail.Next = node;
    return node;
}

void TraverseOneLap(Node tail) {
    var start = tail.Next;
    var cur = start;
    do {
        cur = cur.Next;
    } while (cur != start);
}

void DeleteNode(Node prev, Node node) {
    prev.Next = node.Next;
}`,
    lines: {
      start: [1, 2, 3],
      insert: [6, 7, 8, 9, 10, 11],
      traverse: [14, 15, 16, 17],
      wrap: [18],
      delete: [21, 22],
      'after-delete': [22],
    },
  },
  java: {
    code: `class Node {
    int value;
    Node next;
    Node(int value) { this.value = value; }
}

Node insertTail(Node tail, int value) {
    Node node = new Node(value);
    if (tail == null) { node.next = node; return node; }
    node.next = tail.next;
    tail.next = node;
    return node;
}

void traverseOneLap(Node tail) {
    Node start = tail.next;
    Node cur = start;
    do {
        cur = cur.next;
    } while (cur != start);
}

void deleteNode(Node prev, Node node) {
    prev.next = node.next;
}`,
    lines: {
      start: [1, 2, 3, 4],
      insert: [7, 8, 9, 10, 11, 12],
      'traverse': [15, 16, 17, 18],
      wrap: [19],
      delete: [22, 23],
      'after-delete': [23],
    },
  },
  kotlin: {
    code: `class Node(val value: Int) {
    var next: Node? = null
}

fun insertTail(tail: Node?, value: Int): Node {
    val node = Node(value)
    if (tail == null) { node.next = node; return node }
    node.next = tail.next
    tail.next = node
    return node
}

fun traverseOneLap(tail: Node) {
    val start = tail.next
    var cur = start
    do {
        cur = cur?.next
    } while (cur != start)
}

fun deleteNode(prev: Node, node: Node) {
    prev.next = node.next
}`,
    lines: {
      start: [1, 2],
      insert: [5, 6, 7, 8, 9, 10],
      traverse: [13, 14, 15, 16],
      wrap: [17],
      delete: [20, 21],
      'after-delete': [21],
    },
  },
  swift: {
    code: `class Node {
    var value: Int
    var next: Node?
    init(_ value: Int) { self.value = value }
}

func insertTail(_ tail: Node?, _ value: Int) -> Node {
    let node = Node(value)
    if tail == nil { node.next = node; return node }
    node.next = tail?.next
    tail?.next = node
    return node
}

func traverseOneLap(_ tail: Node) {
    let start = tail.next
    var cur = start
    repeat {
        cur = cur?.next
    } while cur !== start
}

func deleteNode(_ prev: Node, _ node: Node) {
    prev.next = node.next
}`,
    lines: {
      start: [1, 2, 3, 4],
      insert: [7, 8, 9, 10, 11, 12],
      traverse: [15, 16, 17, 18],
      wrap: [19],
      delete: [22, 23],
      'after-delete': [23],
    },
  },
  javascript: {
    code: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function insertTail(tail, value) {
  const node = new Node(value);
  if (!tail) { node.next = node; return node; }
  node.next = tail.next;
  tail.next = node;
  return node;
}

function traverseOneLap(tail) {
  const start = tail.next;
  let cur = start;
  do {
    cur = cur.next;
  } while (cur !== start);
}

function deleteNode(prev, node) {
  prev.next = node.next;
}`,
    lines: {
      start: [1, 2, 3, 4, 5],
      insert: [8, 9, 10, 11, 12, 13],
      traverse: [16, 17, 18, 19],
      wrap: [20],
      delete: [23, 24],
      'after-delete': [24],
    },
  },
  typescript: {
    code: `class Node {
  value: number;
  next: Node | null = null;
  constructor(value: number) { this.value = value; }
}

function insertTail(tail: Node | null, value: number): Node {
  const node = new Node(value);
  if (!tail) { node.next = node; return node; }
  node.next = tail.next;
  tail.next = node;
  return node;
}

function traverseOneLap(tail: Node) {
  const start = tail.next;
  let cur = start;
  do {
    cur = cur!.next;
  } while (cur !== start);
}

function deleteNode(prev: Node, node: Node) {
  prev.next = node.next;
}`,
    lines: {
      start: [1, 2, 3, 4],
      insert: [7, 8, 9, 10, 11, 12],
      traverse: [15, 16, 17, 18],
      wrap: [19],
      delete: [22, 23],
      'after-delete': [23],
    },
  },
  go: {
    code: `type Node struct {
    Value int
    Next  *Node
}

func insertTail(tail *Node, value int) *Node {
    node := &Node{Value: value}
    if tail == nil {
        node.Next = node
        return node
    }
    node.Next = tail.Next
    tail.Next = node
    return node
}

func traverseOneLap(tail *Node) {
    start := tail.Next
    cur := start
    for {
        cur = cur.Next
        if cur == start {
            break
        }
    }
}

func deleteNode(prev *Node, node *Node) {
    prev.Next = node.Next
}`,
    lines: {
      start: [1, 2, 3],
      insert: [6, 7, 8, 9, 10, 11, 12, 13, 14],
      traverse: [18, 19, 20, 21],
      wrap: [22, 23],
      delete: [28, 29],
      'after-delete': [29],
    },
  },
  rust: {
    code: `struct Node {
    value: i32,
    next: usize,
}

fn insert_tail(nodes: &mut Vec<Node>, tail: Option<usize>, value: i32) -> usize {
    let idx = nodes.len();
    match tail {
        None => nodes.push(Node { value, next: idx }),
        Some(t) => {
            nodes.push(Node { value, next: nodes[t].next });
            nodes[t].next = idx;
        }
    }
    idx
}

fn traverse_one_lap(nodes: &Vec<Node>, tail: usize) {
    let start = nodes[tail].next;
    let mut cur = start;
    loop {
        cur = nodes[cur].next;
        if cur == start { break; }
    }
}

fn delete_node(nodes: &mut Vec<Node>, prev: usize, node: usize) {
    nodes[prev].next = nodes[node].next;
}`,
    lines: {
      start: [1, 2, 3],
      insert: [6, 7, 8, 9, 10, 11, 12, 13, 15],
      traverse: [19, 20, 21, 22],
      wrap: [23],
      delete: [27],
      'after-delete': [27],
    },
  },
  php: {
    code: `class Node {
    public $value;
    public $next = null;
    public function __construct($value) { $this->value = $value; }
}

function insertTail($tail, $value) {
    $node = new Node($value);
    if ($tail === null) { $node->next = $node; return $node; }
    $node->next = $tail->next;
    $tail->next = $node;
    return $node;
}

function traverseOneLap($tail) {
    $start = $tail->next;
    $cur = $start;
    do {
        $cur = $cur->next;
    } while ($cur !== $start);
}

function deleteNode($prev, $node) {
    $prev->next = $node->next;
}`,
    lines: {
      start: [1, 2, 3, 4],
      insert: [7, 8, 9, 10, 11, 12],
      traverse: [15, 16, 17, 18],
      wrap: [19],
      delete: [22, 23],
      'after-delete': [23],
    },
  },
};
