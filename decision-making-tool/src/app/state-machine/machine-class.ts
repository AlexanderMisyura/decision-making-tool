import type { Context, MachineDefinition, MachinePayload } from '@ts-types/index';

import Emitter from '../event-emitter';

export class StateMachine {
  public value: MachineDefinition['initialState'];
  public context: MachineDefinition['context'];
  public readonly events = { machineStateChanged: 'machineStateChanged' } as const;
  private emitter: Emitter = new Emitter();
  private definition: MachineDefinition;

  constructor(stateMachineDefinition: MachineDefinition) {
    this.definition = stateMachineDefinition;
    this.value = stateMachineDefinition.initialState;
    this.context = stateMachineDefinition.context;
  }

  public makeTransition(
    currentState: string,
    trigger: string,
    contextData?: Context
  ): string | void {
    const currentStateDefinition = this.definition.states[currentState];
    const destinationTransition = currentStateDefinition.transitions[trigger];

    if (!destinationTransition) return;

    const destinationState = destinationTransition.target;
    const destinationStateDefinition = this.definition.states[destinationState];

    const payload: MachinePayload = {
      updateContext: this.updateContext.bind(this),
      contextData,
    };

    destinationTransition.action?.(payload);
    currentStateDefinition.actions.onExit?.(payload);
    destinationStateDefinition.actions.onEnter?.(payload);

    this.value = destinationState;
    this.emit(this.events.machineStateChanged, this.context);

    return this.value;
  }

  public updateContext(contextData: Partial<Context>): void {
    this.context = { ...this.context, ...contextData };
  }

  public on(event: string, callback: (...arguments_: unknown[]) => void): void {
    this.emitter.on(event, callback);
  }

  public emit(event: string, ...arguments_: unknown[]): void {
    this.emitter.emit(event, ...arguments_);
  }
}
