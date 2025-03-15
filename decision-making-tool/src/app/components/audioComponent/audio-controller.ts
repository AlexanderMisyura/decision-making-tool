import type { StateMachine } from '@state-machine/machine-class';

import Audio from './audio';
import end from './audio/end.mp3';
import pick from './audio/pick.mp3';
import navigate from './audio/start.mp3';

const AUDIO_EVENTS = {
  navigate,
  pick,
  end,
};

export default class AudioController {
  private sounds: Record<string, Audio> = {};

  constructor(private machine: StateMachine) {
    for (const [name, path] of Object.entries(AUDIO_EVENTS)) {
      this.sounds[name] = new Audio(path);
    }

    this.machine.on(this.machine.events.machineStateChanged, ({ trigger }) => {
      const state = this.machine.value;
      if (state === 'state:picker') {
        void this.play('navigate');
      } else if (trigger === 'pick') {
        void this.play('pick');
      } else if (trigger === 'endPick') {
        void this.play('end');
      }
    });
  }

  public toggleMute(value: boolean): void {
    for (const sound of Object.values(this.sounds)) {
      sound.getElement().muted = value;
    }
  }

  private async play(audioEvent: string): Promise<void> {
    const audioElement = this.sounds[audioEvent].getElement();
    audioElement.currentTime = 0;
    await audioElement.play();
  }
}
