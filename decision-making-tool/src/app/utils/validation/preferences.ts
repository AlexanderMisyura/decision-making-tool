import type { Preferences } from '@ts-types/index';

export default function arePreferencesValid(preferences: unknown): preferences is Preferences {
  return (
    typeof preferences === 'object' &&
    preferences !== null &&
    'isSoundEnabled' in preferences &&
    typeof preferences.isSoundEnabled === 'boolean'
  );
}
