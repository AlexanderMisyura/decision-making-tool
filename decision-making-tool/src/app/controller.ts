import FileService, { readFile } from '@services/file.service';
import LoaderService from '@services/loader.service';
import LocalStorageService from '@services/local-storage.service';
import type { FileContent, Option, Preferences, StorageData } from '@ts-types/index';
import filterPickerList from '@utils/filter-picker-list';
import parseFileString from '@utils/parse-file-string';
import parseLastId from '@utils/parse-last-id';
import parseOptionsList from '@utils/parse-options-list';
import parsePreferences from '@utils/parse-preferences';

import config from './config';

const { PREFIX } = config;

class Controller {
  private fileService: FileService = new FileService(PREFIX);
  private loaderService: LoaderService = new LoaderService();
  private storageService: LocalStorageService<StorageData> = new LocalStorageService(PREFIX);

  public getPreferences(): Preferences {
    return this.storageService.getData('preferences', parsePreferences);
  }

  public getOptions(): [Option[], number] {
    return [this.getOptionsList(), this.getLastOptionId()];
  }

  public setOptions([options, lastId]: [Option[], number]): void {
    this.setOptionsList(options);
    this.setLastOptionId(lastId);
  }

  public getOptionsList(): Option[] {
    return this.storageService.getData('optionsList', parseOptionsList);
  }

  public setOptionsList(options: Option[]): void {
    this.storageService.saveData('optionsList', options);
  }

  public getLastOptionId(): number {
    return this.storageService.getData('lastId', parseLastId);
  }

  public setLastOptionId(id: number): void {
    this.storageService.saveData('lastId', id);
  }

  public saveToJSONFile(options: Option[], lastId: number): void {
    const extension = 'options.json';
    const type = 'application/json';

    const file = this.fileService.createFile(JSON.stringify({ options, lastId }), type, extension);
    const url = URL.createObjectURL(file);

    this.loaderService.downloadFile(url, file.name);
  }

  public async loadFromJSONFile(): Promise<void | FileContent> {
    const file = await this.loaderService.uploadFile();

    if (!file) return;

    const result = await readFile(file, parseFileString);

    if (result) return result;
  }

  public getPickerList(): Option[] | void {
    const optionsList = this.getOptionsList();
    const pickerList = filterPickerList(optionsList);

    if (pickerList.length > 1) return pickerList;
  }
}

export default new Controller();
