export const BADGE_TIERS = [
  { id: 'first-step', icon: '🥉', threshold: 1, name: { ar: 'الخطوة الأولى', en: 'First Step' } },
  { id: 'explorer', icon: '🥈', threshold: 10, name: { ar: 'مستكشف الخوارزميات', en: 'Algorithm Explorer' } },
  { id: 'expert', icon: '🥇', threshold: 20, name: { ar: 'خبير الخوارزميات', en: 'Algorithm Expert' } },
  { id: 'legend', icon: '🏆', threshold: Infinity, name: { ar: 'أسطورة المنصة', en: 'Platform Legend' } },
];

/**
 * Returns each badge tier annotated with whether it has been unlocked yet.
 * The "legend" tier's threshold is resolved against the current total
 * algorithm count so it always means "completed everything available".
 */
export function getBadgeProgress(completedCount, totalCount) {
  return BADGE_TIERS.map((tier) => {
    const threshold = tier.threshold === Infinity ? totalCount : tier.threshold;
    return { ...tier, threshold, unlocked: completedCount >= threshold };
  });
}
