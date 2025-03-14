import BaseComponent from '@components/base-component';
import tag from '@components/utility-components';
import type { Option } from '@ts-types/index';

import * as styles from './option.module.scss';

export default class OptionItem extends BaseComponent<'li'> {
  public label: BaseComponent<'label'>;

  constructor(option: Option) {
    super({ elementTag: 'li', classes: [styles.option], id: `#${option.id}-option` });

    const { id, title, weight } = option;

    this.label = tag.label({ text: `#${id}`, htmlFor: `#${id}-title`, classes: [styles.label] });

    const titleInput = tag.input({
      value: title || '',
      placeholder: 'Title',
      type: 'text',
      name: 'title',
      id: `#${id}-title`,
      classes: [styles.title, 'input'],
    });

    const weightInput = tag.input({
      value: weight === 0 ? '' : weight.toString(),
      placeholder: 'Weight',
      type: 'number',
      name: 'weight',
      min: '1',
      id: `#${id}-weight`,
      classes: [styles.weight, 'input'],
    });

    const deleteButton = tag.button({
      text: 'Delete',
      classes: [styles.deleteBtn, 'button'],
      id: `#${id}-delete`,
      type: 'button',
      name: 'delete option',
    });

    this.appendChildren(this.label, titleInput, weightInput, deleteButton);
  }
}
