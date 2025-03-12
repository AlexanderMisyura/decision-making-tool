import BaseComponent from '@components/base-component';
import tag from '@components/utility-components';
import type Router from 'src/app/router';

import * as styles from './options-list.module.scss';

export default class OptionsList extends BaseComponent {
  constructor(linkHandler: Router['handleLink']) {
    super({ elementTag: 'div' });
    const backLink = tag.a({ text: 'Start Picker', href: './picker', classes: [styles.temp] });
    backLink.addListener('click', linkHandler);

    this.appendSingle(backLink);
  }
}
