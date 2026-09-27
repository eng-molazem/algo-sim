export default {
  python: {
    code: `def srtf(processes):
    time = 0
    completed = 0
    n = len(processes)
    for p in processes:
        p.remaining = p.burst
    while completed < n:
        ready = [p for p in processes if p.arrival <= time and p.remaining > 0]
        if not ready:
            time += 1
            continue
        current = min(ready, key=lambda p: p.remaining)
        current.remaining -= 1
        time += 1
        if current.remaining == 0:
            current.completion = time
            completed += 1
    return processes`,
    lines: { start: [1, 2, 3, 4, 5, 6], 'run-unit': [8, 12, 13, 14, 15, 16, 17], done: [18] },
  },
  c: {
    code: `void srtf(Process procs[], int n) {
    int time = 0, completed = 0;
    for (int i = 0; i < n; i++) procs[i].remaining = procs[i].burst;
    while (completed < n) {
        int idx = pickShortestRemaining(procs, n, time);
        if (idx == -1) { time++; continue; }
        procs[idx].remaining--;
        time++;
        if (procs[idx].remaining == 0) {
            procs[idx].completion = time;
            completed++;
        }
    }
}`,
    lines: { start: [1, 2, 3], 'run-unit': [5, 6, 7, 8, 9, 10, 11, 12], done: [14] },
  },
  cpp: {
    code: `void srtf(vector<Process>& processes) {
    int time = 0, completed = 0;
    for (auto& p : processes) p.remaining = p.burst;
    while (completed < (int)processes.size()) {
        int idx = pickShortestRemaining(processes, time);
        if (idx == -1) { time++; continue; }
        processes[idx].remaining--;
        time++;
        if (processes[idx].remaining == 0) {
            processes[idx].completion = time;
            completed++;
        }
    }
}`,
    lines: { start: [1, 2, 3], 'run-unit': [5, 6, 7, 8, 9, 10, 11, 12], done: [14] },
  },
  csharp: {
    code: `void Srtf(List<Process> processes) {
    int time = 0, completed = 0;
    foreach (var p in processes) p.Remaining = p.Burst;
    while (completed < processes.Count) {
        int idx = PickShortestRemaining(processes, time);
        if (idx == -1) { time++; continue; }
        processes[idx].Remaining--;
        time++;
        if (processes[idx].Remaining == 0) {
            processes[idx].Completion = time;
            completed++;
        }
    }
}`,
    lines: { start: [1, 2, 3], 'run-unit': [5, 6, 7, 8, 9, 10, 11, 12], done: [14] },
  },
  java: {
    code: `void srtf(List<Process> processes) {
    int time = 0, completed = 0;
    for (Process p : processes) p.remaining = p.burst;
    while (completed < processes.size()) {
        int idx = pickShortestRemaining(processes, time);
        if (idx == -1) { time++; continue; }
        processes.get(idx).remaining--;
        time++;
        if (processes.get(idx).remaining == 0) {
            processes.get(idx).completion = time;
            completed++;
        }
    }
}`,
    lines: { start: [1, 2, 3], 'run-unit': [5, 6, 7, 8, 9, 10, 11, 12], done: [14] },
  },
  kotlin: {
    code: `fun srtf(processes: List<Process>) {
    var time = 0
    var completed = 0
    processes.forEach { it.remaining = it.burst }
    while (completed < processes.size) {
        val idx = pickShortestRemaining(processes, time)
        if (idx == -1) { time++; continue }
        processes[idx].remaining--
        time++
        if (processes[idx].remaining == 0) {
            processes[idx].completion = time
            completed++
        }
    }
}`,
    lines: { start: [1, 2, 3, 4], 'run-unit': [5, 6, 7, 8, 9, 10, 11, 12], done: [14] },
  },
  swift: {
    code: `func srtf(_ processes: inout [Process]) {
    var time = 0
    var completed = 0
    for i in 0..<processes.count { processes[i].remaining = processes[i].burst }
    while completed < processes.count {
        guard let idx = pickShortestRemaining(processes, time) else { time += 1; continue }
        processes[idx].remaining -= 1
        time += 1
        if processes[idx].remaining == 0 {
            processes[idx].completion = time
            completed += 1
        }
    }
}`,
    lines: { start: [1, 2, 3, 4], 'run-unit': [5, 6, 7, 8, 9, 10, 11, 12], done: [14] },
  },
  javascript: {
    code: `function srtf(processes) {
  let time = 0;
  let completed = 0;
  processes.forEach((p) => { p.remaining = p.burst; });
  while (completed < processes.length) {
    const idx = pickShortestRemaining(processes, time);
    if (idx === -1) { time++; continue; }
    processes[idx].remaining--;
    time++;
    if (processes[idx].remaining === 0) {
      processes[idx].completion = time;
      completed++;
    }
  }
  return processes;
}`,
    lines: { start: [1, 2, 3, 4], 'run-unit': [6, 7, 8, 9, 10, 11, 12, 13], done: [15, 16] },
  },
  typescript: {
    code: `function srtf(processes: Process[]): Process[] {
  let time = 0;
  let completed = 0;
  processes.forEach((p) => { p.remaining = p.burst; });
  while (completed < processes.length) {
    const idx = pickShortestRemaining(processes, time);
    if (idx === -1) { time++; continue; }
    processes[idx].remaining--;
    time++;
    if (processes[idx].remaining === 0) {
      processes[idx].completion = time;
      completed++;
    }
  }
  return processes;
}`,
    lines: { start: [1, 2, 3, 4], 'run-unit': [6, 7, 8, 9, 10, 11, 12, 13], done: [15, 16] },
  },
  go: {
    code: `func srtf(processes []Process) {
    time := 0
    completed := 0
    for i := range processes {
        processes[i].Remaining = processes[i].Burst
    }
    for completed < len(processes) {
        idx := pickShortestRemaining(processes, time)
        if idx == -1 {
            time++
            continue
        }
        processes[idx].Remaining--
        time++
        if processes[idx].Remaining == 0 {
            processes[idx].Completion = time
            completed++
        }
    }
}`,
    lines: { start: [1, 2, 3, 4, 5, 6], 'run-unit': [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], done: [20] },
  },
  rust: {
    code: `fn srtf(processes: &mut Vec<Process>) {
    let mut time = 0;
    let mut completed = 0;
    for p in processes.iter_mut() {
        p.remaining = p.burst;
    }
    while completed < processes.len() {
        match pick_shortest_remaining(processes, time) {
            None => { time += 1; continue; }
            Some(idx) => {
                processes[idx].remaining -= 1;
                time += 1;
                if processes[idx].remaining == 0 {
                    processes[idx].completion = time;
                    completed += 1;
                }
            }
        }
    }
}`,
    lines: { start: [1, 2, 3, 4, 5, 6], 'run-unit': [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], done: [20] },
  },
  php: {
    code: `function srtf(array $processes): array {
    $time = 0;
    $completed = 0;
    foreach ($processes as $p) { $p->remaining = $p->burst; }
    while ($completed < count($processes)) {
        $idx = pickShortestRemaining($processes, $time);
        if ($idx === -1) { $time++; continue; }
        $processes[$idx]->remaining--;
        $time++;
        if ($processes[$idx]->remaining === 0) {
            $processes[$idx]->completion = $time;
            $completed++;
        }
    }
    return $processes;
}`,
    lines: { start: [1, 2, 3, 4], 'run-unit': [6, 7, 8, 9, 10, 11, 12, 13], done: [15, 16] },
  },
};
