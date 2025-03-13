import type { Option } from './option';

export type Context = {
  currentRoute: string;
  durationMs: number;
  isSoundEnabled: boolean;
  options: Option[];
  lastId: number;
};
