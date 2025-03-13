import type { MachinePayload } from '@ts-types/machine-payload';

import Emitter from '../utils/event-emitter-generic';

class EmitterMachine extends Emitter<[MachinePayload, ...unknown[]]> {}

export default EmitterMachine;
