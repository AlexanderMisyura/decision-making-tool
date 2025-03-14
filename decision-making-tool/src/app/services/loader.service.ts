export default class LoaderService {
  private anchor: HTMLAnchorElement | undefined;
  private input: HTMLInputElement | undefined;

  public downloadFile(url: string, fileName: string): void {
    this.anchor = document.createElement('a');
    this.anchor.href = url;
    this.anchor.download = fileName;

    this.anchor.click();

    delete this.anchor;
  }

  public uploadFile(): Promise<File | null> {
    return new Promise((resolve) => {
      this.input = document.createElement('input');
      this.input.type = 'file';
      this.input.accept = '.json';

      this.input.addEventListener(
        'change',
        (event: Event) => this.handleUploadedFile.bind(this)(event, resolve),
        { once: true }
      );

      this.input.click();
    });
  }

  private handleUploadedFile(
    event: Event,
    resolve: (value: File | PromiseLike<File | null> | null) => void
  ): void {
    const input = event.target;

    if (input instanceof HTMLInputElement && input.files) {
      const optionsFile = input.files.item(0);
      resolve(optionsFile);
    }

    delete this.input;
  }
}
