import type { Context } from './context';
import type { StateDefinition } from './state-definition';

export type MachineDefinition = {
  initialState: string;
  states: Record<string, StateDefinition>;
  context: Context;
};
