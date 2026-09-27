/**
 * SimulationEngine — the Subject in an Observer-pattern implementation.
 * It holds a pre-computed sequence of state snapshots (Memento pattern):
 * each snapshot is an immutable description of the data structure at one
 * step of the algorithm's execution. Moving forward/backward simply swaps
 * the active snapshot instead of re-running the algorithm, which is what
 * enables instant, accurate "step backward" navigation.
 */
class SimulationEngine {
  constructor(snapshots = []) {
    this.snapshots = snapshots;
    this.index = 0;
    this.playing = false;
    this.speed = 1;
    this.timer = null;
    this.observers = new Set();
  }

  subscribe(observer) {
    this.observers.add(observer);
    observer(this.getState());
    return () => this.observers.delete(observer);
  }

  notify() {
    const state = this.getState();
    this.observers.forEach((observer) => observer(state));
  }

  getState() {
    return {
      index: this.index,
      total: this.snapshots.length,
      snapshot: this.snapshots[this.index] || null,
      playing: this.playing,
      speed: this.speed,
      isFirst: this.index === 0,
      isLast: this.index >= this.snapshots.length - 1,
    };
  }

  setSnapshots(snapshots) {
    this.pause();
    this.snapshots = snapshots;
    this.index = 0;
    this.notify();
  }

  goTo(index) {
    const clamped = Math.max(0, Math.min(index, this.snapshots.length - 1));
    if (clamped === this.index) return;
    this.index = clamped;
    this.notify();
  }

  stepForward() {
    if (this.index >= this.snapshots.length - 1) {
      this.pause();
      return;
    }
    this.index += 1;
    this.notify();
  }

  stepBackward() {
    if (this.index <= 0) return;
    this.index -= 1;
    this.notify();
  }

  reset() {
    this.pause();
    this.index = 0;
    this.notify();
  }

  setSpeed(speed) {
    this.speed = speed;
    if (this.playing) {
      this.play();
    } else {
      this.notify();
    }
  }

  play() {
    this.pause();
    this.playing = true;
    const delay = Math.max(120, 900 / this.speed);
    this.timer = setInterval(() => {
      if (this.index >= this.snapshots.length - 1) {
        this.pause();
        return;
      }
      this.index += 1;
      this.notify();
    }, delay);
    this.notify();
  }

  pause() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    if (this.playing) {
      this.playing = false;
      this.notify();
    }
  }

  destroy() {
    this.pause();
    this.observers.clear();
  }
}

export default SimulationEngine;
