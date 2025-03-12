import BaseComponent from '@components/base-component';
import tag from '@components/utility-components';
import type Router from 'src/app/router';

import * as styles from './picker.module.scss';
export default class Picker extends BaseComponent {
  constructor(linkHandler: Router['handleLink']) {
    super({ elementTag: 'div' });
    const backLink = tag.a({
      text: 'Go back to Options List',
      href: '../',
      classes: [styles.temp],
    });
    backLink.addListener('click', linkHandler);

    this.appendSingle(backLink);
  }
}
