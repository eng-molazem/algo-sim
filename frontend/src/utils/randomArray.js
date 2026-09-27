export function randomArray(size = 12, max = 99) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}
