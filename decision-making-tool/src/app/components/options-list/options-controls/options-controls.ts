import BaseComponent from '@components/base-component';
import tag from '@components/utility-components';
import type { ControlsCallbacks } from '@ts-types/controls-callbacks';

import * as styles from './options-controls.module.scss';

export default class Controls extends BaseComponent {
  constructor(callbacks: ControlsCallbacks) {
    super({ elementTag: 'div', classes: [styles.buttons] });

    const addButton = tag.button({
      classes: ['button', styles.addBtn],
      text: 'Add Option',
      onclick: callbacks.add,
    });

    const pasteButton = tag.button({ classes: ['button', styles.pasteBtn], text: 'Paste List' });

    const clearButton = tag.button({
      classes: ['button', styles.clearBtn],
      text: 'Clear List',
      onclick: callbacks.clear,
    });

    const saveButton = tag.button({ classes: ['button', styles.saveBtn], text: 'Save List' });

    const loadButton = tag.button({ classes: ['button', styles.loadBtn], text: 'Load List' });

    const startButton = tag.a({
      href: './picker',
      classes: ['button', styles.startBtn],
      text: 'Start',
      onclick: callbacks.start,
    });

    this.appendChildren(addButton, pasteButton, clearButton, saveButton, loadButton, startButton);
  }
}
