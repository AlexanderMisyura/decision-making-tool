import BaseComponent from '@components/base-component';
import tag from '@components/utility-components';

import * as styles from './modal.module.scss';
export default class Modal extends BaseComponent<'dialog'> {
  public modalControls = {
    showModal: this.showModal.bind(this),
    closeModal: this.closeModal.bind(this),
    closeModalButton: tag.button({
      text: 'Cancel',
      classes: ['button', styles.cancelBtn],
      onclick: this.closeModal.bind(this),
    }),
  };

  private content: BaseComponent | undefined;

  constructor() {
    super({ elementTag: 'dialog', classes: [styles.modal] });

    this.addListeners();
  }

  public showModal(component: BaseComponent<keyof HTMLElementTagNameMap>): void {
    this.createModal();
    document.body.append(this.getElement());
    if (this.content) this.content.getElement().replaceChildren(component.getElement());
    this.element.showModal();
  }

  private createModal(): void {
    this.content = tag.div({ classes: [styles.content] });
    this.appendSingle(this.content);
  }

  private addListeners(): void {
    this.addListener('click', (event: Event) => {
      if (event.target === event.currentTarget) this.element.close();
    });

    this.addListener('close', () => {
      this.content?.removeSelf();
      this.getElement().remove();
    });
  }

  private closeModal(event: Event): void {
    event.preventDefault();
    this.getElement().close();
    this.content?.removeSelf();
    this.getElement().remove();
  }
}
