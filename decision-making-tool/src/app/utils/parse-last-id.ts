import isLastIdValid from './validation/last-id';

const DEFAULT_LAST_ID = 1;

export default function parseLastId(
  storedData: string | null,
  callback?: (defaultData: number) => void
): number {
  let parsed: unknown;

  try {
    parsed = storedData === null ? undefined : JSON.parse(storedData);
  } catch {
    parsed = undefined;
  }

  if (parsed && isLastIdValid(parsed)) {
    return parsed;
  } else {
    if (callback) callback(DEFAULT_LAST_ID);
    return DEFAULT_LAST_ID;
  }
}
