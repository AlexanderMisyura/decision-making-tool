export default function shuffle<T>(array: T[]): T[] {
  const copy = [...array];

  for (let index = copy.length - 1; index >= 0; index--) {
    const index_ = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[index_]] = [copy[index_], copy[index]];
  }

  return copy;
}
