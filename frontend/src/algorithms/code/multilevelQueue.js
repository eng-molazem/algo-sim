export default {
  python: {
    code: `def multilevel_queue(processes, quantum):
    high = sorted([p for p in processes if p.priority == 0], key=lambda p: p.arrival)
    low = [p for p in processes if p.priority != 0]
    time = 0
    for p in high:
        start = max(time, p.arrival)
        p.completion = start + p.burst
        time = p.completion
    queue = deque(low)
    while queue:
        p = queue.popleft()
        run_time = min(quantum, p.remaining)
        time += run_time
        p.remaining -= run_time
        if p.remaining > 0:
            queue.append(p)
        else:
            p.completion = time
    return processes`,
    lines: { start: [1, 2, 3, 4], 'run-high-queue': [5, 6, 7, 8], 'run-low-queue': [10, 11, 12, 13, 14, 15, 16, 17, 18], done: [19] },
  },
  c: {
    code: `void multilevelQueue(Process procs[], int n, int quantum) {
    int time = 0;
    for (int i = 0; i < n; i++) {
        if (procs[i].priority == 0) {
            int start = (time > procs[i].arrival) ? time : procs[i].arrival;
            procs[i].completion = start + procs[i].burst;
            time = procs[i].completion;
        }
    }
    int queue[100], front = 0, back = 0;
    for (int i = 0; i < n; i++) {
        if (procs[i].priority != 0) queue[back++] = i;
    }
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
    lines: {
      start: [1, 2],
      'run-high-queue': [3, 4, 5, 6, 7, 8, 9],
      'run-low-queue': [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      done: [25],
    },
  },
  cpp: {
    code: `void multilevelQueue(vector<Process>& processes, int quantum) {
    int time = 0;
    for (auto& p : processes) {
        if (p.priority == 0) {
            int start = max(time, p.arrival);
            p.completion = start + p.burst;
            time = p.completion;
        }
    }
    queue<int> q;
    for (int i = 0; i < (int)processes.size(); i++) {
        if (processes[i].priority != 0) q.push(i);
    }
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
    lines: {
      start: [1, 2],
      'run-high-queue': [3, 4, 5, 6, 7, 8, 9],
      'run-low-queue': [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      done: [25],
    },
  },
  csharp: {
    code: `void MultilevelQueue(List<Process> processes, int quantum) {
    int time = 0;
    foreach (var p in processes) {
        if (p.Priority == 0) {
            int start = Math.Max(time, p.Arrival);
            p.Completion = start + p.Burst;
            time = p.Completion;
        }
    }
    var queue = new Queue<int>();
    for (int i = 0; i < processes.Count; i++) {
        if (processes[i].Priority != 0) queue.Enqueue(i);
    }
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
    lines: {
      start: [1, 2],
      'run-high-queue': [3, 4, 5, 6, 7, 8, 9],
      'run-low-queue': [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      done: [25],
    },
  },
  java: {
    code: `void multilevelQueue(List<Process> processes, int quantum) {
    int time = 0;
    for (Process p : processes) {
        if (p.priority == 0) {
            int start = Math.max(time, p.arrival);
            p.completion = start + p.burst;
            time = p.completion;
        }
    }
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < processes.size(); i++) {
        if (processes.get(i).priority != 0) queue.add(i);
    }
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
    lines: {
      start: [1, 2],
      'run-high-queue': [3, 4, 5, 6, 7, 8, 9],
      'run-low-queue': [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      done: [25],
    },
  },
  kotlin: {
    code: `fun multilevelQueue(processes: List<Process>, quantum: Int) {
    var time = 0
    for (p in processes) {
        if (p.priority == 0) {
            val start = maxOf(time, p.arrival)
            p.completion = start + p.burst
            time = p.completion
        }
    }
    val queue: Queue<Int> = LinkedList()
    for (i in processes.indices) {
        if (processes[i].priority != 0) queue.add(i)
    }
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
    lines: {
      start: [1, 2],
      'run-high-queue': [3, 4, 5, 6, 7, 8, 9],
      'run-low-queue': [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      done: [25],
    },
  },
  swift: {
    code: `func multilevelQueue(_ processes: inout [Process], _ quantum: Int) {
    var time = 0
    for i in 0..<processes.count where processes[i].priority == 0 {
        let start = max(time, processes[i].arrival)
        processes[i].completion = start + processes[i].burst
        time = processes[i].completion
    }
    var queue = processes.indices.filter { processes[$0].priority != 0 }
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
    lines: { start: [1, 2], 'run-high-queue': [3, 4, 5, 6, 7], 'run-low-queue': [9, 10, 11, 12, 13, 14, 15, 16, 17, 18], done: [20] },
  },
  javascript: {
    code: `function multilevelQueue(processes, quantum) {
  let time = 0;
  processes.forEach((p) => {
    if (p.priority === 0) {
      const start = Math.max(time, p.arrival);
      p.completion = start + p.burst;
      time = p.completion;
    }
  });
  const queue = processes.filter((p) => p.priority !== 0).map((p) => p.id);
  while (queue.length) {
    const id = queue.shift();
    const p = processes.find((x) => x.id === id);
    const runTime = Math.min(quantum, p.remaining);
    time += runTime;
    p.remaining -= runTime;
    if (p.remaining > 0) {
      queue.push(id);
    } else {
      p.completion = time;
    }
  }
}`,
    lines: {
      start: [1, 2],
      'run-high-queue': [3, 4, 5, 6, 7, 8, 9],
      'run-low-queue': [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      done: [23],
    },
  },
  typescript: {
    code: `function multilevelQueue(processes: Process[], quantum: number): void {
  let time = 0;
  processes.forEach((p) => {
    if (p.priority === 0) {
      const start = Math.max(time, p.arrival);
      p.completion = start + p.burst;
      time = p.completion;
    }
  });
  const queue = processes.filter((p) => p.priority !== 0).map((p) => p.id);
  while (queue.length) {
    const id = queue.shift()!;
    const p = processes.find((x) => x.id === id)!;
    const runTime = Math.min(quantum, p.remaining);
    time += runTime;
    p.remaining -= runTime;
    if (p.remaining > 0) {
      queue.push(id);
    } else {
      p.completion = time;
    }
  }
}`,
    lines: {
      start: [1, 2],
      'run-high-queue': [3, 4, 5, 6, 7, 8, 9],
      'run-low-queue': [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      done: [23],
    },
  },
  go: {
    code: `func multilevelQueue(processes []Process, quantum int) {
    time := 0
    for i := range processes {
        if processes[i].Priority == 0 {
            start := max(time, processes[i].Arrival)
            processes[i].Completion = start + processes[i].Burst
            time = processes[i].Completion
        }
    }
    queue := []int{}
    for i := range processes {
        if processes[i].Priority != 0 {
            queue = append(queue, i)
        }
    }
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
    lines: {
      start: [1, 2],
      'run-high-queue': [3, 4, 5, 6, 7, 8, 9],
      'run-low-queue': [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
      done: [28],
    },
  },
  rust: {
    code: `fn multilevel_queue(processes: &mut Vec<Process>, quantum: i32) {
    let mut time = 0;
    for p in processes.iter_mut() {
        if p.priority == 0 {
            let start = time.max(p.arrival);
            p.completion = start + p.burst;
            time = p.completion;
        }
    }
    let mut queue: VecDeque<usize> = (0..processes.len())
        .filter(|&i| processes[i].priority != 0)
        .collect();
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
    lines: {
      start: [1, 2],
      'run-high-queue': [3, 4, 5, 6, 7, 8, 9],
      'run-low-queue': [13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      done: [23],
    },
  },
  php: {
    code: `function multilevelQueue(array $processes, int $quantum): void {
    $time = 0;
    foreach ($processes as $p) {
        if ($p->priority === 0) {
            $start = max($time, $p->arrival);
            $p->completion = $start + $p->burst;
            $time = $p->completion;
        }
    }
    $queue = array_values(array_filter($processes, fn($p) => $p->priority !== 0));
    while (!empty($queue)) {
        $p = array_shift($queue);
        $runTime = min($quantum, $p->remaining);
        $time += $runTime;
        $p->remaining -= $runTime;
        if ($p->remaining > 0) {
            $queue[] = $p;
        } else {
            $p->completion = $time;
        }
    }
}`,
    lines: {
      start: [1, 2],
      'run-high-queue': [3, 4, 5, 6, 7, 8, 9],
      'run-low-queue': [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      done: [22],
    },
  },
};
