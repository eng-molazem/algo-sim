export default {
  python: {
    code: `def fcfs(processes):
    processes.sort(key=lambda p: p.arrival)
    time = 0
    for p in processes:
        start = max(time, p.arrival)
        end = start + p.burst
        p.completion = end
        time = end
    return processes`,
    lines: { start: [1, 2, 3], 'run-process': [5, 6, 7, 8], done: [9] },
  },
  c: {
    code: `void fcfs(Process procs[], int n) {
    int time = 0;
    for (int i = 0; i < n; i++) {
        int start = (time > procs[i].arrival) ? time : procs[i].arrival;
        int end = start + procs[i].burst;
        procs[i].completion = end;
        time = end;
    }
}`,
    lines: { start: [1, 2, 3], 'run-process': [4, 5, 6, 7], done: [9] },
  },
  cpp: {
    code: `void fcfs(vector<Process>& processes) {
    sort(processes.begin(), processes.end(),
         [](auto& a, auto& b) { return a.arrival < b.arrival; });
    int time = 0;
    for (auto& p : processes) {
        int start = max(time, p.arrival);
        int end = start + p.burst;
        p.completion = end;
        time = end;
    }
}`,
    lines: { start: [1, 2, 3, 4], 'run-process': [6, 7, 8, 9], done: [11] },
  },
  csharp: {
    code: `void Fcfs(List<Process> processes) {
    processes.Sort((a, b) => a.Arrival.CompareTo(b.Arrival));
    int time = 0;
    foreach (var p in processes) {
        int start = Math.Max(time, p.Arrival);
        int end = start + p.Burst;
        p.Completion = end;
        time = end;
    }
}`,
    lines: { start: [1, 2, 3], 'run-process': [5, 6, 7, 8], done: [10] },
  },
  java: {
    code: `void fcfs(List<Process> processes) {
    processes.sort(Comparator.comparingInt(p -> p.arrival));
    int time = 0;
    for (Process p : processes) {
        int start = Math.max(time, p.arrival);
        int end = start + p.burst;
        p.completion = end;
        time = end;
    }
}`,
    lines: { start: [1, 2, 3], 'run-process': [5, 6, 7, 8], done: [10] },
  },
  kotlin: {
    code: `fun fcfs(processes: List<Process>) {
    val sorted = processes.sortedBy { it.arrival }
    var time = 0
    for (p in sorted) {
        val start = maxOf(time, p.arrival)
        val end = start + p.burst
        p.completion = end
        time = end
    }
}`,
    lines: { start: [1, 2, 3], 'run-process': [5, 6, 7, 8], done: [10] },
  },
  swift: {
    code: `func fcfs(_ processes: inout [Process]) {
    processes.sort { $0.arrival < $1.arrival }
    var time = 0
    for i in 0..<processes.count {
        let start = max(time, processes[i].arrival)
        let end = start + processes[i].burst
        processes[i].completion = end
        time = end
    }
}`,
    lines: { start: [1, 2, 3], 'run-process': [5, 6, 7, 8], done: [10] },
  },
  javascript: {
    code: `function fcfs(processes) {
  processes.sort((a, b) => a.arrival - b.arrival);
  let time = 0;
  processes.forEach((p) => {
    const start = Math.max(time, p.arrival);
    const end = start + p.burst;
    p.completion = end;
    time = end;
  });
  return processes;
}`,
    lines: { start: [1, 2, 3], 'run-process': [5, 6, 7, 8], done: [11] },
  },
  typescript: {
    code: `function fcfs(processes: Process[]): Process[] {
  processes.sort((a, b) => a.arrival - b.arrival);
  let time = 0;
  processes.forEach((p) => {
    const start = Math.max(time, p.arrival);
    const end = start + p.burst;
    p.completion = end;
    time = end;
  });
  return processes;
}`,
    lines: { start: [1, 2, 3], 'run-process': [5, 6, 7, 8], done: [11] },
  },
  go: {
    code: `func fcfs(processes []Process) {
    sort.Slice(processes, func(i, j int) bool {
        return processes[i].Arrival < processes[j].Arrival
    })
    time := 0
    for i := range processes {
        start := max(time, processes[i].Arrival)
        end := start + processes[i].Burst
        processes[i].Completion = end
        time = end
    }
}`,
    lines: { start: [1, 2, 3, 4, 5], 'run-process': [7, 8, 9, 10], done: [12] },
  },
  rust: {
    code: `fn fcfs(processes: &mut Vec<Process>) {
    processes.sort_by_key(|p| p.arrival);
    let mut time = 0;
    for p in processes.iter_mut() {
        let start = time.max(p.arrival);
        let end = start + p.burst;
        p.completion = end;
        time = end;
    }
}`,
    lines: { start: [1, 2, 3], 'run-process': [5, 6, 7, 8], done: [10] },
  },
  php: {
    code: `function fcfs(array $processes): array {
    usort($processes, fn($a, $b) => $a->arrival <=> $b->arrival);
    $time = 0;
    foreach ($processes as $p) {
        $start = max($time, $p->arrival);
        $end = $start + $p->burst;
        $p->completion = $end;
        $time = $end;
    }
    return $processes;
}`,
    lines: { start: [1, 2, 3], 'run-process': [5, 6, 7, 8], done: [11] },
  },
};
