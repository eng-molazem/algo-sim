export default {
  python: {
    code: `def infix_to_postfix(tokens):
    stack = []
    output = []
    prec = {'+': 1, '-': 1, '*': 2, '/': 2}
    for token in tokens:
        if token.isdigit():
            output.append(token)
        elif token == '(':
            stack.append(token)
        elif token == ')':
            while stack[-1] != '(':
                output.append(stack.pop())
            stack.pop()
        else:
            while stack and stack[-1] != '(' and prec[stack[-1]] >= prec[token]:
                output.append(stack.pop())
            stack.append(token)
    while stack:
        output.append(stack.pop())
    return output`,
    lines: {
      start: [1, 2, 3, 4],
      'output-operand': [6, 7],
      'push-check': [15],
      'push-place': [9, 17],
      'pop-check': [11, 15],
      'pop-place': [12, 16],
      done: [20],
    },
  },
  c: {
    code: `void infixToPostfix(char* tokens[], int n, char* output[], int* outLen) {
    char* stack[100];
    int top = -1;
    for (int i = 0; i < n; i++) {
        char* token = tokens[i];
        if (isNumber(token)) {
            output[(*outLen)++] = token;
        } else if (strcmp(token, "(") == 0) {
            stack[++top] = token;
        } else if (strcmp(token, ")") == 0) {
            while (strcmp(stack[top], "(") != 0) {
                output[(*outLen)++] = stack[top--];
            }
            top--;
        } else {
            while (top >= 0 && strcmp(stack[top], "(") != 0 && prec(stack[top]) >= prec(token)) {
                output[(*outLen)++] = stack[top--];
            }
            stack[++top] = token;
        }
    }
    while (top >= 0) {
        output[(*outLen)++] = stack[top--];
    }
}`,
    lines: {
      start: [2, 3],
      'output-operand': [6, 7],
      'push-check': [17],
      'push-place': [9, 20],
      'pop-check': [11, 17],
      'pop-place': [12, 18],
      done: [23, 24],
    },
  },
  cpp: {
    code: `vector<string> infixToPostfix(vector<string>& tokens) {
    stack<string> st;
    vector<string> output;
    for (string& token : tokens) {
        if (isNumber(token)) {
            output.push_back(token);
        } else if (token == "(") {
            st.push(token);
        } else if (token == ")") {
            while (st.top() != "(") {
                output.push_back(st.top());
                st.pop();
            }
            st.pop();
        } else {
            while (!st.empty() && st.top() != "(" && prec(st.top()) >= prec(token)) {
                output.push_back(st.top());
                st.pop();
            }
            st.push(token);
        }
    }
    while (!st.empty()) {
        output.push_back(st.top());
        st.pop();
    }
    return output;
}`,
    lines: {
      start: [2, 3],
      'output-operand': [5, 6],
      'push-check': [16],
      'push-place': [8, 20],
      'pop-check': [10, 16],
      'pop-place': [11, 12, 17, 18],
      done: [27],
    },
  },
  csharp: {
    code: `List<string> InfixToPostfix(List<string> tokens) {
    var stack = new Stack<string>();
    var output = new List<string>();
    foreach (var token in tokens) {
        if (IsNumber(token)) {
            output.Add(token);
        } else if (token == "(") {
            stack.Push(token);
        } else if (token == ")") {
            while (stack.Peek() != "(") {
                output.Add(stack.Pop());
            }
            stack.Pop();
        } else {
            while (stack.Count > 0 && stack.Peek() != "(" && Prec(stack.Peek()) >= Prec(token)) {
                output.Add(stack.Pop());
            }
            stack.Push(token);
        }
    }
    while (stack.Count > 0) {
        output.Add(stack.Pop());
    }
    return output;
}`,
    lines: {
      start: [2, 3],
      'output-operand': [5, 6],
      'push-check': [15],
      'push-place': [8, 18],
      'pop-check': [10, 15],
      'pop-place': [11, 16],
      done: [24],
    },
  },
  java: {
    code: `List<String> infixToPostfix(List<String> tokens) {
    Deque<String> stack = new ArrayDeque<>();
    List<String> output = new ArrayList<>();
    for (String token : tokens) {
        if (isNumber(token)) {
            output.add(token);
        } else if (token.equals("(")) {
            stack.push(token);
        } else if (token.equals(")")) {
            while (!stack.peek().equals("(")) {
                output.add(stack.pop());
            }
            stack.pop();
        } else {
            while (!stack.isEmpty() && !stack.peek().equals("(") && prec(stack.peek()) >= prec(token)) {
                output.add(stack.pop());
            }
            stack.push(token);
        }
    }
    while (!stack.isEmpty()) {
        output.add(stack.pop());
    }
    return output;
}`,
    lines: {
      start: [2, 3],
      'output-operand': [5, 6],
      'push-check': [15],
      'push-place': [8, 18],
      'pop-check': [10, 15],
      'pop-place': [11, 16],
      done: [24],
    },
  },
  kotlin: {
    code: `fun infixToPostfix(tokens: List<String>): List<String> {
    val stack = ArrayDeque<String>()
    val output = mutableListOf<String>()
    for (token in tokens) {
        if (isNumber(token)) {
            output.add(token)
        } else if (token == "(") {
            stack.addLast(token)
        } else if (token == ")") {
            while (stack.last() != "(") {
                output.add(stack.removeLast())
            }
            stack.removeLast()
        } else {
            while (stack.isNotEmpty() && stack.last() != "(" && prec(stack.last()) >= prec(token)) {
                output.add(stack.removeLast())
            }
            stack.addLast(token)
        }
    }
    while (stack.isNotEmpty()) {
        output.add(stack.removeLast())
    }
    return output
}`,
    lines: {
      start: [2, 3],
      'output-operand': [5, 6],
      'push-check': [15],
      'push-place': [8, 18],
      'pop-check': [10, 15],
      'pop-place': [11, 16],
      done: [24],
    },
  },
  swift: {
    code: `func infixToPostfix(_ tokens: [String]) -> [String] {
    var stack: [String] = []
    var output: [String] = []
    for token in tokens {
        if isNumber(token) {
            output.append(token)
        } else if token == "(" {
            stack.append(token)
        } else if token == ")" {
            while stack.last != "(" {
                output.append(stack.removeLast())
            }
            stack.removeLast()
        } else {
            while !stack.isEmpty && stack.last != "(" && prec(stack.last!) >= prec(token) {
                output.append(stack.removeLast())
            }
            stack.append(token)
        }
    }
    while !stack.isEmpty {
        output.append(stack.removeLast())
    }
    return output
}`,
    lines: {
      start: [2, 3],
      'output-operand': [5, 6],
      'push-check': [15],
      'push-place': [8, 18],
      'pop-check': [10, 15],
      'pop-place': [11, 16],
      done: [24],
    },
  },
  javascript: {
    code: `function infixToPostfix(tokens) {
  const stack = [];
  const output = [];
  tokens.forEach((token) => {
    if (isNumber(token)) {
      output.push(token);
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack[stack.length - 1] !== '(') {
        output.push(stack.pop());
      }
      stack.pop();
    } else {
      while (stack.length && stack[stack.length - 1] !== '(' && prec(stack[stack.length - 1]) >= prec(token)) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  });
  while (stack.length) {
    output.push(stack.pop());
  }
  return output;
}`,
    lines: {
      start: [2, 3],
      'output-operand': [5, 6],
      'push-check': [15],
      'push-place': [8, 18],
      'pop-check': [10, 15],
      'pop-place': [11, 16],
      done: [24],
    },
  },
  typescript: {
    code: `function infixToPostfix(tokens: string[]): string[] {
  const stack: string[] = [];
  const output: string[] = [];
  tokens.forEach((token) => {
    if (isNumber(token)) {
      output.push(token);
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack[stack.length - 1] !== '(') {
        output.push(stack.pop()!);
      }
      stack.pop();
    } else {
      while (stack.length && stack[stack.length - 1] !== '(' && prec(stack[stack.length - 1]) >= prec(token)) {
        output.push(stack.pop()!);
      }
      stack.push(token);
    }
  });
  while (stack.length) {
    output.push(stack.pop()!);
  }
  return output;
}`,
    lines: {
      start: [2, 3],
      'output-operand': [5, 6],
      'push-check': [15],
      'push-place': [8, 18],
      'pop-check': [10, 15],
      'pop-place': [11, 16],
      done: [24],
    },
  },
  go: {
    code: `func infixToPostfix(tokens []string) []string {
    stack := []string{}
    output := []string{}
    for _, token := range tokens {
        if isNumber(token) {
            output = append(output, token)
        } else if token == "(" {
            stack = append(stack, token)
        } else if token == ")" {
            for stack[len(stack)-1] != "(" {
                output = append(output, stack[len(stack)-1])
                stack = stack[:len(stack)-1]
            }
            stack = stack[:len(stack)-1]
        } else {
            for len(stack) > 0 && stack[len(stack)-1] != "(" && prec(stack[len(stack)-1]) >= prec(token) {
                output = append(output, stack[len(stack)-1])
                stack = stack[:len(stack)-1]
            }
            stack = append(stack, token)
        }
    }
    for len(stack) > 0 {
        output = append(output, stack[len(stack)-1])
        stack = stack[:len(stack)-1]
    }
    return output
}`,
    lines: {
      start: [2, 3],
      'output-operand': [5, 6],
      'push-check': [16],
      'push-place': [8, 20],
      'pop-check': [10, 16],
      'pop-place': [11, 12, 17, 18],
      done: [27],
    },
  },
  rust: {
    code: `fn infix_to_postfix(tokens: &[String]) -> Vec<String> {
    let mut stack: Vec<String> = Vec::new();
    let mut output: Vec<String> = Vec::new();
    for token in tokens {
        if is_number(token) {
            output.push(token.clone());
        } else if token == "(" {
            stack.push(token.clone());
        } else if token == ")" {
            while stack.last().unwrap() != "(" {
                output.push(stack.pop().unwrap());
            }
            stack.pop();
        } else {
            while !stack.is_empty() && stack.last().unwrap() != "(" && prec(stack.last().unwrap()) >= prec(token) {
                output.push(stack.pop().unwrap());
            }
            stack.push(token.clone());
        }
    }
    while !stack.is_empty() {
        output.push(stack.pop().unwrap());
    }
    output
}`,
    lines: {
      start: [2, 3],
      'output-operand': [5, 6],
      'push-check': [15],
      'push-place': [8, 18],
      'pop-check': [10, 15],
      'pop-place': [11, 16],
      done: [24],
    },
  },
  php: {
    code: `function infixToPostfix(array $tokens): array {
    $stack = [];
    $output = [];
    foreach ($tokens as $token) {
        if (is_numeric($token)) {
            $output[] = $token;
        } elseif ($token === '(') {
            $stack[] = $token;
        } elseif ($token === ')') {
            while (end($stack) !== '(') {
                $output[] = array_pop($stack);
            }
            array_pop($stack);
        } else {
            while (!empty($stack) && end($stack) !== '(' && prec(end($stack)) >= prec($token)) {
                $output[] = array_pop($stack);
            }
            $stack[] = $token;
        }
    }
    while (!empty($stack)) {
        $output[] = array_pop($stack);
    }
    return $output;
}`,
    lines: {
      start: [2, 3],
      'output-operand': [5, 6],
      'push-check': [15],
      'push-place': [8, 18],
      'pop-check': [10, 15],
      'pop-place': [11, 16],
      done: [24],
    },
  },
};
