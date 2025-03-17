import BaseComponent from '@components/base-component';
import tag from '@components/utility-components';
import type Router from 'src/app/router';

import * as styles from './error-page.module.scss';

export default class ErrorPage extends BaseComponent {
  constructor(linkHandler: Router['handleLink']) {
    super({ elementTag: 'div', classes: [styles.errorPage] });
    const backLink = tag.a({
      text: 'Go back to Options List',
      href: '../',
      classes: [styles.link, 'button'],
    });
    backLink.addListener('click', linkHandler);

    this.appendChildren(
      tag.div({ text: 'Oh, something went wrong 😕', classes: [styles.text] }),
      backLink
    );
  }
}
