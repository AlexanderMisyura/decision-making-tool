import type { Option, Preferences } from './index';

export type StorageData = {
  preferences: Preferences;
  optionsList: Option[];
  lastId: number;
};
