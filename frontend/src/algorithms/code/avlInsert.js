export default {
  python: {
    code: `def height(node):
    return node.height if node else 0

def rotate_right(y):
    x = y.left
    y.left = x.right
    x.right = y
    y.height = 1 + max(height(y.left), height(y.right))
    x.height = 1 + max(height(x.left), height(x.right))
    return x

def rotate_left(x):
    y = x.right
    x.right = y.left
    y.left = x
    x.height = 1 + max(height(x.left), height(x.right))
    y.height = 1 + max(height(y.left), height(y.right))
    return y

def insert(node, value):
    if not node:
        return Node(value)
    if value < node.value:
        node.left = insert(node.left, value)
    elif value > node.value:
        node.right = insert(node.right, value)
    else:
        return node
    node.height = 1 + max(height(node.left), height(node.right))
    balance = height(node.left) - height(node.right)
    if balance > 1 and value < node.left.value:
        return rotate_right(node)
    if balance < -1 and value > node.right.value:
        return rotate_left(node)
    if balance > 1 and value > node.left.value:
        node.left = rotate_left(node.left)
        return rotate_right(node)
    if balance < -1 and value < node.right.value:
        node.right = rotate_right(node.right)
        return rotate_left(node)
    return node`,
    lines: {
      start: [1, 2, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18],
      compare: [21, 22, 23, 24],
      insert: [19, 20],
      'rotate-right': [27, 28],
      'rotate-left': [29, 30],
      'rotate-left-right': [31, 32, 33],
      'rotate-right-left': [34, 35, 36],
      done: [37],
    },
  },
  c: {
    code: `int height(Node* n) { return n ? n->height : 0; }

Node* rotateRight(Node* y) {
    Node* x = y->left;
    y->left = x->right;
    x->right = y;
    y->height = 1 + max(height(y->left), height(y->right));
    x->height = 1 + max(height(x->left), height(x->right));
    return x;
}

Node* rotateLeft(Node* x) {
    Node* y = x->right;
    x->right = y->left;
    y->left = x;
    x->height = 1 + max(height(x->left), height(x->right));
    y->height = 1 + max(height(y->left), height(y->right));
    return y;
}

Node* insert(Node* node, int value) {
    if (!node) return newNode(value);
    if (value < node->value) {
        node->left = insert(node->left, value);
    } else if (value > node->value) {
        node->right = insert(node->right, value);
    } else {
        return node;
    }
    node->height = 1 + max(height(node->left), height(node->right));
    int balance = height(node->left) - height(node->right);
    if (balance > 1 && value < node->left->value) return rotateRight(node);
    if (balance < -1 && value > node->right->value) return rotateLeft(node);
    if (balance > 1 && value > node->left->value) {
        node->left = rotateLeft(node->left);
        return rotateRight(node);
    }
    if (balance < -1 && value < node->right->value) {
        node->right = rotateRight(node->right);
        return rotateLeft(node);
    }
    return node;
}`,
    lines: {
      start: [1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19],
      compare: [23, 24, 25, 26],
      insert: [22],
      'rotate-right': [32],
      'rotate-left': [33],
      'rotate-left-right': [34, 35, 36],
      'rotate-right-left': [38, 39, 40],
      done: [42],
    },
  },
  cpp: {
    code: `int height(Node* n) { return n ? n->height : 0; }

Node* rotateRight(Node* y) {
    Node* x = y->left;
    y->left = x->right;
    x->right = y;
    y->height = 1 + max(height(y->left), height(y->right));
    x->height = 1 + max(height(x->left), height(x->right));
    return x;
}

Node* rotateLeft(Node* x) {
    Node* y = x->right;
    x->right = y->left;
    y->left = x;
    x->height = 1 + max(height(x->left), height(x->right));
    y->height = 1 + max(height(y->left), height(y->right));
    return y;
}

Node* insert(Node* node, int value) {
    if (!node) return new Node(value);
    if (value < node->value) {
        node->left = insert(node->left, value);
    } else if (value > node->value) {
        node->right = insert(node->right, value);
    } else {
        return node;
    }
    node->height = 1 + max(height(node->left), height(node->right));
    int balance = height(node->left) - height(node->right);
    if (balance > 1 && value < node->left->value) return rotateRight(node);
    if (balance < -1 && value > node->right->value) return rotateLeft(node);
    if (balance > 1 && value > node->left->value) {
        node->left = rotateLeft(node->left);
        return rotateRight(node);
    }
    if (balance < -1 && value < node->right->value) {
        node->right = rotateRight(node->right);
        return rotateLeft(node);
    }
    return node;
}`,
    lines: {
      start: [1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19],
      compare: [23, 24, 25, 26],
      insert: [22],
      'rotate-right': [32],
      'rotate-left': [33],
      'rotate-left-right': [34, 35, 36],
      'rotate-right-left': [38, 39, 40],
      done: [42],
    },
  },
  csharp: {
    code: `int Height(Node n) => n != null ? n.Height : 0;

Node RotateRight(Node y) {
    Node x = y.Left;
    y.Left = x.Right;
    x.Right = y;
    y.Height = 1 + Math.Max(Height(y.Left), Height(y.Right));
    x.Height = 1 + Math.Max(Height(x.Left), Height(x.Right));
    return x;
}

Node RotateLeft(Node x) {
    Node y = x.Right;
    x.Right = y.Left;
    y.Left = x;
    x.Height = 1 + Math.Max(Height(x.Left), Height(x.Right));
    y.Height = 1 + Math.Max(Height(y.Left), Height(y.Right));
    return y;
}

Node Insert(Node node, int value) {
    if (node == null) return new Node(value);
    if (value < node.Value) {
        node.Left = Insert(node.Left, value);
    } else if (value > node.Value) {
        node.Right = Insert(node.Right, value);
    } else {
        return node;
    }
    node.Height = 1 + Math.Max(Height(node.Left), Height(node.Right));
    int balance = Height(node.Left) - Height(node.Right);
    if (balance > 1 && value < node.Left.Value) return RotateRight(node);
    if (balance < -1 && value > node.Right.Value) return RotateLeft(node);
    if (balance > 1 && value > node.Left.Value) {
        node.Left = RotateLeft(node.Left);
        return RotateRight(node);
    }
    if (balance < -1 && value < node.Right.Value) {
        node.Right = RotateRight(node.Right);
        return RotateLeft(node);
    }
    return node;
}`,
    lines: {
      start: [1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19],
      compare: [23, 24, 25, 26],
      insert: [22],
      'rotate-right': [32],
      'rotate-left': [33],
      'rotate-left-right': [34, 35, 36],
      'rotate-right-left': [38, 39, 40],
      done: [42],
    },
  },
  java: {
    code: `int height(Node n) { return n != null ? n.height : 0; }

Node rotateRight(Node y) {
    Node x = y.left;
    y.left = x.right;
    x.right = y;
    y.height = 1 + Math.max(height(y.left), height(y.right));
    x.height = 1 + Math.max(height(x.left), height(x.right));
    return x;
}

Node rotateLeft(Node x) {
    Node y = x.right;
    x.right = y.left;
    y.left = x;
    x.height = 1 + Math.max(height(x.left), height(x.right));
    y.height = 1 + Math.max(height(y.left), height(y.right));
    return y;
}

Node insert(Node node, int value) {
    if (node == null) return new Node(value);
    if (value < node.value) {
        node.left = insert(node.left, value);
    } else if (value > node.value) {
        node.right = insert(node.right, value);
    } else {
        return node;
    }
    node.height = 1 + Math.max(height(node.left), height(node.right));
    int balance = height(node.left) - height(node.right);
    if (balance > 1 && value < node.left.value) return rotateRight(node);
    if (balance < -1 && value > node.right.value) return rotateLeft(node);
    if (balance > 1 && value > node.left.value) {
        node.left = rotateLeft(node.left);
        return rotateRight(node);
    }
    if (balance < -1 && value < node.right.value) {
        node.right = rotateRight(node.right);
        return rotateLeft(node);
    }
    return node;
}`,
    lines: {
      start: [1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19],
      compare: [23, 24, 25, 26],
      insert: [22],
      'rotate-right': [32],
      'rotate-left': [33],
      'rotate-left-right': [34, 35, 36],
      'rotate-right-left': [38, 39, 40],
      done: [42],
    },
  },
  kotlin: {
    code: `fun height(n: Node?) = n?.height ?: 0

fun rotateRight(y: Node): Node {
    val x = y.left!!
    y.left = x.right
    x.right = y
    y.height = 1 + maxOf(height(y.left), height(y.right))
    x.height = 1 + maxOf(height(x.left), height(x.right))
    return x
}

fun rotateLeft(x: Node): Node {
    val y = x.right!!
    x.right = y.left
    y.left = x
    x.height = 1 + maxOf(height(x.left), height(x.right))
    y.height = 1 + maxOf(height(y.left), height(y.right))
    return y
}

fun insert(node: Node?, value: Int): Node {
    if (node == null) return Node(value)
    if (value < node.value) {
        node.left = insert(node.left, value)
    } else if (value > node.value) {
        node.right = insert(node.right, value)
    } else {
        return node
    }
    node.height = 1 + maxOf(height(node.left), height(node.right))
    val balance = height(node.left) - height(node.right)
    if (balance > 1 && value < node.left!!.value) return rotateRight(node)
    if (balance < -1 && value > node.right!!.value) return rotateLeft(node)
    if (balance > 1 && value > node.left!!.value) {
        node.left = rotateLeft(node.left!!)
        return rotateRight(node)
    }
    if (balance < -1 && value < node.right!!.value) {
        node.right = rotateRight(node.right!!)
        return rotateLeft(node)
    }
    return node
}`,
    lines: {
      start: [1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19],
      compare: [22, 23, 24, 25],
      insert: [21],
      'rotate-right': [30],
      'rotate-left': [31],
      'rotate-left-right': [32, 33, 34],
      'rotate-right-left': [36, 37, 38],
      done: [40],
    },
  },
  swift: {
    code: `func height(_ n: Node?) -> Int { n?.height ?? 0 }

func rotateRight(_ y: Node) -> Node {
    let x = y.left!
    y.left = x.right
    x.right = y
    y.height = 1 + max(height(y.left), height(y.right))
    x.height = 1 + max(height(x.left), height(x.right))
    return x
}

func rotateLeft(_ x: Node) -> Node {
    let y = x.right!
    x.right = y.left
    y.left = x
    x.height = 1 + max(height(x.left), height(x.right))
    y.height = 1 + max(height(y.left), height(y.right))
    return y
}

func insert(_ node: Node?, _ value: Int) -> Node {
    guard let node = node else { return Node(value) }
    if value < node.value {
        node.left = insert(node.left, value)
    } else if value > node.value {
        node.right = insert(node.right, value)
    } else {
        return node
    }
    node.height = 1 + max(height(node.left), height(node.right))
    let balance = height(node.left) - height(node.right)
    if balance > 1 && value < node.left!.value { return rotateRight(node) }
    if balance < -1 && value > node.right!.value { return rotateLeft(node) }
    if balance > 1 && value > node.left!.value {
        node.left = rotateLeft(node.left!)
        return rotateRight(node)
    }
    if balance < -1 && value < node.right!.value {
        node.right = rotateRight(node.right!)
        return rotateLeft(node)
    }
    return node
}`,
    lines: {
      start: [1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19],
      compare: [22, 23, 24, 25],
      insert: [21],
      'rotate-right': [29],
      'rotate-left': [30],
      'rotate-left-right': [31, 32, 33],
      'rotate-right-left': [35, 36, 37],
      done: [39],
    },
  },
  javascript: {
    code: `function height(n) {
  return n ? n.height : 0;
}

function rotateRight(y) {
  const x = y.left;
  y.left = x.right;
  x.right = y;
  y.height = 1 + Math.max(height(y.left), height(y.right));
  x.height = 1 + Math.max(height(x.left), height(x.right));
  return x;
}

function rotateLeft(x) {
  const y = x.right;
  x.right = y.left;
  y.left = x;
  x.height = 1 + Math.max(height(x.left), height(x.right));
  y.height = 1 + Math.max(height(y.left), height(y.right));
  return y;
}

function insert(node, value) {
  if (!node) return new Node(value);
  if (value < node.value) {
    node.left = insert(node.left, value);
  } else if (value > node.value) {
    node.right = insert(node.right, value);
  } else {
    return node;
  }
  node.height = 1 + Math.max(height(node.left), height(node.right));
  const balance = height(node.left) - height(node.right);
  if (balance > 1 && value < node.left.value) return rotateRight(node);
  if (balance < -1 && value > node.right.value) return rotateLeft(node);
  if (balance > 1 && value > node.left.value) {
    node.left = rotateLeft(node.left);
    return rotateRight(node);
  }
  if (balance < -1 && value < node.right.value) {
    node.right = rotateRight(node.right);
    return rotateLeft(node);
  }
  return node;
}`,
    lines: {
      start: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20],
      compare: [24, 25, 26, 27],
      insert: [23],
      'rotate-right': [33],
      'rotate-left': [34],
      'rotate-left-right': [35, 36, 37],
      'rotate-right-left': [39, 40, 41],
      done: [43],
    },
  },
  typescript: {
    code: `function height(n: Node | null): number {
  return n ? n.height : 0;
}

function rotateRight(y: Node): Node {
  const x = y.left!;
  y.left = x.right;
  x.right = y;
  y.height = 1 + Math.max(height(y.left), height(y.right));
  x.height = 1 + Math.max(height(x.left), height(x.right));
  return x;
}

function rotateLeft(x: Node): Node {
  const y = x.right!;
  x.right = y.left;
  y.left = x;
  x.height = 1 + Math.max(height(x.left), height(x.right));
  y.height = 1 + Math.max(height(y.left), height(y.right));
  return y;
}

function insert(node: Node | null, value: number): Node {
  if (!node) return new Node(value);
  if (value < node.value) {
    node.left = insert(node.left, value);
  } else if (value > node.value) {
    node.right = insert(node.right, value);
  } else {
    return node;
  }
  node.height = 1 + Math.max(height(node.left), height(node.right));
  const balance = height(node.left) - height(node.right);
  if (balance > 1 && value < node.left!.value) return rotateRight(node);
  if (balance < -1 && value > node.right!.value) return rotateLeft(node);
  if (balance > 1 && value > node.left!.value) {
    node.left = rotateLeft(node.left!);
    return rotateRight(node);
  }
  if (balance < -1 && value < node.right!.value) {
    node.right = rotateRight(node.right!);
    return rotateLeft(node);
  }
  return node;
}`,
    lines: {
      start: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20],
      compare: [24, 25, 26, 27],
      insert: [23],
      'rotate-right': [33],
      'rotate-left': [34],
      'rotate-left-right': [35, 36, 37],
      'rotate-right-left': [39, 40, 41],
      done: [43],
    },
  },
  go: {
    code: `func height(n *Node) int {
    if n == nil {
        return 0
    }
    return n.Height
}

func rotateRight(y *Node) *Node {
    x := y.Left
    y.Left = x.Right
    x.Right = y
    y.Height = 1 + max(height(y.Left), height(y.Right))
    x.Height = 1 + max(height(x.Left), height(x.Right))
    return x
}

func rotateLeft(x *Node) *Node {
    y := x.Right
    x.Right = y.Left
    y.Left = x
    x.Height = 1 + max(height(x.Left), height(x.Right))
    y.Height = 1 + max(height(y.Left), height(y.Right))
    return y
}

func insert(node *Node, value int) *Node {
    if node == nil {
        return &Node{Value: value, Height: 1}
    }
    if value < node.Value {
        node.Left = insert(node.Left, value)
    } else if value > node.Value {
        node.Right = insert(node.Right, value)
    } else {
        return node
    }
    node.Height = 1 + max(height(node.Left), height(node.Right))
    balance := height(node.Left) - height(node.Right)
    if balance > 1 && value < node.Left.Value {
        return rotateRight(node)
    }
    if balance < -1 && value > node.Right.Value {
        return rotateLeft(node)
    }
    if balance > 1 && value > node.Left.Value {
        node.Left = rotateLeft(node.Left)
        return rotateRight(node)
    }
    if balance < -1 && value < node.Right.Value {
        node.Right = rotateRight(node.Right)
        return rotateLeft(node)
    }
    return node
}`,
    lines: {
      start: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21],
      compare: [28, 29, 30, 31],
      insert: [24, 25, 26],
      'rotate-right': [36, 37, 38],
      'rotate-left': [39, 40, 41],
      'rotate-left-right': [42, 43, 44, 45],
      'rotate-right-left': [46, 47, 48, 49],
      done: [51],
    },
  },
  rust: {
    code: `fn height(n: &Option<Box<Node>>) -> i32 {
    n.as_ref().map_or(0, |x| x.height)
}

fn rotate_right(mut y: Box<Node>) -> Box<Node> {
    let mut x = y.left.take().unwrap();
    y.left = x.right.take();
    y.height = 1 + height(&y.left).max(height(&y.right));
    x.right = Some(y);
    x.height = 1 + height(&x.left).max(height(&x.right));
    x
}

fn rotate_left(mut x: Box<Node>) -> Box<Node> {
    let mut y = x.right.take().unwrap();
    x.right = y.left.take();
    x.height = 1 + height(&x.left).max(height(&x.right));
    y.left = Some(x);
    y.height = 1 + height(&y.left).max(height(&y.right));
    y
}

fn insert(node: Option<Box<Node>>, value: i32) -> Box<Node> {
    let mut node = match node {
        None => return Box::new(Node::new(value)),
        Some(n) => n,
    };
    if value < node.value {
        node.left = Some(insert(node.left.take(), value));
    } else if value > node.value {
        node.right = Some(insert(node.right.take(), value));
    } else {
        return node;
    }
    node.height = 1 + height(&node.left).max(height(&node.right));
    let balance = height(&node.left) - height(&node.right);
    if balance > 1 && value < node.left.as_ref().unwrap().value {
        return rotate_right(node);
    }
    if balance < -1 && value > node.right.as_ref().unwrap().value {
        return rotate_left(node);
    }
    if balance > 1 && value > node.left.as_ref().unwrap().value {
        node.left = Some(rotate_left(node.left.take().unwrap()));
        return rotate_right(node);
    }
    if balance < -1 && value < node.right.as_ref().unwrap().value {
        node.right = Some(rotate_right(node.right.take().unwrap()));
        return rotate_left(node);
    }
    node
}`,
    lines: {
      start: [1, 2, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 18],
      compare: [25, 26, 27, 28],
      insert: [21, 22, 23, 24],
      'rotate-right': [33, 34],
      'rotate-left': [35, 36],
      'rotate-left-right': [37, 38, 39],
      'rotate-right-left': [40, 41, 42],
      done: [44],
    },
  },
  php: {
    code: `function height($n) {
    return $n ? $n->height : 0;
}

function rotateRight($y) {
    $x = $y->left;
    $y->left = $x->right;
    $x->right = $y;
    $y->height = 1 + max(height($y->left), height($y->right));
    $x->height = 1 + max(height($x->left), height($x->right));
    return $x;
}

function rotateLeft($x) {
    $y = $x->right;
    $x->right = $y->left;
    $y->left = $x;
    $x->height = 1 + max(height($x->left), height($x->right));
    $y->height = 1 + max(height($y->left), height($y->right));
    return $y;
}

function insert($node, $value) {
    if (!$node) return new Node($value);
    if ($value < $node->value) {
        $node->left = insert($node->left, $value);
    } elseif ($value > $node->value) {
        $node->right = insert($node->right, $value);
    } else {
        return $node;
    }
    $node->height = 1 + max(height($node->left), height($node->right));
    $balance = height($node->left) - height($node->right);
    if ($balance > 1 && $value < $node->left->value) return rotateRight($node);
    if ($balance < -1 && $value > $node->right->value) return rotateLeft($node);
    if ($balance > 1 && $value > $node->left->value) {
        $node->left = rotateLeft($node->left);
        return rotateRight($node);
    }
    if ($balance < -1 && $value < $node->right->value) {
        $node->right = rotateRight($node->right);
        return rotateLeft($node);
    }
    return $node;
}`,
    lines: {
      start: [1, 2, 5, 6, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20],
      compare: [24, 25, 26, 27],
      insert: [23],
      'rotate-right': [33],
      'rotate-left': [34],
      'rotate-left-right': [35, 36, 37],
      'rotate-right-left': [39, 40, 41],
      done: [43],
    },
  },
};
