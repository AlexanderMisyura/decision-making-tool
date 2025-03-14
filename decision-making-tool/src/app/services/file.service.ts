export default class FileService {
  constructor(private fileNamePrefix: string) {}

  public createFile(content: string, type: string, extension: string): File {
    const fileName = this.getFileName(extension);
    return new File([content], fileName, { type });
  }

  private getFileName(key: string): string {
    return `${this.fileNamePrefix}_${key}`;
  }
}
