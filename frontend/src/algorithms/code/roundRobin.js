export default {
  python: {
    code: `def round_robin(processes, quantum):
    queue = deque(processes)
    time = 0
    completion = {}
    while queue:
        p = queue.popleft()
        run_time = min(quantum, p.remaining)
        time += run_time
        p.remaining -= run_time
        if p.remaining > 0:
            queue.append(p)
        else:
            completion[p.id] = time
    return completion`,
    lines: { start: [1, 2, 3, 4], 'run-slice': [6, 7, 8, 9, 10, 11, 12, 13], done: [14] },
  },
  c: {
    code: `void roundRobin(Process procs[], int n, int quantum) {
    int queue[1000], front = 0, back = 0;
    for (int i = 0; i < n; i++) queue[back++] = i;
    int time = 0;
    while (front < back) {
        int idx = queue[front++];
        int runTime = (quantum < procs[idx].remaining) ? quantum : procs[idx].remaining;
        time += runTime;
        procs[idx].remaining -= runTime;
        if (procs[idx].remaining > 0) {
            queue[back++] = idx;
        } else {
            procs[idx].completion = time;
        }
    }
}`,
    lines: { start: [1, 2, 3, 4], 'run-slice': [6, 7, 8, 9, 10, 11, 12, 13], done: [16] },
  },
  cpp: {
    code: `void roundRobin(vector<Process>& processes, int quantum) {
    queue<int> q;
    for (int i = 0; i < processes.size(); i++) q.push(i);
    int time = 0;
    while (!q.empty()) {
        int idx = q.front(); q.pop();
        int runTime = min(quantum, processes[idx].remaining);
        time += runTime;
        processes[idx].remaining -= runTime;
        if (processes[idx].remaining > 0) {
            q.push(idx);
        } else {
            processes[idx].completion = time;
        }
    }
}`,
    lines: { start: [1, 2, 3, 4], 'run-slice': [6, 7, 8, 9, 10, 11, 12, 13, 14], done: [16] },
  },
  csharp: {
    code: `void RoundRobin(List<Process> processes, int quantum) {
    var queue = new Queue<int>(Enumerable.Range(0, processes.Count));
    int time = 0;
    while (queue.Count > 0) {
        int idx = queue.Dequeue();
        int runTime = Math.Min(quantum, processes[idx].Remaining);
        time += runTime;
        processes[idx].Remaining -= runTime;
        if (processes[idx].Remaining > 0) {
            queue.Enqueue(idx);
        } else {
            processes[idx].Completion = time;
        }
    }
}`,
    lines: { start: [1, 2, 3], 'run-slice': [5, 6, 7, 8, 9, 10, 11, 12], done: [15] },
  },
  java: {
    code: `void roundRobin(List<Process> processes, int quantum) {
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < processes.size(); i++) queue.add(i);
    int time = 0;
    while (!queue.isEmpty()) {
        int idx = queue.poll();
        int runTime = Math.min(quantum, processes.get(idx).remaining);
        time += runTime;
        processes.get(idx).remaining -= runTime;
        if (processes.get(idx).remaining > 0) {
            queue.add(idx);
        } else {
            processes.get(idx).completion = time;
        }
    }
}`,
    lines: { start: [1, 2, 3, 4], 'run-slice': [6, 7, 8, 9, 10, 11, 12, 13, 14], done: [16] },
  },
  kotlin: {
    code: `fun roundRobin(processes: List<Process>, quantum: Int) {
    val queue: Queue<Int> = LinkedList((0 until processes.size).toList())
    var time = 0
    while (queue.isNotEmpty()) {
        val idx = queue.poll()
        val runTime = minOf(quantum, processes[idx].remaining)
        time += runTime
        processes[idx].remaining -= runTime
        if (processes[idx].remaining > 0) {
            queue.add(idx)
        } else {
            processes[idx].completion = time
        }
    }
}`,
    lines: { start: [1, 2, 3], 'run-slice': [5, 6, 7, 8, 9, 10, 11, 12], done: [15] },
  },
  swift: {
    code: `func roundRobin(_ processes: inout [Process], _ quantum: Int) {
    var queue = Array(0..<processes.count)
    var time = 0
    while !queue.isEmpty {
        let idx = queue.removeFirst()
        let runTime = min(quantum, processes[idx].remaining)
        time += runTime
        processes[idx].remaining -= runTime
        if processes[idx].remaining > 0 {
            queue.append(idx)
        } else {
            processes[idx].completion = time
        }
    }
}`,
    lines: { start: [1, 2, 3], 'run-slice': [5, 6, 7, 8, 9, 10, 11, 12], done: [15] },
  },
  javascript: {
    code: `function roundRobin(processes, quantum) {
  const queue = processes.map((_, i) => i);
  let time = 0;
  while (queue.length) {
    const idx = queue.shift();
    const runTime = Math.min(quantum, processes[idx].remaining);
    time += runTime;
    processes[idx].remaining -= runTime;
    if (processes[idx].remaining > 0) {
      queue.push(idx);
    } else {
      processes[idx].completion = time;
    }
  }
}`,
    lines: { start: [1, 2, 3], 'run-slice': [5, 6, 7, 8, 9, 10, 11, 12, 13], done: [15] },
  },
  typescript: {
    code: `function roundRobin(processes: Process[], quantum: number): void {
  const queue = processes.map((_, i) => i);
  let time = 0;
  while (queue.length) {
    const idx = queue.shift()!;
    const runTime = Math.min(quantum, processes[idx].remaining);
    time += runTime;
    processes[idx].remaining -= runTime;
    if (processes[idx].remaining > 0) {
      queue.push(idx);
    } else {
      processes[idx].completion = time;
    }
  }
}`,
    lines: { start: [1, 2, 3], 'run-slice': [5, 6, 7, 8, 9, 10, 11, 12, 13], done: [15] },
  },
  go: {
    code: `func roundRobin(processes []Process, quantum int) {
    queue := []int{}
    for i := range processes {
        queue = append(queue, i)
    }
    time := 0
    for len(queue) > 0 {
        idx := queue[0]
        queue = queue[1:]
        runTime := min(quantum, processes[idx].Remaining)
        time += runTime
        processes[idx].Remaining -= runTime
        if processes[idx].Remaining > 0 {
            queue = append(queue, idx)
        } else {
            processes[idx].Completion = time
        }
    }
}`,
    lines: { start: [1, 2, 3, 4, 5, 6], 'run-slice': [8, 9, 10, 11, 12, 13, 14, 15, 16], done: [19] },
  },
  rust: {
    code: `fn round_robin(processes: &mut Vec<Process>, quantum: i32) {
    let mut queue: VecDeque<usize> = (0..processes.len()).collect();
    let mut time = 0;
    while let Some(idx) = queue.pop_front() {
        let run_time = quantum.min(processes[idx].remaining);
        time += run_time;
        processes[idx].remaining -= run_time;
        if processes[idx].remaining > 0 {
            queue.push_back(idx);
        } else {
            processes[idx].completion = time;
        }
    }
}`,
    lines: { start: [1, 2, 3], 'run-slice': [4, 5, 6, 7, 8, 9, 10, 11], done: [14] },
  },
  php: {
    code: `function roundRobin(array $processes, int $quantum): void {
    $queue = array_keys($processes);
    $time = 0;
    while (!empty($queue)) {
        $idx = array_shift($queue);
        $runTime = min($quantum, $processes[$idx]->remaining);
        $time += $runTime;
        $processes[$idx]->remaining -= $runTime;
        if ($processes[$idx]->remaining > 0) {
            $queue[] = $idx;
        } else {
            $processes[$idx]->completion = $time;
        }
    }
}`,
    lines: { start: [1, 2, 3], 'run-slice': [5, 6, 7, 8, 9, 10, 11, 12], done: [15] },
  },
};
