import type BaseComponent from '@components/base-component';
import tag from '@components/utility-components';
import type { ControlsCallbacks } from '@ts-types/index';

import * as styles from './options-controls.module.scss';

export function createAddButton(add: ControlsCallbacks['add']): BaseComponent<'button'> {
  return tag.button({
    classes: ['button', styles.addBtn],
    text: 'Add Option',
    onclick: add,
  });
}

export function createPasteButton(paste: ControlsCallbacks['paste']): BaseComponent<'button'> {
  return tag.button({
    classes: ['button', styles.pasteBtn],
    text: 'Paste List',
    onclick: paste,
  });
}

export function createClearButton(clear: ControlsCallbacks['clear']): BaseComponent<'button'> {
  return tag.button({
    classes: ['button', styles.clearBtn],
    text: 'Clear List',
    onclick: clear,
  });
}

export function createSaveButton(/* save: ControlsCallbacks['save'] */): BaseComponent<'button'> {
  return tag.button({
    classes: ['button', styles.saveBtn],
    text: 'Save List',
    // onclick: save,
  });
}

export function createLoadButton(/* load: ControlsCallbacks['load'] */): BaseComponent<'button'> {
  return tag.button({
    classes: ['button', styles.loadBtn],
    text: 'Load List',
    // onclick: load,
  });
}

export function createStartButton(start: ControlsCallbacks['start']): BaseComponent<'a'> {
  return tag.a({
    href: './picker',
    classes: ['button', styles.startBtn],
    text: 'Start',
    onclick: start,
  });
}
