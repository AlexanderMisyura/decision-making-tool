import AudioController from '@components/audioComponent/audio-controller';
import BaseComponent from '@components/base-component';
import tag from '@components/utility-components';
import type { StateMachine } from '@state-machine/machine-class';
import type Router from 'src/app/router';

import * as styles from './picker-controls.module.scss';

const SOUND_MUTE = { ON: 'Mute ON', OFF: 'Mute OFF' } as const;

export default class PickerControls extends BaseComponent {
  private audioController: AudioController;
  private soundText: BaseComponent<'span'>;
  private soundCheckBox: BaseComponent<'input'>;
  private pickButton: BaseComponent<'button'>;

  constructor(
    private machine: StateMachine,
    linkHandler: Router['handleLink']
  ) {
    super({ elementTag: 'div', classes: [styles.controls] });

    this.audioController = new AudioController(this.machine);

    this.createControls(linkHandler);

    this.soundCheckBox = tag.input({
      type: 'checkbox',
      checked: true,
      classes: [styles.soundInput, 'input'],
      onchange: () => this.handleMute(this.audioController.toggleMute.bind(this.audioController)),
    });

    this.soundText = tag.span({ text: SOUND_MUTE.ON, classes: [styles.text] });

    const soundLabel = tag.label(
      { classes: [styles.sound, styles.label, 'button'] },
      this.soundText,
      this.soundCheckBox
    );

    this.pickButton = tag.button({
      text: 'Pick',
      classes: [styles.pick, 'button'],
    });

    this.appendChildren(soundLabel, this.pickButton);
  }

  private handleDurationChange(event: Event): void {
    const input = event.target;

    if (input instanceof HTMLInputElement) {
      const durationMs = Number(input.value) * 1000;

      if (Number.isNaN(durationMs)) return;

      this.machine.makeTransition(this.machine.value, 'changeDuration', { durationMs });
    }
  }

  private handleMute(muteHandler: AudioController['toggleMute']): void {
    const isMuted = this.soundCheckBox.getElement().checked;
    this.soundText.setText(isMuted ? SOUND_MUTE.ON : SOUND_MUTE.OFF);
    muteHandler(isMuted);
  }

  private createControls(linkHandler: Router['handleLink']): void {
    const back = tag.a({
      text: 'Back',
      href: '../',
      classes: [styles.back, 'button'],
    });
    back.addListener('click', linkHandler);

    const durationInput = tag.input({
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
      durationInput
    );

    this.appendChildren(back, durationLabel);
  }
}
