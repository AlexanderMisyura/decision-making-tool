import type { MachinePayload } from './machine-payload';

export type StateDefinition = {
  actions: {
    onEnter?(payload: MachinePayload): void;
    onExit?(payload: MachinePayload): void;
  };
  transitions: {
    [key: string]: {
      target: string;
      action?(payload: MachinePayload): void;
    };
  };
};
