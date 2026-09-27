import { randomArray } from './randomArray';

/**
 * Named array shapes used for the "same algorithm, different input" compare
 * mode, so a learner can see how e.g. Bubble Sort behaves on its best case
 * (already sorted) vs its worst case (reverse sorted) with identical values.
 */
export const INPUT_VARIANTS = {
  random: { ar: 'مصفوفة عشوائية', en: 'Random array' },
  sorted: { ar: 'مرتبة تصاعدياً (أفضل حالة)', en: 'Sorted ascending (best case)' },
  reverseSorted: { ar: 'مرتبة تنازلياً (أسوأ حالة)', en: 'Sorted descending (worst case)' },
  nearlySorted: { ar: 'شبه مرتبة (تبديل بسيط)', en: 'Nearly sorted (one swap)' },
};

export function generateVariant(variant, size = 10) {
  const arr = randomArray(size, 99);
  if (variant === 'sorted') return [...arr].sort((a, b) => a - b);
  if (variant === 'reverseSorted') return [...arr].sort((a, b) => b - a);
  if (variant === 'nearlySorted') {
    const sorted = [...arr].sort((a, b) => a - b);
    if (sorted.length > 1) {
      const mid = Math.floor(sorted.length / 2);
      [sorted[0], sorted[mid]] = [sorted[mid], sorted[0]];
    }
    return sorted;
  }
  return arr;
}
