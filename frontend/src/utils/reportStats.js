const COMPARE_TAGS = ['compare', 'compute-mid'];

export function countComparisons(snapshots) {
  return snapshots.filter((s) => COMPARE_TAGS.includes(s.tag)).length;
}
