import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { exportSimulationAsGif } from '../utils/gifExporter';

export default function GifExportButton({ elementRef, engine, fileName }) {
  const { t } = useLanguage();
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  async function handleExport() {
    if (!elementRef.current || exporting || engine.total < 2) return;
    setExporting(true);
    setProgress(0);
    const startIndex = engine.index;
    try {
      await exportSimulationAsGif({
        element: elementRef.current,
        total: engine.total,
        goTo: engine.goTo,
        restoreIndex: () => engine.goTo(startIndex),
        onProgress: setProgress,
        fileName,
      });
    } finally {
      setExporting(false);
    }
  }

  return (
    <button type="button" onClick={handleExport} disabled={exporting} className="btn-outline !py-1.5 text-xs">
      {exporting ? `⏳ ${t('run.exportingGif')} ${progress}%` : `🎬 ${t('run.exportGif')}`}
    </button>
  );
}
