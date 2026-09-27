import GIF from 'gif.js';
import html2canvas from 'html2canvas';
import gifWorkerUrl from 'gif.js/dist/gif.worker.js?url';

const MAX_FRAMES = 40;

function pickFrameIndices(total) {
  if (total <= MAX_FRAMES) return Array.from({ length: total }, (_, i) => i);
  const step = (total - 1) / (MAX_FRAMES - 1);
  return Array.from({ length: MAX_FRAMES }, (_, i) => Math.round(i * step));
}

/**
 * Captures a DOM element at each (sampled) simulation step and encodes the
 * frames into an animated GIF entirely client-side, using gif.js's worker.
 * `goTo` must synchronously request a snapshot change; we wait a tick for
 * React to re-render before each capture.
 */
export async function exportSimulationAsGif({ element, total, goTo, restoreIndex, onProgress, fileName = 'simulation' }) {
  const indices = pickFrameIndices(total);
  const gif = new GIF({
    workers: 2,
    quality: 10,
    workerScript: gifWorkerUrl,
    width: element.offsetWidth,
    height: element.offsetHeight,
  });

  for (let i = 0; i < indices.length; i += 1) {
    goTo(indices[i]);
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 60)));
    // eslint-disable-next-line no-await-in-loop
    const canvas = await html2canvas(element, { backgroundColor: null, scale: 1 });
    gif.addFrame(canvas, { delay: 350 });
    onProgress?.(Math.round(((i + 1) / indices.length) * 100));
  }

  restoreIndex();

  return new Promise((resolve) => {
    gif.on('finished', (blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.gif`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      resolve();
    });
    gif.render();
  });
}
