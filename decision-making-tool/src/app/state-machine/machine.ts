import type { MachineDefinition } from '@ts-types/index';

import controller from '../controller';
import { StateMachine } from './machine-class';

const stateMachineDefinition: MachineDefinition = {
  initialState: 'state:initial',
  context: {
    currentRoute: '/',
    durationMs: 10_000,
    isSoundEnabled: false,
    options: [],
    pickerList: [],
    lastId: 1,
  },
  states: {
    'state:initial': {
      actions: {
        onEnter() {},
        onExit(payload) {
          const preferences = controller.getPreferences();
          const [options, lastId] = controller.getOptions();

          payload.updateContext({
            isSoundEnabled: preferences.isSoundEnabled,
            options,
            lastId,
          });
        },
      },
      transitions: {
        navigateOptionsList: {
          target: 'state:optionsList',
          action(payload) {
            if (payload.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
        navigatePicker: {
          target: 'state:picker',
          action(payload) {
            if (payload.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
        navigateError: {
          target: 'state:404',
          action(payload) {
            if (payload.contextData?.currentRoute) {
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
            if (payload.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
        navigateError: {
          target: 'state:picker',
          action(payload) {
            if (payload.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
        modifyOption: {
          target: 'state:optionsList',
          action(payload) {
            if (payload.contextData?.options) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
              controller.setOptionsList(payload.contextData.options);
            }
          },
        },
        removeOption: {
          target: 'state:optionsList',
          action(payload) {
            if (payload.contextData?.options) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
              controller.setOptionsList(payload.contextData.options);
            }
          },
        },
        clearList: {
          target: 'state:optionsList',
          action(payload) {
            if (payload.contextData?.options && payload.contextData.lastId != undefined) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
              controller.setOptions([payload.contextData.options, payload.contextData.lastId]);
            }
          },
        },
        addOption: {
          target: 'state:optionsList',
          action(payload) {
            if (payload.contextData?.options && payload.contextData.lastId) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
              controller.setOptions([payload.contextData.options, payload.contextData.lastId]);
            }
          },
        },
        saveToFile: {
          target: 'state:optionsList',
          action(payload) {
            const { getFullContext } = payload;
            const context = getFullContext();
            controller.saveToJSONFile(context.options, context.lastId);
          },
        },
        loadFromFile: {
          target: 'state:optionsList',
          action(payload) {
            void (async (): Promise<void> => {
              const fileContent = await controller.loadFromJSONFile();

              if (fileContent) {
                const { updateContext } = payload;
                updateContext({ options: fileContent.options, lastId: fileContent.lastId });
                controller.setOptions([fileContent.options, fileContent.lastId]);
                machine.makeTransition(machine.value, 'fileLoaded');
              }
            })();
          },
        },
        fileLoaded: {
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
            if (payload.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
        navigateError: {
          target: 'state:picker',
          action(payload) {
            if (payload.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
        toggleSound: {
          target: 'state:picker',
          action(payload) {
            if (payload.contextData?.isSoundEnabled !== undefined) {
              const isSoundEnabled = payload.contextData.isSoundEnabled;
              payload.updateContext({ isSoundEnabled });
              controller.setPreferences({ isSoundEnabled });
            }
          },
        },
        pick: {
          target: 'state:picker',
          action() {},
        },
        pick: {
          target: 'state:picker',
          action() {},
        },
        changeDuration: {
          target: 'state:picker',
          action(payload) {
            if (payload.contextData?.durationMs) {
              const duration = payload.contextData.durationMs;
              const validDurationMs = controller.sanitizeDuration(duration);
              payload.updateContext({ durationMs: validDurationMs });
            }
          },
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
            if (payload.contextData?.currentRoute) {
              const { contextData, updateContext } = payload;
              updateContext(contextData);
            }
          },
        },
        navigatePicker: {
          target: 'state:picker',
          action(payload) {
            if (payload.contextData?.currentRoute) {
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
