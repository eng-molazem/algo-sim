import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildChallenge(category, currentSnapshot, nextSnapshot, processIds) {
  if (!nextSnapshot) return null;

  if ((category === 'sorting' || category === 'searching') && Array.isArray(nextSnapshot.comparing) && nextSnapshot.comparing.length) {
    const correct = nextSnapshot.comparing[0];
    const arrLen = (currentSnapshot?.array || []).length;
    if (arrLen < 2) return null;
    const options = new Set([correct]);
    let guardCount = 0;
    while (options.size < Math.min(3, arrLen) && guardCount < 20) {
      options.add(Math.floor(Math.random() * arrLen));
      guardCount += 1;
    }
    return { questionKey: 'compareIndex', options: shuffle([...options]), correct };
  }

  if ((category === 'stack' || category === 'queue') && nextSnapshot.highlightIndex !== null && nextSnapshot.highlightIndex !== undefined) {
    const correct = nextSnapshot.highlightIndex;
    const len = (currentSnapshot?.items || []).length + 1;
    if (len < 2) return null;
    const options = new Set([correct]);
    let guardCount = 0;
    while (options.size < Math.min(3, len) && guardCount < 20) {
      options.add(Math.floor(Math.random() * len));
      guardCount += 1;
    }
    return { questionKey: 'nextIndex', options: shuffle([...options]), correct };
  }

  if (category === 'scheduling' && nextSnapshot.activeId && processIds?.length >= 2) {
    const correct = nextSnapshot.activeId;
    const options = new Set([correct]);
    let guardCount = 0;
    while (options.size < Math.min(3, processIds.length) && guardCount < 20) {
      options.add(processIds[Math.floor(Math.random() * processIds.length)]);
      guardCount += 1;
    }
    return { questionKey: 'nextProcess', options: shuffle([...options]), correct };
  }

  return null;
}

const QUESTIONS = {
  compareIndex: { ar: 'أي فهرس (index) سيكون طرفاً في المقارنة التالية؟', en: 'Which index will be part of the next comparison?' },
  nextIndex: { ar: 'عند أي فهرس ستحدث العملية التالية؟', en: 'At which index will the next operation happen?' },
  nextProcess: { ar: 'ما العملية التي ستُنفَّذ في الخطوة التالية؟', en: 'Which process will run in the next step?' },
};

export default function GuessNextStepGame({ category, currentSnapshot, nextSnapshot, processIds }) {
  const { lang } = useLanguage();
  const [answer, setAnswer] = useState(null);
  const challenge = buildChallenge(category, currentSnapshot, nextSnapshot, processIds);

  if (!challenge) return null;

  const isCorrect = answer !== null && answer === challenge.correct;

  return (
    <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-900/20">
      <p className="mb-2 text-xs font-bold text-amber-700 dark:text-amber-300">
        🎮 {lang === 'ar' ? 'تحدَّ نفسك: خمّن الخطوة التالية' : 'Challenge yourself: guess the next step'}
      </p>
      <p className="mb-2 text-sm text-slate-600 dark:text-slate-300">{QUESTIONS[challenge.questionKey][lang]}</p>
      <div className="flex flex-wrap gap-2">
        {challenge.options.map((opt) => {
          const chosen = answer === opt;
          const showCorrect = answer !== null && opt === challenge.correct;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setAnswer(opt)}
              disabled={answer !== null}
              className={`rounded-lg px-3 py-1.5 text-sm font-bold transition-colors ${
                showCorrect
                  ? 'bg-emerald-500 text-white'
                  : chosen
                    ? 'bg-rose-500 text-white'
                    : 'bg-white text-slate-600 hover:bg-amber-100 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {answer !== null && (
        <p className={`mt-2 text-xs font-semibold ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
          {isCorrect
            ? lang === 'ar'
              ? '✓ إجابة صحيحة! تابع للخطوة التالية.'
              : '✓ Correct! Move to the next step.'
            : lang === 'ar'
              ? `✗ غير صحيح — الإجابة الصحيحة كانت ${challenge.correct}.`
              : `✗ Not quite — the correct answer was ${challenge.correct}.`}
        </p>
      )}
    </div>
  );
}
