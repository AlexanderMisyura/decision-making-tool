import BaseComponent from '@components/base-component';
import type Modal from '@components/modal/modal';
import type OptionsList from '@components/options-list/options-list';
import tag from '@components/utility-components';
import parseText from '@utils/parse-text';

import * as styles from './paste-list.module.scss';

const PLACEHOLDER = `Paste a list of new options in a CSV-like format:

title,1                 -> | title                 | 1 |
title with whitespace,2 -> | title with whitespace | 2 |
title , with , commas,3 -> | title , with , commas | 3 |
title with "quotes",4   -> | title with "quotes"   | 4 |`;

export default class PasteList extends BaseComponent<'form'> {
  private textarea: BaseComponent<'textarea'> | undefined;
  private confirmButton = tag.button({
    text: 'Confirm',
    classes: ['button', styles.confirmBtn],
    type: 'submit',
    onclick: (event) => {
      event.preventDefault();
      this.confirm();
      this.modalControls.closeModal(event);
    },
  });

  constructor(
    private modalControls: Modal['modalControls'],
    private appendPasteList: OptionsList['appendPasteList']
  ) {
    super({ elementTag: 'form', classes: [styles.pasteList] });

    this.addListeners();
  }

  public createTextarea(): this {
    this.textarea = tag.textarea({
      classes: [styles.textarea],
      name: 'paste list',
      placeholder: PLACEHOLDER,
    });

    this.appendChildren(this.textarea, this.confirmButton, this.modalControls.closeModalButton);

    return this;
  }

  private addListeners(): void {
    this.addListener('submit', (event) => {
      event.preventDefault();
      this.confirm();
    });
  }

  private confirm(): void {
    if (this.textarea) {
      const text = this.textarea.getElement().value;
      const partialOptions = parseText(text);

      if (partialOptions) this.appendPasteList(partialOptions);
    }
  }
}
