import BaseComponent from '@components/base-component';
import type Modal from '@components/modal/modal';
import OptionItem from '@components/options-list/option/option';
import Controls from '@components/options-list/options-controls/options-controls';
import PasteList from '@components/pasteOption/paste-list';
import tag from '@components/utility-components';
import type { StateMachine } from '@state-machine/machine-class';
import type { ControlsCallbacks, MachinePayload, PasteListOption } from '@ts-types/index';
import type Router from 'src/app/router';

import * as styles from './options-list.module.scss';

export default class OptionsList extends BaseComponent {
  private list: BaseComponent<'ul'>;
  private lastId: number = 1;

  constructor(
    private machine: StateMachine,
    modalControls: Modal['modalControls'],
    linkHandler: Router['handleLink']
  ) {
    super({ elementTag: 'div', classes: [styles.mainBlock] });

    this.list = tag.ul({ classes: [styles.list] });

    const pasteList = new PasteList(modalControls, this.appendPasteList.bind(this));

    const controlsCallbacks: ControlsCallbacks = {
      add: () => this.appendOption.bind(this)(),
      paste: (): void => modalControls.showModal(pasteList.createTextarea()),
      clear: this.clearOptionsList.bind(this),
      start: linkHandler,
    };

    const controls = new Controls(this.machine, controlsCallbacks);
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
    if (payload.trigger === 'navigateOptionsList' || payload.trigger === 'fileLoaded') {
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

  private appendOption(partialOption?: PasteListOption): void {
    if (this.list.childComponents.length === 0) this.lastId = 0;
    const id = ++this.lastId;

    const option = partialOption ? { id, ...partialOption } : { id, title: '', weight: 0 };
    const optionItem = new OptionItem(option);

    this.list.appendSingle(optionItem);

    const { options } = this.machine.context;
    options.push(option);

    this.machine.makeTransition(this.machine.value, 'addOption', {
      options: [...options],
      lastId: this.lastId,
    });
  }

  private appendPasteList(partialOptions: PasteListOption[]): void {
    for (const partialOption of partialOptions) {
      this.appendOption(partialOption);
    }
  }

  private handleInputsChange(event: Event): void {
    const input = event.target;

    if (input instanceof HTMLInputElement) {
      const { options } = this.machine.context;
      const id = Number.parseInt(input.id.slice(1));
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

      if (this.list.childComponents.length > 0) {
        this.machine.makeTransition(this.machine.value, 'removeOption', {
          options: [...filteredOptions],
        });
      } else {
        this.clearOptionsList();
      }
    }
  }

  private clearOptionsList(): void {
    this.list.removeChildren();
    this.machine.makeTransition(this.machine.value, 'clearList', { options: [], lastId: 0 });
  }
}
