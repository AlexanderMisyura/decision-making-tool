import LocalStorageService from '@services/local-storage.service';
import type { Option, Preferences, StorageData } from '@ts-types/index';
import parseLastId from '@utils/parse-last-id';
import parseOptionsList from '@utils/parse-options-list';
import parsePreferences from '@utils/parse-preferences';

import config from './config';

const { STORAGE_PREFIX } = config;

class Controller {
  private storage: LocalStorageService<StorageData> = new LocalStorageService(STORAGE_PREFIX);

  public getPreferences(): Preferences {
    return this.storage.getData('preferences', parsePreferences);
  }

  public getOptions(): [Option[], number] {
    return [this.getOptionsList(), this.getLastOptionId()];
  }

  public setOptions([options, lastId]: [Option[], number]): void {
    this.setOptionsList(options);
    this.setLastOptionId(lastId);
  }

  public getOptionsList(): Option[] {
    return this.storage.getData('optionsList', parseOptionsList);
  }

  public setOptionsList(options: Option[]): void {
    this.storage.saveData('optionsList', options);
  }

  public getLastOptionId(): number {
    return this.storage.getData('lastId', parseLastId);
  }

  public setLastOptionId(id: number): void {
    this.storage.saveData('lastId', id);
  }
}

export default new Controller();
