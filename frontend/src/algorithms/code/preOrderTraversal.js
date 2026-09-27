export default {
  python: {
    code: `def preorder(node, output):
    if node is None:
        return
    output.append(node.value)
    preorder(node.left, output)
    preorder(node.right, output)`,
    lines: { start: [1, 2, 3], visit: [4], 'go-left': [5], done: [6] },
  },
  c: {
    code: `void preorder(Node* node, int* output, int* count) {
    if (node == NULL) return;
    output[(*count)++] = node->value;
    preorder(node->left, output, count);
    preorder(node->right, output, count);
}`,
    lines: { start: [1, 2], visit: [3], 'go-left': [4], done: [6] },
  },
  cpp: {
    code: `void preorder(Node* node, vector<int>& output) {
    if (!node) return;
    output.push_back(node->value);
    preorder(node->left, output);
    preorder(node->right, output);
}`,
    lines: { start: [1, 2], visit: [3], 'go-left': [4], done: [6] },
  },
  csharp: {
    code: `void Preorder(Node node, List<int> output) {
    if (node == null) return;
    output.Add(node.Value);
    Preorder(node.Left, output);
    Preorder(node.Right, output);
}`,
    lines: { start: [1, 2], visit: [3], 'go-left': [4], done: [6] },
  },
  java: {
    code: `void preorder(Node node, List<Integer> output) {
    if (node == null) return;
    output.add(node.value);
    preorder(node.left, output);
    preorder(node.right, output);
}`,
    lines: { start: [1, 2], visit: [3], 'go-left': [4], done: [6] },
  },
  kotlin: {
    code: `fun preorder(node: Node?, output: MutableList<Int>) {
    if (node == null) return
    output.add(node.value)
    preorder(node.left, output)
    preorder(node.right, output)
}`,
    lines: { start: [1, 2], visit: [3], 'go-left': [4], done: [6] },
  },
  swift: {
    code: `func preorder(_ node: Node?, _ output: inout [Int]) {
    guard let node = node else { return }
    output.append(node.value)
    preorder(node.left, &output)
    preorder(node.right, &output)
}`,
    lines: { start: [1, 2], visit: [3], 'go-left': [4], done: [6] },
  },
  javascript: {
    code: `function preorder(node, output) {
  if (!node) return;
  output.push(node.value);
  preorder(node.left, output);
  preorder(node.right, output);
}`,
    lines: { start: [1, 2], visit: [3], 'go-left': [4], done: [6] },
  },
  typescript: {
    code: `function preorder(node: TreeNode | null, output: number[]): void {
  if (!node) return;
  output.push(node.value);
  preorder(node.left, output);
  preorder(node.right, output);
}`,
    lines: { start: [1, 2], visit: [3], 'go-left': [4], done: [6] },
  },
  go: {
    code: `func preorder(node *Node, output *[]int) {
    if node == nil {
        return
    }
    *output = append(*output, node.Value)
    preorder(node.Left, output)
    preorder(node.Right, output)
}`,
    lines: { start: [1, 2, 3, 4], visit: [5], 'go-left': [6], done: [8] },
  },
  rust: {
    code: `fn preorder(node: &Option<Box<Node>>, output: &mut Vec<i32>) {
    if let Some(n) = node {
        output.push(n.value);
        preorder(&n.left, output);
        preorder(&n.right, output);
    }
}`,
    lines: { start: [1, 2], visit: [3], 'go-left': [4], done: [7] },
  },
  php: {
    code: `function preorder($node, array &$output): void {
    if ($node === null) return;
    $output[] = $node->value;
    preorder($node->left, $output);
    preorder($node->right, $output);
}`,
    lines: { start: [1, 2], visit: [3], 'go-left': [4], done: [6] },
  },
};
