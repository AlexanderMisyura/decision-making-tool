import BaseComponent from '@components/base-component';
import ErrorPage from '@components/error-page/error-page';
import Message from '@components/message/message';
import Modal from '@components/modal/modal';
import OptionsList from '@components/options-list/options-list';
import Picker from '@components/picker/picker';
import tag from '@components/utility-components';
import type { StateMachine } from '@state-machine/machine-class';
import type { ErrorMessageType } from '@ts-types/index';
import type Router from 'src/app/router';

import * as styles from './page.module.scss';

export default class Page extends BaseComponent<'main'> {
  private modal: Modal;
  private optionsList: OptionsList;
  private picker: Picker;
  private errorPage: ErrorPage;
  private content: BaseComponent;

  constructor(
    private machine: StateMachine,
    linkHandler: Router['handleLink']
  ) {
    super({ elementTag: 'main', classes: [styles.page] });

    this.modal = new Modal();
    this.optionsList = new OptionsList(
      machine,
      this.modal.modalControls,
      linkHandler,
      this.showMessage.bind(this)
    );
    this.picker = new Picker(machine, linkHandler, this.showMessage.bind(this));
    this.errorPage = new ErrorPage(linkHandler);

    this.content = tag.div({ classes: [styles.content] });

    this.appendChildren(
      tag.h1({ text: 'Decision Making Tool', classes: [styles.heading] }),
      this.content
    );

    this.machine.on(this.machine.events.machineStateChanged, this.handleRouteChange.bind(this));
  }

  public mount(): void {
    this.handleRouteChange();
    document.body.append(this.getElement());
  }

  public showMessage(messageType: ErrorMessageType): void {
    this.modal.showModal(new Message(this.modal.modalControls, messageType));
  }

  private handleRouteChange(): void {
    const { currentRoute } = this.machine.context;

    if (currentRoute === '/') this.changeContent(this.optionsList);
    else if (currentRoute === '/picker') this.changeContent(this.picker);
    else this.changeContent(this.errorPage);
  }

  private changeContent(newContent: BaseComponent): void {
    this.content.getElement().replaceChildren(newContent.getElement());
  }
}
