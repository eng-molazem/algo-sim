export default {
  python: {
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
    else:
        pass  # value already exists
    return root`,
    lines: {
      start: [1, 2, 3, 4, 5],
      compare: [10, 12],
      insert: [8, 9, 11, 13],
      duplicate: [14, 15],
      done: [16],
    },
  },
  c: {
    code: `typedef struct Node {
    int value;
    struct Node* left;
    struct Node* right;
} Node;

Node* newNode(int value) {
    Node* node = malloc(sizeof(Node));
    node->value = value;
    node->left = node->right = NULL;
    return node;
}

Node* insert(Node* root, int value) {
    if (root == NULL) return newNode(value);
    if (value < root->value) {
        root->left = insert(root->left, value);
    } else if (value > root->value) {
        root->right = insert(root->right, value);
    }
    return root;
}`,
    lines: { start: [1, 2, 3, 4, 5, 7], compare: [16, 18], insert: [15, 17, 19], duplicate: [20], done: [21] },
  },
  cpp: {
    code: `struct Node {
    int value;
    Node* left;
    Node* right;
    Node(int v) : value(v), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int value) {
    if (root == nullptr) return new Node(value);
    if (value < root->value) {
        root->left = insert(root->left, value);
    } else if (value > root->value) {
        root->right = insert(root->right, value);
    }
    return root;
}`,
    lines: { start: [1, 2, 3, 4, 5, 6], compare: [10, 12], insert: [9, 11, 13], duplicate: [14], done: [15] },
  },
  csharp: {
    code: `class Node {
    public int Value;
    public Node Left, Right;
    public Node(int value) { Value = value; }
}

Node Insert(Node root, int value) {
    if (root == null) return new Node(value);
    if (value < root.Value) {
        root.Left = Insert(root.Left, value);
    } else if (value > root.Value) {
        root.Right = Insert(root.Right, value);
    }
    return root;
}`,
    lines: { start: [1, 2, 3, 4, 5], compare: [9, 11], insert: [8, 10, 12], duplicate: [13], done: [14] },
  },
  java: {
    code: `class Node {
    int value;
    Node left, right;
    Node(int value) { this.value = value; }
}

Node insert(Node root, int value) {
    if (root == null) return new Node(value);
    if (value < root.value) {
        root.left = insert(root.left, value);
    } else if (value > root.value) {
        root.right = insert(root.right, value);
    }
    return root;
}`,
    lines: { start: [1, 2, 3, 4, 5], compare: [9, 11], insert: [8, 10, 12], duplicate: [13], done: [14] },
  },
  kotlin: {
    code: `class Node(var value: Int, var left: Node? = null, var right: Node? = null)

fun insert(root: Node?, value: Int): Node {
    if (root == null) return Node(value)
    if (value < root.value) {
        root.left = insert(root.left, value)
    } else if (value > root.value) {
        root.right = insert(root.right, value)
    }
    return root
}`,
    lines: { start: [1, 3], compare: [5, 7], insert: [4, 6, 8], duplicate: [9], done: [10] },
  },
  swift: {
    code: `class Node {
    var value: Int
    var left: Node?
    var right: Node?
    init(_ value: Int) { self.value = value }
}

func insert(_ root: Node?, _ value: Int) -> Node {
    guard let root = root else { return Node(value) }
    if value < root.value {
        root.left = insert(root.left, value)
    } else if value > root.value {
        root.right = insert(root.right, value)
    }
    return root
}`,
    lines: { start: [1, 2, 3, 4, 5, 8], compare: [10, 12], insert: [9, 11, 13], duplicate: [14], done: [15] },
  },
  javascript: {
    code: `class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insert(root, value) {
  if (!root) return new Node(value);
  if (value < root.value) {
    root.left = insert(root.left, value);
  } else if (value > root.value) {
    root.right = insert(root.right, value);
  }
  return root;
}`,
    lines: { start: [1, 2, 3, 4, 5, 6, 7], compare: [11, 13], insert: [10, 12, 14], duplicate: [15], done: [16] },
  },
  typescript: {
    code: `class Node {
  value: number;
  left: Node | null = null;
  right: Node | null = null;
  constructor(value: number) {
    this.value = value;
  }
}

function insert(root: Node | null, value: number): Node {
  if (!root) return new Node(value);
  if (value < root.value) {
    root.left = insert(root.left, value);
  } else if (value > root.value) {
    root.right = insert(root.right, value);
  }
  return root;
}`,
    lines: { start: [1, 2, 3, 4, 5, 6, 7], compare: [11, 13], insert: [10, 12, 14], duplicate: [15], done: [16] },
  },
  go: {
    code: `type Node struct {
    value       int
    left, right *Node
}

func insert(root *Node, value int) *Node {
    if root == nil {
        return &Node{value: value}
    }
    if value < root.value {
        root.left = insert(root.left, value)
    } else if value > root.value {
        root.right = insert(root.right, value)
    }
    return root
}`,
    lines: { start: [1, 2, 3, 6], compare: [10, 12], insert: [7, 8, 11, 13], duplicate: [14], done: [15] },
  },
  rust: {
    code: `struct Node {
    value: i32,
    left: Option<Box<Node>>,
    right: Option<Box<Node>>,
}

impl Node {
    fn insert(node: Option<Box<Node>>, value: i32) -> Box<Node> {
        match node {
            None => Box::new(Node { value, left: None, right: None }),
            Some(mut n) => {
                if value < n.value {
                    n.left = Some(Node::insert(n.left, value));
                } else if value > n.value {
                    n.right = Some(Node::insert(n.right, value));
                }
                n
            }
        }
    }
}`,
    lines: { start: [1, 2, 3, 4, 5, 7, 8], compare: [12, 14], insert: [10, 13, 15], duplicate: [16], done: [17] },
  },
  php: {
    code: `class Node {
    public $value;
    public $left = null;
    public $right = null;
    public function __construct($value) { $this->value = $value; }
}

function insert($root, $value) {
    if ($root === null) return new Node($value);
    if ($value < $root->value) {
        $root->left = insert($root->left, $value);
    } elseif ($value > $root->value) {
        $root->right = insert($root->right, $value);
    }
    return $root;
}`,
    lines: { start: [1, 2, 3, 4, 5, 8], compare: [10, 12], insert: [9, 11, 13], duplicate: [14], done: [15] },
  },
};
