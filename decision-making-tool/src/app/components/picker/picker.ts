import BaseComponent from '@components/base-component';
import tag from '@components/utility-components';
import type { StateMachine } from '@state-machine/machine-class';
import type Router from 'src/app/router';

import * as styles from './picker.module.scss';
import Circle from './picker-circle/picker-circle';
import PickerControls from './picker-controls/picker-controls';

export default class Picker extends BaseComponent {
  private optionTitle: BaseComponent;
  constructor(
    private machine: StateMachine,
    linkHandler: Router['handleLink']
  ) {
    super({ elementTag: 'div', classes: [styles.pickerBlock] });

    const controls = new PickerControls(this.machine, linkHandler);
    const circle = new Circle(this.machine, this.showTitle.bind(this));
    this.optionTitle = tag.div({ classes: [styles.title], text: 'Spin the Wheel !!!' });

    this.appendChildren(controls, this.optionTitle, circle);

    this.machine.on(this.machine.events.machineStateChanged, (payload) => {
      if (payload.trigger === 'navigatePicker') {
        this.optionTitle.setText('Spin the Wheel !!!');
      }
    });
  }

  private showTitle(title: string): void {
    this.optionTitle.setText(title);
  }
}
