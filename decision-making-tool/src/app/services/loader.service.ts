export default class LoaderService {
  private anchor: HTMLAnchorElement | undefined;

  public loadFile(url: string, fileName: string): void {
    this.anchor = document.createElement('a');
    this.anchor.href = url;
    this.anchor.download = fileName;

    this.anchor.click();

    delete this.anchor;
  }
}
