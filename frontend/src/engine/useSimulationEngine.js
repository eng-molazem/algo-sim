import { useEffect, useMemo, useRef, useState } from 'react';
import SimulationEngine from './SimulationEngine';

export default function useSimulationEngine(snapshots) {
  const engineRef = useRef(null);
  if (!engineRef.current) engineRef.current = new SimulationEngine(snapshots);
  const engine = engineRef.current;

  const [state, setState] = useState(engine.getState());

  useEffect(() => {
    const unsubscribe = engine.subscribe(setState);
    return unsubscribe;
  }, [engine]);

  useEffect(() => {
    engine.setSnapshots(snapshots);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshots]);

  useEffect(() => () => engine.destroy(), [engine]);

  const controls = useMemo(
    () => ({
      play: () => engine.play(),
      pause: () => engine.pause(),
      stepForward: () => engine.stepForward(),
      stepBackward: () => engine.stepBackward(),
      reset: () => engine.reset(),
      goTo: (i) => engine.goTo(i),
      setSpeed: (s) => engine.setSpeed(s),
    }),
    [engine]
  );

  return { ...state, ...controls };
}
