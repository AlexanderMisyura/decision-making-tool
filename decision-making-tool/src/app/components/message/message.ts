import BaseComponent from '@components/base-component';
import type Modal from '@components/modal/modal';
import tag from '@components/utility-components';

import * as styles from './message.module.scss';

export default class Message extends BaseComponent {
  constructor(modalControls: Modal['modalControls']) {
    super({ elementTag: 'div', classes: [styles.message] });

    const closeButton = tag.button({
      text: 'OK',
      classes: [styles.confirmBtn, 'button'],
      onclick: modalControls.closeModal,
    });

    const text = tag.div({
      classes: [styles.text],
      text: 'Please add at least 2 valid options. An option is considered valid if its title is not empty and its weight is greater than 0.',
    });

    this.appendChildren(text, closeButton);
  }
}
