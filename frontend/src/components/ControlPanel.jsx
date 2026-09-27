import { useLanguage } from '../i18n/LanguageContext';

export default function ControlPanel({
  playing,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  index,
  total,
  speed,
  onSpeedChange,
  isFirst,
  isLast,
  instructorMode,
}) {
  const { t } = useLanguage();
  const btnSize = instructorMode ? 'text-lg px-6 py-3' : '';

  return (
    <div className="card flex flex-col gap-4 p-4">
      <div dir="ltr" className="flex flex-wrap items-center justify-center gap-2">
        <button
          className={`btn-outline ${btnSize}`}
          onClick={onStepBackward}
          disabled={isFirst}
          title={t('controls.stepBackward')}
        >
          ⏮ {instructorMode && t('controls.stepBackward')}
        </button>
        {playing ? (
          <button className={`btn-secondary ${btnSize}`} onClick={onPause}>
            ⏸ {t('controls.pause')}
          </button>
        ) : (
          <button className={`btn-primary ${btnSize}`} onClick={onPlay} disabled={isLast}>
            ▶ {t('controls.play')}
          </button>
        )}
        <button
          className={`btn-outline ${btnSize}`}
          onClick={onStepForward}
          disabled={isLast}
          title={t('controls.stepForward')}
        >
          {instructorMode && t('controls.stepForward')} ⏭
        </button>
        <button className={`btn-secondary ${btnSize}`} onClick={onReset}>
          ↺ {t('controls.reset')}
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
        <span>
          {t('controls.step')} {index + 1} {t('controls.of')} {total}
        </span>
        {!instructorMode && (
          <label className="flex items-center gap-2">
            {t('controls.speed')}
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
            />
          </label>
        )}
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-200"
          style={{ width: `${total > 1 ? (index / (total - 1)) * 100 : 0}%` }}
        />
      </div>
    </div>
  );
}
