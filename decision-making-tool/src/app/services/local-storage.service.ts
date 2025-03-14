export default class LocalStorageService<StorageDataType> {
  constructor(private storagePrefix: string) {}

  public saveData<Key extends keyof StorageDataType>(key: Key, data: StorageDataType[Key]): void {
    const storageKey = this.getStorageKey(key.toString());
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  public getData<Key extends keyof StorageDataType>(
    key: Key,
    parseFunction: (
      storedData: string | null,
      callback?: (data: StorageDataType[Key]) => void
    ) => StorageDataType[Key]
  ): StorageDataType[Key] {
    const storageKey = this.getStorageKey(key.toString());
    const storedData = localStorage.getItem(storageKey);

    return parseFunction(storedData, (defaultData: StorageDataType[Key]) =>
      this.saveData(key, defaultData)
    );
  }

  private getStorageKey(key: string): string {
    return `${this.storagePrefix}_${key}`;
  }
}
