import type { StateMachine } from '@state-machine/machine-class';

import Audio from './audio';
import end from './audio/end.mp3';
import invitation from './audio/invitation.mp3';
import pick from './audio/pick.mp3';

const AUDIO_EVENTS = {
  invitation,
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
      if (trigger === 'pick') void this.play('pick');
      else if (trigger === 'endPick') {
        this.pause('pick');
        void this.play('end');
      }
    });
  }

  public toggleMute(isSoundEnabled: boolean): void {
    for (const sound of Object.values(this.sounds)) {
      sound.getElement().muted = !isSoundEnabled;
    }
  }

  public async play(audioEvent: string): Promise<void> {
    const audioElement = this.sounds[audioEvent].getElement();
    audioElement.currentTime = 0;
    await audioElement.play();
  }

  public pause(audioEvent: string): void {
    const audioElement = this.sounds[audioEvent].getElement();
    audioElement.pause();
  }
}
