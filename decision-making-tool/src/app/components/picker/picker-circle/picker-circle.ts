import BaseComponent from '@components/base-component';

import * as styles from './picker-circle.module.scss';

export default class Circle extends BaseComponent {
  constructor() {
    super({ elementTag: 'div', classes: [styles.circle] });
  }
}
