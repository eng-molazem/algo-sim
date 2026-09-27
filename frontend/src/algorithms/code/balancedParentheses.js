export default {
  python: {
    code: `def is_balanced(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        elif ch in ')]}':
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack`,
    lines: { start: [1, 2, 3], 'push-check': [5], 'push-place': [6], 'pop-check': [7, 8], 'pop-place': [8], mismatch: [9], done: [10] },
  },
  c: {
    code: `int isBalanced(char* s) {
    char stack[100];
    int top = -1;
    for (int i = 0; s[i] != '\\0'; i++) {
        char ch = s[i];
        if (ch == '(' || ch == '[' || ch == '{') {
            stack[++top] = ch;
        } else if (ch == ')' || ch == ']' || ch == '}') {
            if (top == -1 || !matches(stack[top--], ch)) {
                return 0;
            }
        }
    }
    return top == -1;
}`,
    lines: { start: [1, 2, 3], 'push-check': [6], 'push-place': [7], 'pop-check': [8, 9], 'pop-place': [9], mismatch: [10], done: [14] },
  },
  cpp: {
    code: `bool isBalanced(string s) {
    stack<char> st;
    unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};
    for (char ch : s) {
        if (ch == '(' || ch == '[' || ch == '{') {
            st.push(ch);
        } else if (ch == ')' || ch == ']' || ch == '}') {
            if (st.empty() || st.top() != pairs[ch]) {
                return false;
            }
            st.pop();
        }
    }
    return st.empty();
}`,
    lines: { start: [1, 2, 3], 'push-check': [5], 'push-place': [6], 'pop-check': [7, 8], 'pop-place': [11], mismatch: [9], done: [14] },
  },
  csharp: {
    code: `bool IsBalanced(string s) {
    var stack = new Stack<char>();
    var pairs = new Dictionary<char, char> { [')'] = '(', [']'] = '[', ['}'] = '{' };
    foreach (char ch in s) {
        if (ch == '(' || ch == '[' || ch == '{') {
            stack.Push(ch);
        } else if (ch == ')' || ch == ']' || ch == '}') {
            if (stack.Count == 0 || stack.Peek() != pairs[ch]) {
                return false;
            }
            stack.Pop();
        }
    }
    return stack.Count == 0;
}`,
    lines: { start: [1, 2, 3], 'push-check': [5], 'push-place': [6], 'pop-check': [7, 8], 'pop-place': [11], mismatch: [9], done: [14] },
  },
  java: {
    code: `boolean isBalanced(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    Map<Character, Character> pairs = Map.of(')', '(', ']', '[', '}', '{');
    for (char ch : s.toCharArray()) {
        if (ch == '(' || ch == '[' || ch == '{') {
            stack.push(ch);
        } else if (ch == ')' || ch == ']' || ch == '}') {
            if (stack.isEmpty() || stack.peek() != pairs.get(ch)) {
                return false;
            }
            stack.pop();
        }
    }
    return stack.isEmpty();
}`,
    lines: { start: [1, 2, 3], 'push-check': [5], 'push-place': [6], 'pop-check': [7, 8], 'pop-place': [11], mismatch: [9], done: [14] },
  },
  kotlin: {
    code: `fun isBalanced(s: String): Boolean {
    val stack = ArrayDeque<Char>()
    val pairs = mapOf(')' to '(', ']' to '[', '}' to '{')
    for (ch in s) {
        if (ch == '(' || ch == '[' || ch == '{') {
            stack.addLast(ch)
        } else if (ch == ')' || ch == ']' || ch == '}') {
            if (stack.isEmpty() || stack.removeLast() != pairs[ch]) {
                return false
            }
        }
    }
    return stack.isEmpty()
}`,
    lines: { start: [1, 2, 3], 'push-check': [5], 'push-place': [6], 'pop-check': [7, 8], 'pop-place': [8], mismatch: [9], done: [13] },
  },
  swift: {
    code: `func isBalanced(_ s: String) -> Bool {
    var stack: [Character] = []
    let pairs: [Character: Character] = [")": "(", "]": "[", "}": "{"]
    for ch in s {
        if ch == "(" || ch == "[" || ch == "{" {
            stack.append(ch)
        } else if ch == ")" || ch == "]" || ch == "}" {
            if stack.isEmpty || stack.removeLast() != pairs[ch] {
                return false
            }
        }
    }
    return stack.isEmpty
}`,
    lines: { start: [1, 2, 3], 'push-check': [5], 'push-place': [6], 'pop-check': [7, 8], 'pop-place': [8], mismatch: [9], done: [13] },
  },
  javascript: {
    code: `function isBalanced(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else if (ch === ')' || ch === ']' || ch === '}') {
      if (stack.length === 0 || stack.pop() !== pairs[ch]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}`,
    lines: { start: [1, 2, 3], 'push-check': [5], 'push-place': [6], 'pop-check': [7, 8], 'pop-place': [8], mismatch: [9], done: [13] },
  },
  typescript: {
    code: `function isBalanced(s: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else if (ch === ')' || ch === ']' || ch === '}') {
      if (stack.length === 0 || stack.pop() !== pairs[ch]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}`,
    lines: { start: [1, 2, 3], 'push-check': [5], 'push-place': [6], 'pop-check': [7, 8], 'pop-place': [8], mismatch: [9], done: [13] },
  },
  go: {
    code: `func isBalanced(s string) bool {
    stack := []rune{}
    pairs := map[rune]rune{')': '(', ']': '[', '}': '{'}
    for _, ch := range s {
        if ch == '(' || ch == '[' || ch == '{' {
            stack = append(stack, ch)
        } else if ch == ')' || ch == ']' || ch == '}' {
            if len(stack) == 0 || stack[len(stack)-1] != pairs[ch] {
                return false
            }
            stack = stack[:len(stack)-1]
        }
    }
    return len(stack) == 0
}`,
    lines: { start: [1, 2, 3], 'push-check': [5], 'push-place': [6], 'pop-check': [7, 8], 'pop-place': [11], mismatch: [9], done: [14] },
  },
  rust: {
    code: `fn is_balanced(s: &str) -> bool {
    let mut stack: Vec<char> = Vec::new();
    let pairs: HashMap<char, char> = HashMap::from([(')', '('), (']', '['), ('}', '{')]);
    for ch in s.chars() {
        if ch == '(' || ch == '[' || ch == '{' {
            stack.push(ch);
        } else if ch == ')' || ch == ']' || ch == '}' {
            match stack.pop() {
                Some(top) if top == pairs[&ch] => {}
                _ => return false,
            }
        }
    }
    stack.is_empty()
}`,
    lines: { start: [1, 2, 3], 'push-check': [5], 'push-place': [6], 'pop-check': [7, 8, 9], 'pop-place': [9], mismatch: [10], done: [14] },
  },
  php: {
    code: `function isBalanced(string $s): bool {
    $stack = [];
    $pairs = [')' => '(', ']' => '[', '}' => '{'];
    for ($i = 0; $i < strlen($s); $i++) {
        $ch = $s[$i];
        if (in_array($ch, ['(', '[', '{'])) {
            array_push($stack, $ch);
        } elseif (in_array($ch, [')', ']', '}'])) {
            if (empty($stack) || array_pop($stack) !== $pairs[$ch]) {
                return false;
            }
        }
    }
    return empty($stack);
}`,
    lines: { start: [1, 2, 3], 'push-check': [6], 'push-place': [7], 'pop-check': [8, 9], 'pop-place': [9], mismatch: [10], done: [14] },
  },
};
