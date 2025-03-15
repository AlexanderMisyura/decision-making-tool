import BaseComponent from '@components/base-component';

export default class Audio extends BaseComponent<'audio'> {
  constructor(path: string) {
    super({ elementTag: 'audio' });

    const audioElement = this.getElement();
    audioElement.src = path;
    audioElement.volume = 0.5;
    audioElement.preload = 'auto';
    audioElement.muted = false;
  }
}
