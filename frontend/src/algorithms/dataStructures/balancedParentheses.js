const PAIRS = { ')': '(', ']': '[', '}': '{' };
const OPENERS = new Set(['(', '[', '{']);
const CLOSERS = new Set([')', ']', '}']);

export function run(text) {
  const chars = [...text].filter((c) => OPENERS.has(c) || CLOSERS.has(c));
  const items = [];
  const snapshots = [];

  snapshots.push({ items: [], action: 'idle', highlightIndex: null, message: `النص: ${text}`, tag: 'start' });

  for (let i = 0; i < chars.length; i += 1) {
    const ch = chars[i];

    if (OPENERS.has(ch)) {
      snapshots.push({
        items: [...items],
        action: 'entering',
        highlightIndex: items.length,
        pendingValue: ch,
        message: `Push('${ch}')`,
        tag: 'push-check',
      });
      items.push(ch);
      snapshots.push({
        items: [...items],
        action: 'push',
        highlightIndex: items.length - 1,
        message: `تم دفع '${ch}'`,
        tag: 'push-place',
      });
      continue;
    }

    snapshots.push({
      items: [...items],
      action: 'idle',
      highlightIndex: items.length - 1,
      message: `فحص '${ch}' مقابل قمة المكدس`,
      tag: 'pop-check',
    });

    if (items.length === 0 || items[items.length - 1] !== PAIRS[ch]) {
      snapshots.push({
        items: [...items],
        action: 'pop',
        highlightIndex: Math.max(0, items.length - 1),
        message: `غير متوازن: '${ch}' لا يطابق قمة المكدس`,
        tag: 'mismatch',
        balanced: false,
      });
      return snapshots;
    }

    const popped = items[items.length - 1];
    snapshots.push({
      items: [...items],
      action: 'pop',
      highlightIndex: items.length - 1,
      message: `Pop() -> '${popped}' يطابق '${ch}'`,
      tag: 'pop-place',
    });
    items.pop();
  }

  const balanced = items.length === 0;
  snapshots.push({
    items: [...items],
    action: 'idle',
    highlightIndex: null,
    message: balanced ? 'السلسلة متوازنة ✓' : 'السلسلة غير متوازنة: أقواس لم تُغلق',
    tag: 'done',
    balanced,
  });

  return snapshots;
}

export default {
  key: 'balancedParentheses',
  category: 'stack',
  name: { ar: 'توازن الأقواس (Balanced Parentheses)', en: 'Balanced Parentheses' },
  complexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(n)' },
  run,
};
