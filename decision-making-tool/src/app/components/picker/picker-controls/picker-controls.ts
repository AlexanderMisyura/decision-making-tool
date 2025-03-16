import AudioController from '@components/audioComponent/audio-controller';
import BaseComponent from '@components/base-component';
import tag from '@components/utility-components';
import type { StateMachine } from '@state-machine/machine-class';
import type { MachinePayload } from '@ts-types/index';
import type Router from 'src/app/router';

import * as styles from './picker-controls.module.scss';

const SOUND = { ON: 'Sound ON', OFF: 'Sound OFF' } as const;

export default class PickerControls extends BaseComponent {
  private audioController: AudioController;
  private soundText: BaseComponent<'span'>;
  private soundCheckBox: BaseComponent<'input'>;
  private pickButton: BaseComponent<'button'>;
  private back: BaseComponent<'a'> | undefined;
  private durationInput: BaseComponent<'input'> | undefined;

  constructor(
    private machine: StateMachine,
    linkHandler: Router['handleLink']
  ) {
    super({ elementTag: 'div', classes: [styles.controls] });

    this.audioController = new AudioController(this.machine);

    this.createControls(linkHandler);

    this.soundCheckBox = tag.input({
      type: 'checkbox',
      checked: false,
      classes: [styles.soundInput, 'input'],
      onchange: this.handleSound.bind(this),
    });

    this.soundText = tag.span({ text: SOUND.OFF, classes: [styles.text] });

    const soundLabel = tag.label(
      { classes: [styles.sound, styles.label, 'button'] },
      this.soundText,
      this.soundCheckBox
    );

    this.pickButton = tag.button({
      text: 'Pick',
      classes: [styles.pick, 'button'],
      onclick: this.startPick.bind(this),
    });

    this.appendChildren(soundLabel, this.pickButton);
    this.machine.on(this.machine.events.machineStateChanged, this.handleStateChange.bind(this));
  }

  private startPick(): void {
    this.disableControls();
    this.machine.makeTransition(this.machine.value, 'pick');

    const durationMs = this.machine.context.durationMs;

    setTimeout(() => {
      this.enableControls();
      this.machine.makeTransition(this.machine.value, 'endPick');
    }, durationMs);
  }

  private disableControls(): void {
    this.pickButton.getElement().disabled = true;
    this.soundCheckBox.getElement().disabled = true;
    if (this.back && this.durationInput) {
      this.back.getElement().classList.add(styles.backDisabled);
      this.back.getElement().href = '';
      this.durationInput.getElement().disabled = true;
    }
  }

  private enableControls(): void {
    this.pickButton.getElement().disabled = false;
    this.soundCheckBox.getElement().disabled = false;
    if (this.back && this.durationInput) {
      this.back.getElement().classList.remove(styles.backDisabled);
      this.back.getElement().href = '../';
      this.durationInput.getElement().disabled = false;
    }
  }

  private handleStateChange(payload: MachinePayload): void {
    if (payload.trigger === 'navigatePicker') {
      const { isSoundEnabled } = this.machine.context;

      this.soundCheckBox.getElement().checked = isSoundEnabled;
      this.soundText.setText(isSoundEnabled ? SOUND.ON : SOUND.OFF);
      this.audioController.toggleMute(isSoundEnabled);
    }
  }

  private handleDurationChange(event: Event): void {
    const input = event.target;

    if (input instanceof HTMLInputElement) {
      const durationMs = Number(input.value) * 1000;

      if (Number.isNaN(durationMs)) return;

      this.machine.makeTransition(this.machine.value, 'changeDuration', { durationMs });
    }
  }

  private handleSound(): void {
    const isSoundEnabled = this.soundCheckBox.getElement().checked;
    this.soundText.setText(isSoundEnabled ? SOUND.ON : SOUND.OFF);
    this.audioController.toggleMute(isSoundEnabled);
    void this.audioController.play('invitation');

    this.machine.makeTransition(this.machine.value, 'toggleSound', { isSoundEnabled });
  }

  private createControls(linkHandler: Router['handleLink']): void {
    this.back = tag.a({
      text: 'Back',
      href: '../',
      classes: [styles.back, 'button'],
    });
    this.back.addListener('click', linkHandler);

    this.durationInput = tag.input({
      type: 'number',
      min: '5',
      max: '100',
      value: (this.machine.context.durationMs / 1000).toString(),
      classes: [styles.durationInput, 'input'],
      onchange: this.handleDurationChange.bind(this),
    });

    const durationLabel = tag.label(
      { classes: [styles.duration, styles.label] },
      tag.span({ text: 'Duration:', classes: [styles.text] }),
      this.durationInput
    );

    this.appendChildren(this.back, durationLabel);
  }
}
