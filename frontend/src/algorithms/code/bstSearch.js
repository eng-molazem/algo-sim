const COMMON_LINES = { start: [1, 2], compare: [3, 4], found: [5], 'not-found': [12] };

export default {
  python: {
    code: `def search(root, target):
    current = root
    while current is not None:
        if target == current.value:
            return True
        elif target < current.value:
            current = current.left
        else:
            current = current.right
    return False`,
    lines: { start: [1, 2], compare: [3, 4], found: [5], 'not-found': [10] },
  },
  c: {
    code: `int search(Node* root, int target) {
    Node* current = root;
    while (current != NULL) {
        if (target == current->value) {
            return 1;
        } else if (target < current->value) {
            current = current->left;
        } else {
            current = current->right;
        }
    }
    return 0;
}`,
    lines: COMMON_LINES,
  },
  cpp: {
    code: `bool search(Node* root, int target) {
    Node* current = root;
    while (current != nullptr) {
        if (target == current->value) {
            return true;
        } else if (target < current->value) {
            current = current->left;
        } else {
            current = current->right;
        }
    }
    return false;
}`,
    lines: COMMON_LINES,
  },
  csharp: {
    code: `bool Search(Node root, int target) {
    Node current = root;
    while (current != null) {
        if (target == current.Value) {
            return true;
        } else if (target < current.Value) {
            current = current.Left;
        } else {
            current = current.Right;
        }
    }
    return false;
}`,
    lines: COMMON_LINES,
  },
  java: {
    code: `boolean search(Node root, int target) {
    Node current = root;
    while (current != null) {
        if (target == current.value) {
            return true;
        } else if (target < current.value) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    return false;
}`,
    lines: COMMON_LINES,
  },
  kotlin: {
    code: `fun search(root: Node?, target: Int): Boolean {
    var current = root
    while (current != null) {
        if (target == current.value) {
            return true
        } else if (target < current.value) {
            current = current.left
        } else {
            current = current.right
        }
    }
    return false
}`,
    lines: COMMON_LINES,
  },
  swift: {
    code: `func search(_ root: Node?, _ target: Int) -> Bool {
    var current = root
    while current != nil {
        if target == current!.value {
            return true
        } else if target < current!.value {
            current = current!.left
        } else {
            current = current!.right
        }
    }
    return false
}`,
    lines: COMMON_LINES,
  },
  javascript: {
    code: `function search(root, target) {
  let current = root;
  while (current !== null) {
    if (target === current.value) {
      return true;
    } else if (target < current.value) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  return false;
}`,
    lines: COMMON_LINES,
  },
  typescript: {
    code: `function search(root: Node | null, target: number): boolean {
  let current = root;
  while (current !== null) {
    if (target === current.value) {
      return true;
    } else if (target < current.value) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  return false;
}`,
    lines: COMMON_LINES,
  },
  go: {
    code: `func search(root *Node, target int) bool {
    current := root
    for current != nil {
        if target == current.value {
            return true
        } else if target < current.value {
            current = current.left
        } else {
            current = current.right
        }
    }
    return false
}`,
    lines: COMMON_LINES,
  },
  rust: {
    code: `fn search(root: &Option<Box<Node>>, target: i32) -> bool {
    let mut current = root;
    while let Some(node) = current {
        if target == node.value {
            return true;
        } else if target < node.value {
            current = &node.left;
        } else {
            current = &node.right;
        }
    }
    false
}`,
    lines: COMMON_LINES,
  },
  php: {
    code: `function search($root, $target) {
    $current = $root;
    while ($current !== null) {
        if ($target === $current->value) {
            return true;
        } elseif ($target < $current->value) {
            $current = $current->left;
        } else {
            $current = $current->right;
        }
    }
    return false;
}`,
    lines: COMMON_LINES,
  },
};
