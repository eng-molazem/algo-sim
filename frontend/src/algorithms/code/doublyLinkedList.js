export default {
  python: {
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def insert(self, value):
        node = Node(value)
        if not self.head:
            self.head = self.tail = node
            return
        node.prev = self.tail
        self.tail.next = node
        self.tail = node

    def traverse_forward(self):
        current = self.head
        while current:
            current = current.next

    def traverse_backward(self):
        current = self.tail
        while current:
            current = current.prev

    def delete_at(self, index):
        current = self.head
        for _ in range(index):
            current = current.next
        if current.prev:
            current.prev.next = current.next
        if current.next:
            current.next.prev = current.prev`,
    lines: {
      start: [1, 2, 3, 4, 5, 7, 8, 9, 10],
      insert: [12, 13, 14, 15, 16, 17, 18, 19],
      'traverse-forward': [21, 22, 23, 24],
      'traverse-backward': [26, 27, 28, 29],
      delete: [31, 32, 33, 34, 35, 36, 37],
      'after-delete': [37],
    },
  },
  c: {
    code: `typedef struct Node {
    int value;
    struct Node* prev;
    struct Node* next;
} Node;

void insertTail(Node** head, Node** tail, int value) {
    Node* node = malloc(sizeof(Node));
    node->value = value;
    node->next = NULL;
    node->prev = *tail;
    if (*tail) (*tail)->next = node; else *head = node;
    *tail = node;
}

void traverseForward(Node* head) {
    for (Node* cur = head; cur != NULL; cur = cur->next) {}
}

void traverseBackward(Node* tail) {
    for (Node* cur = tail; cur != NULL; cur = cur->prev) {}
}

void deleteNode(Node* node) {
    if (node->prev) node->prev->next = node->next;
    if (node->next) node->next->prev = node->prev;
}`,
    lines: {
      start: [1, 2, 3, 4, 5],
      insert: [7, 8, 9, 10, 11, 12, 13],
      'traverse-forward': [16, 17, 18],
      'traverse-backward': [20, 21, 22],
      delete: [24, 25, 26, 27],
      'after-delete': [27],
    },
  },
  cpp: {
    code: `struct Node {
    int value;
    Node* prev = nullptr;
    Node* next = nullptr;
};

void insertTail(Node*& head, Node*& tail, int value) {
    Node* node = new Node{value};
    node->prev = tail;
    if (tail) tail->next = node; else head = node;
    tail = node;
}

void traverseForward(Node* head) {
    for (Node* cur = head; cur; cur = cur->next) {}
}

void traverseBackward(Node* tail) {
    for (Node* cur = tail; cur; cur = cur->prev) {}
}

void deleteNode(Node* node) {
    if (node->prev) node->prev->next = node->next;
    if (node->next) node->next->prev = node->prev;
}`,
    lines: {
      start: [1, 2, 3, 4],
      insert: [6, 7, 8, 9, 10, 11],
      'traverse-forward': [13, 14, 15],
      'traverse-backward': [17, 18, 19],
      delete: [21, 22, 23, 24],
      'after-delete': [24],
    },
  },
  csharp: {
    code: `class Node {
    public int Value;
    public Node Prev;
    public Node Next;
}

void InsertTail(ref Node head, ref Node tail, int value) {
    var node = new Node { Value = value, Prev = tail };
    if (tail != null) tail.Next = node; else head = node;
    tail = node;
}

void TraverseForward(Node head) {
    for (var cur = head; cur != null; cur = cur.Next) { }
}

void TraverseBackward(Node tail) {
    for (var cur = tail; cur != null; cur = cur.Prev) { }
}

void DeleteNode(Node node) {
    if (node.Prev != null) node.Prev.Next = node.Next;
    if (node.Next != null) node.Next.Prev = node.Prev;
}`,
    lines: {
      start: [1, 2, 3, 4],
      insert: [6, 7, 8, 9, 10],
      'traverse-forward': [12, 13, 14],
      'traverse-backward': [16, 17, 18],
      delete: [20, 21, 22, 23],
      'after-delete': [23],
    },
  },
  java: {
    code: `class Node {
    int value;
    Node prev;
    Node next;
    Node(int value) { this.value = value; }
}

void insertTail(Node head, Node tail, int value) {
    Node node = new Node(value);
    node.prev = tail;
    if (tail != null) tail.next = node; else head = node;
    tail = node;
}

void traverseForward(Node head) {
    for (Node cur = head; cur != null; cur = cur.next) { }
}

void traverseBackward(Node tail) {
    for (Node cur = tail; cur != null; cur = cur.prev) { }
}

void deleteNode(Node node) {
    if (node.prev != null) node.prev.next = node.next;
    if (node.next != null) node.next.prev = node.prev;
}`,
    lines: {
      start: [1, 2, 3, 4, 5],
      insert: [7, 8, 9, 10, 11, 12],
      'traverse-forward': [14, 15, 16],
      'traverse-backward': [18, 19, 20],
      delete: [22, 23, 24, 25],
      'after-delete': [25],
    },
  },
  kotlin: {
    code: `class Node(val value: Int) {
    var prev: Node? = null
    var next: Node? = null
}

fun insertTail(tail: Node?, value: Int): Node {
    val node = Node(value)
    node.prev = tail
    tail?.next = node
    return node
}

fun traverseForward(head: Node?) {
    var cur = head
    while (cur != null) cur = cur.next
}

fun traverseBackward(tail: Node?) {
    var cur = tail
    while (cur != null) cur = cur.prev
}

fun deleteNode(node: Node) {
    node.prev?.next = node.next
    node.next?.prev = node.prev
}`,
    lines: {
      start: [1, 2, 3],
      insert: [6, 7, 8, 9, 10],
      'traverse-forward': [13, 14, 15],
      'traverse-backward': [18, 19, 20],
      delete: [23, 24, 25],
      'after-delete': [25],
    },
  },
  swift: {
    code: `class Node {
    var value: Int
    weak var prev: Node?
    var next: Node?
    init(_ value: Int) { self.value = value }
}

func insertTail(head: inout Node?, tail: inout Node?, value: Int) {
    let node = Node(value)
    node.prev = tail
    if tail != nil { tail?.next = node } else { head = node }
    tail = node
}

func traverseForward(_ head: Node?) {
    var cur = head
    while cur != nil { cur = cur?.next }
}

func traverseBackward(_ tail: Node?) {
    var cur = tail
    while cur != nil { cur = cur?.prev }
}

func deleteNode(_ node: Node) {
    node.prev?.next = node.next
    node.next?.prev = node.prev
}`,
    lines: {
      start: [1, 2, 3, 4, 5],
      insert: [8, 9, 10, 11, 12],
      'traverse-forward': [15, 16, 17],
      'traverse-backward': [20, 21, 22],
      delete: [25, 26, 27],
      'after-delete': [27],
    },
  },
  javascript: {
    code: `class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

function insertTail(list, value) {
  const node = new Node(value);
  node.prev = list.tail;
  if (list.tail) list.tail.next = node; else list.head = node;
  list.tail = node;
}

function traverseForward(head) {
  for (let cur = head; cur; cur = cur.next) {}
}

function traverseBackward(tail) {
  for (let cur = tail; cur; cur = cur.prev) {}
}

function deleteNode(node) {
  if (node.prev) node.prev.next = node.next;
  if (node.next) node.next.prev = node.prev;
}`,
    lines: {
      start: [1, 2, 3, 4, 5, 6],
      insert: [9, 10, 11, 12, 13],
      'traverse-forward': [16, 17, 18],
      'traverse-backward': [21, 22, 23],
      delete: [26, 27, 28],
      'after-delete': [28],
    },
  },
  typescript: {
    code: `class Node {
  value: number;
  prev: Node | null = null;
  next: Node | null = null;
  constructor(value: number) { this.value = value; }
}

function insertTail(list: { head: Node | null; tail: Node | null }, value: number) {
  const node = new Node(value);
  node.prev = list.tail;
  if (list.tail) list.tail.next = node; else list.head = node;
  list.tail = node;
}

function traverseForward(head: Node | null) {
  for (let cur = head; cur; cur = cur.next) {}
}

function traverseBackward(tail: Node | null) {
  for (let cur = tail; cur; cur = cur.prev) {}
}

function deleteNode(node: Node) {
  if (node.prev) node.prev.next = node.next;
  if (node.next) node.next.prev = node.prev;
}`,
    lines: {
      start: [1, 2, 3, 4, 5],
      insert: [8, 9, 10, 11, 12],
      'traverse-forward': [15, 16, 17],
      'traverse-backward': [20, 21, 22],
      delete: [25, 26, 27],
      'after-delete': [27],
    },
  },
  go: {
    code: `type Node struct {
    Value      int
    Prev, Next *Node
}

func insertTail(tail *Node, value int) *Node {
    node := &Node{Value: value, Prev: tail}
    if tail != nil {
        tail.Next = node
    }
    return node
}

func traverseForward(head *Node) {
    for cur := head; cur != nil; cur = cur.Next {
    }
}

func traverseBackward(tail *Node) {
    for cur := tail; cur != nil; cur = cur.Prev {
    }
}

func deleteNode(node *Node) {
    if node.Prev != nil {
        node.Prev.Next = node.Next
    }
    if node.Next != nil {
        node.Next.Prev = node.Prev
    }
}`,
    lines: {
      start: [1, 2, 3],
      insert: [6, 7, 8, 9, 10, 11, 12],
      'traverse-forward': [15, 16, 17],
      'traverse-backward': [20, 21, 22],
      delete: [25, 26, 27, 28, 29, 30],
      'after-delete': [30],
    },
  },
  rust: {
    code: `struct Node {
    value: i32,
    prev: Option<usize>,
    next: Option<usize>,
}

fn insert_tail(nodes: &mut Vec<Node>, tail: Option<usize>, value: i32) -> usize {
    let node = Node { value, prev: tail, next: None };
    nodes.push(node);
    let idx = nodes.len() - 1;
    if let Some(t) = tail { nodes[t].next = Some(idx); }
    idx
}

fn traverse_forward(nodes: &Vec<Node>, mut cur: Option<usize>) {
    while let Some(i) = cur { cur = nodes[i].next; }
}

fn traverse_backward(nodes: &Vec<Node>, mut cur: Option<usize>) {
    while let Some(i) = cur { cur = nodes[i].prev; }
}

fn delete_node(nodes: &mut Vec<Node>, idx: usize) {
    let (prev, next) = (nodes[idx].prev, nodes[idx].next);
    if let Some(p) = prev { nodes[p].next = next; }
    if let Some(n) = next { nodes[n].prev = prev; }
}`,
    lines: {
      start: [1, 2, 3, 4],
      insert: [7, 8, 9, 10, 11, 12],
      'traverse-forward': [15, 16, 17],
      'traverse-backward': [19, 20, 21],
      delete: [23, 24, 25, 26, 27],
      'after-delete': [27],
    },
  },
  php: {
    code: `class Node {
    public $value;
    public $prev = null;
    public $next = null;
    public function __construct($value) { $this->value = $value; }
}

function insertTail(&$tail, $value) {
    $node = new Node($value);
    $node->prev = $tail;
    if ($tail !== null) $tail->next = $node;
    return $tail = $node;
}

function traverseForward($head) {
    for ($cur = $head; $cur !== null; $cur = $cur->next) { }
}

function traverseBackward($tail) {
    for ($cur = $tail; $cur !== null; $cur = $cur->prev) { }
}

function deleteNode($node) {
    if ($node->prev !== null) $node->prev->next = $node->next;
    if ($node->next !== null) $node->next->prev = $node->prev;
}`,
    lines: {
      start: [1, 2, 3, 4, 5],
      insert: [8, 9, 10, 11, 12],
      'traverse-forward': [15, 16, 17],
      'traverse-backward': [20, 21, 22],
      delete: [25, 26, 27],
      'after-delete': [27],
    },
  },
};
