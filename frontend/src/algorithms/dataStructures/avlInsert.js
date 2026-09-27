function cloneTree(node) {
  if (!node) return null;
  return { id: node.id, value: node.value, left: cloneTree(node.left), right: cloneTree(node.right) };
}

function h(n) {
  return n ? n.height : 0;
}

function updateHeight(n) {
  n.height = 1 + Math.max(h(n.left), h(n.right));
}

function bf(n) {
  return n ? h(n.left) - h(n.right) : 0;
}

function rotateRight(y) {
  const x = y.left;
  y.left = x.right;
  x.right = y;
  updateHeight(y);
  updateHeight(x);
  return x;
}

function rotateLeft(x) {
  const y = x.right;
  x.right = y.left;
  y.left = x;
  updateHeight(x);
  updateHeight(y);
  return y;
}

export function run(values) {
  let root = null;
  let counter = 0;
  const snapshots = [];

  snapshots.push({ tree: null, activeId: null, path: [], message: 'شجرة AVL فارغة', tag: 'start' });

  values.forEach((value) => {
    if (!root) {
      const id = `avl-${counter}`;
      counter += 1;
      root = { id, value, left: null, right: null, height: 1 };
      snapshots.push({ tree: cloneTree(root), activeId: id, path: [], insertedId: id, message: `إدراج ${value} كجذر`, tag: 'insert' });
      return;
    }

    const ancestors = [];
    let current = root;
    let inserted = false;
    let isDuplicate = false;

    while (!inserted) {
      const pathIds = ancestors.map((a) => a.node.id);
      snapshots.push({ tree: cloneTree(root), activeId: current.id, path: pathIds, pendingValue: value, tag: 'compare' });

      if (value < current.value) {
        if (!current.left) {
          const id = `avl-${counter}`;
          counter += 1;
          current.left = { id, value, left: null, right: null, height: 1 };
          ancestors.push({ node: current, dir: 'left' });
          snapshots.push({
            tree: cloneTree(root),
            activeId: id,
            path: ancestors.map((a) => a.node.id),
            insertedId: id,
            message: `إدراج ${value}`,
            tag: 'insert',
          });
          inserted = true;
        } else {
          ancestors.push({ node: current, dir: 'left' });
          current = current.left;
        }
      } else if (value > current.value) {
        if (!current.right) {
          const id = `avl-${counter}`;
          counter += 1;
          current.right = { id, value, left: null, right: null, height: 1 };
          ancestors.push({ node: current, dir: 'right' });
          snapshots.push({
            tree: cloneTree(root),
            activeId: id,
            path: ancestors.map((a) => a.node.id),
            insertedId: id,
            message: `إدراج ${value}`,
            tag: 'insert',
          });
          inserted = true;
        } else {
          ancestors.push({ node: current, dir: 'right' });
          current = current.right;
        }
      } else {
        snapshots.push({
          tree: cloneTree(root),
          activeId: current.id,
          path: pathIds,
          message: `القيمة ${value} موجودة مسبقاً`,
          tag: 'duplicate',
        });
        inserted = true;
        isDuplicate = true;
      }
    }

    if (isDuplicate) return;

    for (let i = ancestors.length - 1; i >= 0; i -= 1) {
      const { node } = ancestors[i];
      updateHeight(node);
      const balance = bf(node);
      let newSubRoot = node;

      if (balance > 1 && bf(node.left) >= 0) {
        snapshots.push({
          tree: cloneTree(root),
          activeId: node.id,
          path: [],
          message: `اختلال يسار-يسار عند ${node.value}: تدوير يميني`,
          tag: 'rotate-right',
        });
        newSubRoot = rotateRight(node);
      } else if (balance > 1 && bf(node.left) < 0) {
        snapshots.push({
          tree: cloneTree(root),
          activeId: node.id,
          path: [],
          message: `اختلال يسار-يمين عند ${node.value}: تدوير مزدوج (يسار ثم يمين)`,
          tag: 'rotate-left-right',
        });
        node.left = rotateLeft(node.left);
        newSubRoot = rotateRight(node);
      } else if (balance < -1 && bf(node.right) <= 0) {
        snapshots.push({
          tree: cloneTree(root),
          activeId: node.id,
          path: [],
          message: `اختلال يمين-يمين عند ${node.value}: تدوير يساري`,
          tag: 'rotate-left',
        });
        newSubRoot = rotateLeft(node);
      } else if (balance < -1 && bf(node.right) > 0) {
        snapshots.push({
          tree: cloneTree(root),
          activeId: node.id,
          path: [],
          message: `اختلال يمين-يسار عند ${node.value}: تدوير مزدوج (يمين ثم يسار)`,
          tag: 'rotate-right-left',
        });
        node.right = rotateRight(node.right);
        newSubRoot = rotateLeft(node);
      }

      if (newSubRoot !== node) {
        if (i === 0) {
          root = newSubRoot;
        } else {
          const parentEntry = ancestors[i - 1];
          parentEntry.node[parentEntry.dir] = newSubRoot;
        }
        snapshots.push({
          tree: cloneTree(root),
          activeId: newSubRoot.id,
          path: [],
          message: 'الشجرة متوازنة بعد التدوير',
          tag: 'after-rotate',
        });
      }
    }
  });

  snapshots.push({ tree: cloneTree(root), activeId: null, path: [], message: 'اكتمل بناء شجرة AVL', tag: 'done' });
  return snapshots;
}

export default {
  key: 'avlInsert',
  category: 'tree',
  name: { ar: 'الإدراج في شجرة AVL (AVL Insert)', en: 'AVL Tree Insert' },
  complexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)', space: 'O(n)' },
  run,
};
