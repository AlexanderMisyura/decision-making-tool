import type { StateMachine } from '@state-machine/machine-class';

import type { Context } from './context';

export type MachinePayload = {
  updateContext: StateMachine['updateContext'];
  contextData?: Partial<Context>;
  trigger: string;
};
