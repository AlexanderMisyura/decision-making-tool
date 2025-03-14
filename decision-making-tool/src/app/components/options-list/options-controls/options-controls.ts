import BaseComponent from '@components/base-component';
import type { StateMachine } from '@state-machine/machine-class';
import type { ControlsCallbacks } from '@ts-types/controls-callbacks';

import {
  createAddButton,
  createClearButton,
  createLoadButton,
  createPasteButton,
  createSaveButton,
  createStartButton,
} from './create-buttons';
import * as styles from './options-controls.module.scss';

export default class Controls extends BaseComponent {
  constructor(
    private machine: StateMachine,
    callbacks: ControlsCallbacks
  ) {
    super({ elementTag: 'div', classes: [styles.buttons] });

    const { add, paste, clear, start } = callbacks;

    const addButton = createAddButton(add);
    const pasteButton = createPasteButton(paste);
    const clearButton = createClearButton(clear);
    const saveButton = createSaveButton(this.saveOptions.bind(this));
    const loadButton = createLoadButton();
    const startButton = createStartButton(start);

    this.appendChildren(addButton, pasteButton, clearButton, saveButton, loadButton, startButton);
  }

  private saveOptions(): void {
    this.machine.makeTransition(this.machine.value, 'saveToFile');
  }
}
