import BaseComponent from '@components/base-component';
import ErrorPage from '@components/error-page/error-page';
import OptionsList from '@components/options-list/options-list';
import Picker from '@components/picker/picker';
import tag from '@components/utility-components';
import type Router from 'src/app/router';
import type { StateMachine } from 'src/app/state-machine/machine-class';

import * as styles from './page.module.scss';

export default class Page extends BaseComponent<'main'> {
  private optionsList: OptionsList;
  private picker: Picker;
  private errorPage: ErrorPage;
  private content: BaseComponent;
  constructor(
    private machine: StateMachine,
    linkHandler: Router['handleLink']
  ) {
    super({ elementTag: 'main', classes: [styles.page] });
    this.optionsList = new OptionsList(linkHandler);
    this.picker = new Picker(linkHandler);
    this.errorPage = new ErrorPage(linkHandler);

    this.content = tag.div({ classes: [styles.content] });

    this.appendChildren(
      tag.h1({ text: 'Decision Making Tool', classes: [styles.heading] }),
      this.content
    );

    this.machine.on(this.machine.events.machineStateChanged, () => {
      const { currentRoute } = this.machine.context;

      if (currentRoute === '/') this.changeContent(this.optionsList);
      else if (currentRoute === '/picker') this.changeContent(this.picker);
      else this.changeContent(this.errorPage);
    });
  }

  public mount(): void {
    document.body.append(this.getElement());
  }

  private changeContent(newContent: BaseComponent): void {
    this.content.getElement().replaceChildren(newContent.getElement());
  }
}
