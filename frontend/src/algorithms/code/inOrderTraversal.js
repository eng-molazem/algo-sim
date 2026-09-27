export default {
  python: {
    code: `def inorder(node, output):
    if node is None:
        return
    inorder(node.left, output)
    output.append(node.value)
    inorder(node.right, output)`,
    lines: { start: [1, 2, 3], 'go-left': [4], visit: [5], done: [6] },
  },
  c: {
    code: `void inorder(Node* node, int* output, int* count) {
    if (node == NULL) return;
    inorder(node->left, output, count);
    output[(*count)++] = node->value;
    inorder(node->right, output, count);
}`,
    lines: { start: [1, 2], 'go-left': [3], visit: [4], done: [6] },
  },
  cpp: {
    code: `void inorder(Node* node, vector<int>& output) {
    if (!node) return;
    inorder(node->left, output);
    output.push_back(node->value);
    inorder(node->right, output);
}`,
    lines: { start: [1, 2], 'go-left': [3], visit: [4], done: [6] },
  },
  csharp: {
    code: `void Inorder(Node node, List<int> output) {
    if (node == null) return;
    Inorder(node.Left, output);
    output.Add(node.Value);
    Inorder(node.Right, output);
}`,
    lines: { start: [1, 2], 'go-left': [3], visit: [4], done: [6] },
  },
  java: {
    code: `void inorder(Node node, List<Integer> output) {
    if (node == null) return;
    inorder(node.left, output);
    output.add(node.value);
    inorder(node.right, output);
}`,
    lines: { start: [1, 2], 'go-left': [3], visit: [4], done: [6] },
  },
  kotlin: {
    code: `fun inorder(node: Node?, output: MutableList<Int>) {
    if (node == null) return
    inorder(node.left, output)
    output.add(node.value)
    inorder(node.right, output)
}`,
    lines: { start: [1, 2], 'go-left': [3], visit: [4], done: [6] },
  },
  swift: {
    code: `func inorder(_ node: Node?, _ output: inout [Int]) {
    guard let node = node else { return }
    inorder(node.left, &output)
    output.append(node.value)
    inorder(node.right, &output)
}`,
    lines: { start: [1, 2], 'go-left': [3], visit: [4], done: [6] },
  },
  javascript: {
    code: `function inorder(node, output) {
  if (!node) return;
  inorder(node.left, output);
  output.push(node.value);
  inorder(node.right, output);
}`,
    lines: { start: [1, 2], 'go-left': [3], visit: [4], done: [6] },
  },
  typescript: {
    code: `function inorder(node: TreeNode | null, output: number[]): void {
  if (!node) return;
  inorder(node.left, output);
  output.push(node.value);
  inorder(node.right, output);
}`,
    lines: { start: [1, 2], 'go-left': [3], visit: [4], done: [6] },
  },
  go: {
    code: `func inorder(node *Node, output *[]int) {
    if node == nil {
        return
    }
    inorder(node.Left, output)
    *output = append(*output, node.Value)
    inorder(node.Right, output)
}`,
    lines: { start: [1, 2, 3, 4], 'go-left': [5], visit: [6], done: [8] },
  },
  rust: {
    code: `fn inorder(node: &Option<Box<Node>>, output: &mut Vec<i32>) {
    if let Some(n) = node {
        inorder(&n.left, output);
        output.push(n.value);
        inorder(&n.right, output);
    }
}`,
    lines: { start: [1, 2], 'go-left': [3], visit: [4], done: [7] },
  },
  php: {
    code: `function inorder($node, array &$output): void {
    if ($node === null) return;
    inorder($node->left, $output);
    $output[] = $node->value;
    inorder($node->right, $output);
}`,
    lines: { start: [1, 2], 'go-left': [3], visit: [4], done: [6] },
  },
};
