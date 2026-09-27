import ArrayVisualizer from './visualizers/ArrayVisualizer';
import SearchVisualizer from './visualizers/SearchVisualizer';
import GanttVisualizer from './visualizers/GanttVisualizer';
import StackVisualizer from './visualizers/StackVisualizer';
import QueueVisualizer from './visualizers/QueueVisualizer';
import LinkedListVisualizer from './visualizers/LinkedListVisualizer';
import TreeVisualizer from './visualizers/TreeVisualizer';
import GraphVisualizer from './visualizers/GraphVisualizer';
import DPVisualizer from './visualizers/DPVisualizer';
import HashingVisualizer from './visualizers/HashingVisualizer';

export default function SimulationVisualizer({ category, snapshot, processIds }) {
  switch (category) {
    case 'sorting':
      return <ArrayVisualizer snapshot={snapshot} />;
    case 'searching':
      return <SearchVisualizer snapshot={snapshot} />;
    case 'scheduling':
      return <GanttVisualizer snapshot={snapshot} processIds={processIds} />;
    case 'stack':
      return <StackVisualizer snapshot={snapshot} />;
    case 'queue':
      return <QueueVisualizer snapshot={snapshot} />;
    case 'linkedList':
      return <LinkedListVisualizer snapshot={snapshot} />;
    case 'tree':
      return <TreeVisualizer snapshot={snapshot} />;
    case 'graph':
      return <GraphVisualizer snapshot={snapshot} />;
    case 'dp':
      return <DPVisualizer snapshot={snapshot} />;
    case 'hashing':
      return <HashingVisualizer snapshot={snapshot} />;
    default:
      return null;
  }
}
