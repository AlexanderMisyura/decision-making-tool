import type { Preferences } from '@ts-types/index';

import arePreferencesValid from './validation/preferences';

const DEFAULT_PREFERENCES: Preferences = {
  isSoundEnabled: false,
};

export default function parsePreferences(
  storedData: string | null,
  callback?: (defaultData: Preferences) => void
): Preferences {
  let parsed: unknown;

  try {
    parsed = storedData === null ? undefined : JSON.parse(storedData);
  } catch {
    parsed = undefined;
  }

  if (parsed && arePreferencesValid(parsed)) {
    return { isSoundEnabled: parsed.isSoundEnabled };
  } else {
    if (callback) callback(DEFAULT_PREFERENCES);
    return DEFAULT_PREFERENCES;
  }
}
