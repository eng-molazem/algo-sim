export default {
  python: {
    code: `def postorder(node, output):
    if node is None:
        return
    postorder(node.left, output)
    postorder(node.right, output)
    output.append(node.value)`,
    lines: { start: [1, 2, 3], 'go-children': [4, 5], visit: [6], done: [6] },
  },
  c: {
    code: `void postorder(Node* node, int* output, int* count) {
    if (node == NULL) return;
    postorder(node->left, output, count);
    postorder(node->right, output, count);
    output[(*count)++] = node->value;
}`,
    lines: { start: [1, 2], 'go-children': [3, 4], visit: [5], done: [5] },
  },
  cpp: {
    code: `void postorder(Node* node, vector<int>& output) {
    if (!node) return;
    postorder(node->left, output);
    postorder(node->right, output);
    output.push_back(node->value);
}`,
    lines: { start: [1, 2], 'go-children': [3, 4], visit: [5], done: [5] },
  },
  csharp: {
    code: `void Postorder(Node node, List<int> output) {
    if (node == null) return;
    Postorder(node.Left, output);
    Postorder(node.Right, output);
    output.Add(node.Value);
}`,
    lines: { start: [1, 2], 'go-children': [3, 4], visit: [5], done: [5] },
  },
  java: {
    code: `void postorder(Node node, List<Integer> output) {
    if (node == null) return;
    postorder(node.left, output);
    postorder(node.right, output);
    output.add(node.value);
}`,
    lines: { start: [1, 2], 'go-children': [3, 4], visit: [5], done: [5] },
  },
  kotlin: {
    code: `fun postorder(node: Node?, output: MutableList<Int>) {
    if (node == null) return
    postorder(node.left, output)
    postorder(node.right, output)
    output.add(node.value)
}`,
    lines: { start: [1, 2], 'go-children': [3, 4], visit: [5], done: [5] },
  },
  swift: {
    code: `func postorder(_ node: Node?, _ output: inout [Int]) {
    guard let node = node else { return }
    postorder(node.left, &output)
    postorder(node.right, &output)
    output.append(node.value)
}`,
    lines: { start: [1, 2], 'go-children': [3, 4], visit: [5], done: [5] },
  },
  javascript: {
    code: `function postorder(node, output) {
  if (!node) return;
  postorder(node.left, output);
  postorder(node.right, output);
  output.push(node.value);
}`,
    lines: { start: [1, 2], 'go-children': [3, 4], visit: [5], done: [5] },
  },
  typescript: {
    code: `function postorder(node: TreeNode | null, output: number[]): void {
  if (!node) return;
  postorder(node.left, output);
  postorder(node.right, output);
  output.push(node.value);
}`,
    lines: { start: [1, 2], 'go-children': [3, 4], visit: [5], done: [5] },
  },
  go: {
    code: `func postorder(node *Node, output *[]int) {
    if node == nil {
        return
    }
    postorder(node.Left, output)
    postorder(node.Right, output)
    *output = append(*output, node.Value)
}`,
    lines: { start: [1, 2, 3, 4], 'go-children': [5, 6], visit: [7], done: [7] },
  },
  rust: {
    code: `fn postorder(node: &Option<Box<Node>>, output: &mut Vec<i32>) {
    if let Some(n) = node {
        postorder(&n.left, output);
        postorder(&n.right, output);
        output.push(n.value);
    }
}`,
    lines: { start: [1, 2], 'go-children': [3, 4], visit: [5], done: [5] },
  },
  php: {
    code: `function postorder($node, array &$output): void {
    if ($node === null) return;
    postorder($node->left, $output);
    postorder($node->right, $output);
    $output[] = $node->value;
}`,
    lines: { start: [1, 2], 'go-children': [3, 4], visit: [5], done: [5] },
  },
};
