import LocalStorageService from '@services/local-storage.service';
import type { Option, Preferences, StorageData } from '@ts-types/index';
import parseOptionsList from '@utils/parse-options-list';
import parsePreferences from '@utils/parse-preferences';

import config from './config';

const { STORAGE_PREFIX } = config;

class Controller {
  private storage: LocalStorageService<StorageData> = new LocalStorageService(STORAGE_PREFIX);

  public getPreferences(): Preferences {
    return this.storage.getData('preferences', parsePreferences);
  }

  public getOptionsList(): Option[] {
    return this.storage.getData('optionsList', parseOptionsList);
  }

  public setOptionsList(options: Option[]): void {
    this.storage.saveData('optionsList', options);
  }
}

export default new Controller();
