import type { Option } from '@ts-types/index';

import isOptionsListValid from './validation/option-list';

const DEFAULT_OPTIONS_LIST: Option[] = [{ id: 1, title: '', weight: 0 }];

export default function parseOptionsList(
  storedData: string | null,
  callback?: (defaultData: Option[]) => void
): Option[] {
  let parsed: unknown;

  try {
    parsed = storedData === null ? undefined : JSON.parse(storedData);
  } catch {
    parsed = undefined;
  }

  if (parsed && isOptionsListValid(parsed)) {
    return parsed;
  } else {
    if (callback) callback(DEFAULT_OPTIONS_LIST);
    return DEFAULT_OPTIONS_LIST;
  }
}
