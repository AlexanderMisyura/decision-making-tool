import type { Option } from './option';

export type Context = {
  options?: Option[];
  isMuted?: boolean;
  duration?: number;
  currentRoute?: string;
};
