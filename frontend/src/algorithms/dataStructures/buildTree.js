export function buildBstFromValues(values) {
  let root = null;
  let counter = 0;

  function insert(node, value) {
    if (!node) return { id: `n${counter++}`, value, left: null, right: null };
    if (value < node.value) node.left = insert(node.left, value);
    else if (value > node.value) node.right = insert(node.right, value);
    return node;
  }

  values.forEach((v) => {
    root = insert(root, v);
  });
  return root;
}

/**
 * Parses a level-order (LeetCode-style) list of values into a binary tree,
 * e.g. "5,3,8,2,4,,9" -> root 5, left 3 (children 2,4), right 8 (right child 9).
 * An empty slot between commas means "no node at that position".
 */
export function parseLevelOrder(text) {
  const tokens = text.split(',').map((t) => t.trim());
  const values = tokens.map((t) => (t === '' ? null : Number(t)));
  if (!values.length || values[0] === null || Number.isNaN(values[0])) return null;
  if (values.some((v) => v !== null && Number.isNaN(v))) return null;

  let counter = 0;
  const root = { id: `n${counter++}`, value: values[0], left: null, right: null };
  const queue = [root];
  let i = 1;

  while (queue.length && i < values.length) {
    const node = queue.shift();
    if (i < values.length) {
      const leftVal = values[i++];
      if (leftVal !== null) {
        node.left = { id: `n${counter++}`, value: leftVal, left: null, right: null };
        queue.push(node.left);
      }
    }
    if (i < values.length) {
      const rightVal = values[i++];
      if (rightVal !== null) {
        node.right = { id: `n${counter++}`, value: rightVal, left: null, right: null };
        queue.push(node.right);
      }
    }
  }
  return root;
}

export function treeToLevelOrder(root) {
  if (!root) return '';
  const out = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (!node) {
      out.push('');
      continue;
    }
    out.push(String(node.value));
    queue.push(node.left || null);
    queue.push(node.right || null);
  }
  while (out.length && out[out.length - 1] === '') out.pop();
  return out.join(',');
}
