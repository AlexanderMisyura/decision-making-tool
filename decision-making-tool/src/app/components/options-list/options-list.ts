import BaseComponent from '@components/base-component';
import OptionItem from '@components/options-list/option/option';
import Controls from '@components/options-list/options-controls/options-controls';
import tag from '@components/utility-components';
import type { StateMachine } from '@state-machine/machine-class';
import type { MachinePayload } from '@ts-types/index';
import type Router from 'src/app/router';

import * as styles from './options-list.module.scss';

export default class OptionsList extends BaseComponent {
  private list: BaseComponent<'ul'>;
  private lastId: number = 1;

  constructor(
    private machine: StateMachine,
    linkHandler: Router['handleLink']
  ) {
    super({ elementTag: 'div', classes: [styles.mainBlock] });

    this.list = tag.ul({ classes: [styles.list] });
    const controls = new Controls({
      add: this.appendOption.bind(this),
      clear: this.clearOptionsList.bind(this),
      start: linkHandler,
    });
    this.appendChildren(this.list, controls);

    this.addListeners();
  }

  private addListeners(): void {
    this.addListener('click', this.handleDeleteClick.bind(this));
    this.addListener('change', this.handleInputsChange.bind(this));

    this.machine.on(this.machine.events.machineStateChanged, (payload) =>
      this.handleStateChange(payload)
    );
  }

  private handleStateChange(payload: MachinePayload): void {
    if (payload.trigger === 'navigateOptionsList') {
      this.rerenderList();
    }
  }

  private rerenderList(): void {
    const { options, lastId } = this.machine.context;

    if (options.length > 0) {
      this.list.removeChildren();
      this.lastId = lastId;
      for (const option of options) {
        const optionItem = new OptionItem(option);
        this.list.appendSingle(optionItem);
      }
    }
  }

  private appendOption(): void {
    if (this.list.childComponents.length === 0) this.lastId = 0;
    const option = { id: ++this.lastId, title: '', weight: 0 };
    const optionItem = new OptionItem(option);

    this.list.appendSingle(optionItem);

    const { options } = this.machine.context;
    options.push(option);

    this.machine.makeTransition(this.machine.value, 'addOption', {
      options: [...options],
      lastId: this.lastId,
    });
  }

  private handleInputsChange(event: Event): void {
    const input = event.target;

    if (input instanceof HTMLInputElement) {
      const { options } = this.machine.context;
      const id = Number(input.id.at(1));
      const currentOption = options.find((option) => option.id === id);

      if (currentOption) {
        const property = input.name;
        const { value } = input;

        if (property === 'title') currentOption[property] = value;
        else if (property === 'weight') currentOption[property] = Number(value);

        this.machine.makeTransition(this.machine.value, 'modifyOption', { options: [...options] });
      }
    }
  }

  private handleDeleteClick(event: Event): void {
    const deleteButton = event.target;

    if (deleteButton instanceof HTMLButtonElement && deleteButton.name === 'delete option') {
      const id = Number.parseInt(deleteButton.id.slice(1));

      const optionToRemove = this.list.childComponents.find((child) => {
        const childId = child.getElement().getAttribute('id');
        if (!childId) return false;

        return id === Number.parseInt(childId?.slice(1));
      });

      optionToRemove?.removeSelf();

      const { options } = this.machine.context;
      const filteredOptions = options.filter((option) => option.id !== Number(id));

      this.machine.makeTransition(this.machine.value, 'removeOption', {
        options: [...filteredOptions],
      });
    }
  }

  private clearOptionsList(): void {
    this.list.removeChildren();
    this.machine.makeTransition(this.machine.value, 'removeOption', { options: [] });
  }
}
