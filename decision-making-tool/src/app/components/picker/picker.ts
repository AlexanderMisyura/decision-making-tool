import BaseComponent from '@components/base-component';
import tag from '@components/utility-components';
import type { StateMachine } from '@state-machine/machine-class';
import type Router from 'src/app/router';

import * as styles from './picker.module.scss';
import PickerControls from './picker-controls/picker-controls';

export default class Picker extends BaseComponent {
  private optionTitle: BaseComponent;
  constructor(
    private machine: StateMachine,
    linkHandler: Router['handleLink']
  ) {
    super({ elementTag: 'div', classes: [styles.pickerBlock] });

    const controls = new PickerControls(this.machine, linkHandler);
    this.optionTitle = tag.div({ classes: [styles.title], text: 'Spin the Wheel !!!' });

    this.appendChildren(controls, this.optionTitle);
  }
}
