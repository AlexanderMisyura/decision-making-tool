import BaseComponent from '@components/base-component';
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
  constructor(callbacks: ControlsCallbacks) {
    super({ elementTag: 'div', classes: [styles.buttons] });

    const { add, paste, clear, start } = callbacks;

    const addButton = createAddButton(add);
    const pasteButton = createPasteButton(paste);
    const clearButton = createClearButton(clear);
    const saveButton = createSaveButton();
    const loadButton = createLoadButton();
    const startButton = createStartButton(start);

    this.appendChildren(addButton, pasteButton, clearButton, saveButton, loadButton, startButton);
  }
}
