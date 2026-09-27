const PRECEDENCE = { '+': 1, '-': 1, '*': 2, '/': 2 };

function tokenize(text) {
  const tokens = [];
  let num = '';
  for (const ch of text) {
    if (/\s/.test(ch)) continue;
    if (/[0-9.]/.test(ch)) {
      num += ch;
      continue;
    }
    if (num) {
      tokens.push(num);
      num = '';
    }
    if ('+-*/()'.includes(ch)) tokens.push(ch);
  }
  if (num) tokens.push(num);
  return tokens;
}

function evaluatePostfix(postfix) {
  const stack = [];
  postfix.forEach((tok) => {
    if (PRECEDENCE[tok]) {
      const b = stack.pop();
      const a = stack.pop();
      if (tok === '+') stack.push(a + b);
      if (tok === '-') stack.push(a - b);
      if (tok === '*') stack.push(a * b);
      if (tok === '/') stack.push(a / b);
    } else {
      stack.push(Number(tok));
    }
  });
  return stack[0];
}

export function run(text) {
  const tokens = tokenize(text);
  const items = [];
  const output = [];
  const snapshots = [];

  snapshots.push({ items: [], action: 'idle', highlightIndex: null, message: `الصيغة الوسطية: ${text}`, tag: 'start' });

  tokens.forEach((tok) => {
    if (!Number.isNaN(Number(tok))) {
      output.push(tok);
      snapshots.push({
        items: [...items],
        action: 'idle',
        highlightIndex: null,
        message: `إخراج العدد ${tok} مباشرة`,
        tag: 'output-operand',
        outputSoFar: output.join(' '),
      });
      return;
    }

    if (tok === '(') {
      snapshots.push({
        items: [...items],
        action: 'entering',
        highlightIndex: items.length,
        pendingValue: tok,
        message: "Push('(')",
        tag: 'push-check',
      });
      items.push(tok);
      snapshots.push({ items: [...items], action: 'push', highlightIndex: items.length - 1, tag: 'push-place' });
      return;
    }

    if (tok === ')') {
      while (items.length && items[items.length - 1] !== '(') {
        const op = items[items.length - 1];
        snapshots.push({
          items: [...items],
          action: 'pop',
          highlightIndex: items.length - 1,
          message: `Pop('${op}') إلى الإخراج`,
          tag: 'pop-place',
        });
        items.pop();
        output.push(op);
      }
      items.pop();
      snapshots.push({
        items: [...items],
        action: 'idle',
        highlightIndex: null,
        message: "إزالة '(' من المكدس",
        tag: 'pop-place',
        outputSoFar: output.join(' '),
      });
      return;
    }

    snapshots.push({
      items: [...items],
      action: 'idle',
      highlightIndex: items.length - 1,
      message: `مقارنة أولوية '${tok}' بقمة المكدس`,
      tag: 'pop-check',
    });

    while (items.length && items[items.length - 1] !== '(' && PRECEDENCE[items[items.length - 1]] >= PRECEDENCE[tok]) {
      const op = items[items.length - 1];
      snapshots.push({
        items: [...items],
        action: 'pop',
        highlightIndex: items.length - 1,
        message: `Pop('${op}') إلى الإخراج (أولوية أعلى أو تساوي)`,
        tag: 'pop-place',
      });
      items.pop();
      output.push(op);
    }

    snapshots.push({
      items: [...items],
      action: 'entering',
      highlightIndex: items.length,
      pendingValue: tok,
      message: `Push('${tok}')`,
      tag: 'push-check',
    });
    items.push(tok);
    snapshots.push({
      items: [...items],
      action: 'push',
      highlightIndex: items.length - 1,
      tag: 'push-place',
      outputSoFar: output.join(' '),
    });
  });

  while (items.length) {
    const op = items[items.length - 1];
    snapshots.push({
      items: [...items],
      action: 'pop',
      highlightIndex: items.length - 1,
      message: `Pop('${op}') إلى الإخراج (نهاية الصيغة)`,
      tag: 'pop-place',
    });
    items.pop();
    output.push(op);
  }

  const postfix = output.join(' ');
  const result = evaluatePostfix(output);

  snapshots.push({
    items: [],
    action: 'idle',
    highlightIndex: null,
    message: `اللاحقة: ${postfix} = ${result}`,
    tag: 'done',
    outputSoFar: postfix,
    result,
  });

  return snapshots;
}

export default {
  key: 'expressionEvaluation',
  category: 'stack',
  name: { ar: 'تقييم التعابير الحسابية (Infix to Postfix)', en: 'Expression Evaluation (Infix to Postfix)' },
  complexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(n)' },
  run,
};
