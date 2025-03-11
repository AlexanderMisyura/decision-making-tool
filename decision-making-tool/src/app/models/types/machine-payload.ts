import type { StateMachine } from 'src/app/state-machine/machine-class';

import type { Context } from './context';

export type MachinePayload = {
  updateContext: StateMachine['updateContext'];
  contextData?: Partial<Context>;
};
