export default function isLastIdValid(lastId: unknown): lastId is number {
  return typeof lastId === 'number';
}
