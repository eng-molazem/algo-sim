export default {
  python: {
    code: `def priority_scheduling(processes):
    time = 0
    completed = []
    while len(completed) < len(processes):
        ready = [p for p in processes
                 if p not in completed and p.arrival <= time]
        chosen = min(ready, key=lambda p: p.priority)
        chosen.completion = time + chosen.burst
        time = chosen.completion
        completed.append(chosen)
    return completed`,
    lines: { start: [1, 2, 3, 4], 'pick-priority': [7, 8, 9, 10], done: [11] },
  },
  c: {
    code: `void priorityScheduling(Process procs[], int n) {
    int time = 0, done = 0;
    int finished[100] = {0};
    while (done < n) {
        int idx = pickHighestPriorityReady(procs, finished, n, time);
        procs[idx].completion = time + procs[idx].burst;
        time = procs[idx].completion;
        finished[idx] = 1;
        done++;
    }
}`,
    lines: { start: [1, 2, 3, 4], 'pick-priority': [5, 6, 7, 8, 9], done: [11] },
  },
  cpp: {
    code: `void priorityScheduling(vector<Process>& processes) {
    int time = 0, done = 0;
    vector<bool> finished(processes.size(), false);
    while (done < (int)processes.size()) {
        int idx = pickHighestPriorityReady(processes, finished, time);
        auto& p = processes[idx];
        p.completion = time + p.burst;
        time = p.completion;
        finished[idx] = true;
        done++;
    }
}`,
    lines: { start: [1, 2, 3, 4], 'pick-priority': [5, 6, 7, 8, 9, 10], done: [12] },
  },
  csharp: {
    code: `void PriorityScheduling(List<Process> processes) {
    int time = 0, done = 0;
    var finished = new bool[processes.Count];
    while (done < processes.Count) {
        int idx = PickHighestPriorityReady(processes, finished, time);
        var p = processes[idx];
        p.Completion = time + p.Burst;
        time = p.Completion;
        finished[idx] = true;
        done++;
    }
}`,
    lines: { start: [1, 2, 3, 4], 'pick-priority': [5, 6, 7, 8, 9, 10], done: [12] },
  },
  java: {
    code: `void priorityScheduling(List<Process> processes) {
    int time = 0, done = 0;
    boolean[] finished = new boolean[processes.size()];
    while (done < processes.size()) {
        int idx = pickHighestPriorityReady(processes, finished, time);
        Process p = processes.get(idx);
        p.completion = time + p.burst;
        time = p.completion;
        finished[idx] = true;
        done++;
    }
}`,
    lines: { start: [1, 2, 3, 4], 'pick-priority': [5, 6, 7, 8, 9, 10], done: [12] },
  },
  kotlin: {
    code: `fun priorityScheduling(processes: List<Process>) {
    var time = 0
    var done = 0
    val finished = BooleanArray(processes.size)
    while (done < processes.size) {
        val idx = pickHighestPriorityReady(processes, finished, time)
        val p = processes[idx]
        p.completion = time + p.burst
        time = p.completion
        finished[idx] = true
        done++
    }
}`,
    lines: { start: [1, 2, 3, 4, 5], 'pick-priority': [6, 7, 8, 9, 10, 11], done: [13] },
  },
  swift: {
    code: `func priorityScheduling(_ processes: inout [Process]) {
    var time = 0
    var done = 0
    var finished = [Bool](repeating: false, count: processes.count)
    while done < processes.count {
        let idx = pickHighestPriorityReady(processes, finished, time)
        processes[idx].completion = time + processes[idx].burst
        time = processes[idx].completion
        finished[idx] = true
        done += 1
    }
}`,
    lines: { start: [1, 2, 3, 4, 5], 'pick-priority': [6, 7, 8, 9, 10], done: [12] },
  },
  javascript: {
    code: `function priorityScheduling(processes) {
  let time = 0;
  const completed = [];
  while (completed.length < processes.length) {
    const ready = processes.filter(
      (p) => !completed.includes(p) && p.arrival <= time
    );
    const chosen = ready.reduce((a, b) => (a.priority < b.priority ? a : b));
    chosen.completion = time + chosen.burst;
    time = chosen.completion;
    completed.push(chosen);
  }
  return completed;
}`,
    lines: { start: [1, 2, 3, 4], 'pick-priority': [8, 9, 10, 11], done: [14] },
  },
  typescript: {
    code: `function priorityScheduling(processes: Process[]): Process[] {
  let time = 0;
  const completed: Process[] = [];
  while (completed.length < processes.length) {
    const ready = processes.filter(
      (p) => !completed.includes(p) && p.arrival <= time
    );
    const chosen = ready.reduce((a, b) => (a.priority < b.priority ? a : b));
    chosen.completion = time + chosen.burst;
    time = chosen.completion;
    completed.push(chosen);
  }
  return completed;
}`,
    lines: { start: [1, 2, 3, 4], 'pick-priority': [8, 9, 10, 11], done: [14] },
  },
  go: {
    code: `func priorityScheduling(processes []Process) {
    time := 0
    done := 0
    finished := make([]bool, len(processes))
    for done < len(processes) {
        idx := pickHighestPriorityReady(processes, finished, time)
        processes[idx].Completion = time + processes[idx].Burst
        time = processes[idx].Completion
        finished[idx] = true
        done++
    }
}`,
    lines: { start: [1, 2, 3, 4, 5], 'pick-priority': [6, 7, 8, 9, 10], done: [12] },
  },
  rust: {
    code: `fn priority_scheduling(processes: &mut Vec<Process>) {
    let mut time = 0;
    let mut done = 0;
    let mut finished = vec![false; processes.len()];
    while done < processes.len() {
        let idx = pick_highest_priority_ready(processes, &finished, time);
        processes[idx].completion = time + processes[idx].burst;
        time = processes[idx].completion;
        finished[idx] = true;
        done += 1;
    }
}`,
    lines: { start: [1, 2, 3, 4, 5], 'pick-priority': [6, 7, 8, 9, 10], done: [12] },
  },
  php: {
    code: `function priorityScheduling(array $processes): array {
    $time = 0;
    $completed = [];
    while (count($completed) < count($processes)) {
        $ready = array_filter($processes, fn($p) =>
            !in_array($p, $completed, true) && $p->arrival <= $time);
        usort($ready, fn($a, $b) => $a->priority <=> $b->priority);
        $chosen = $ready[0];
        $chosen->completion = $time + $chosen->burst;
        $time = $chosen->completion;
        $completed[] = $chosen;
    }
    return $completed;
}`,
    lines: { start: [1, 2, 3, 4], 'pick-priority': [7, 8, 9, 10, 11], done: [14] },
  },
};
