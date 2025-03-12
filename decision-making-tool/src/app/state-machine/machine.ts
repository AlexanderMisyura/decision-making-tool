import type { MachineDefinition } from '@ts-types/index';

import { StateMachine } from './machine-class';

const stateMachineDefinition: MachineDefinition = {
  initialState: 'state:initial',
  context: {
    currentRoute: '/',
    durationMs: 10_000,
    isSoundEnabled: false,
    options: [],
  },
  states: {
    'state:initial': {
      actions: {
        onEnter() {},
        onExit() {},
      },
      transitions: {
        navigateOptionsList: {
          target: 'state:optionsList',
          action(payload) {
            if (payload?.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
        navigatePicker: {
          target: 'state:picker',
          action(payload) {
            if (payload?.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
        navigateError: {
          target: 'state:picker',
          action(payload) {
            if (payload?.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
      },
    },
    'state:optionsList': {
      actions: {
        onEnter() {},
        onExit() {},
      },
      transitions: {
        navigatePicker: {
          target: 'state:picker',
          action(payload) {
            if (payload?.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
        navigateError: {
          target: 'state:picker',
          action(payload) {
            if (payload?.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
        addOption: {
          target: 'state:optionsList',
          action() {},
        },
        pasteList: {
          target: 'state:optionsList',
          action() {},
        },
        clearList: {
          target: 'state:optionsList',
          action() {},
        },
        saveToFile: {
          target: 'state:optionsList',
          action() {},
        },
        loadFromFile: {
          target: 'state:optionsList',
          action() {},
        },
      },
    },
    'state:picker': {
      actions: {
        onEnter() {},
        onExit() {},
      },
      transitions: {
        navigateOptionsList: {
          target: 'state:optionsList',
          action(payload) {
            if (payload?.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
        navigateError: {
          target: 'state:picker',
          action(payload) {
            if (payload?.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
        toggleMute: {
          target: 'state:picker',
          action() {},
        },
        pick: {
          target: 'state:picker',
          action() {},
        },
        changeDuration: {
          target: 'state:picker',
          action() {},
        },
      },
    },
    'state:404': {
      actions: {
        onEnter() {},
        onExit() {},
      },
      transitions: {
        navigateOptionsList: {
          target: 'state:optionsList',
          action(payload) {
            if (payload?.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
        navigatePicker: {
          target: 'state:picker',
          action(payload) {
            if (payload?.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
      },
    },
  },
};

const machine = new StateMachine(stateMachineDefinition);

export default machine;
