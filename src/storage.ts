export interface LocalStorage {
  fillColor: string;
}

type LocalStorageKeys = keyof LocalStorage;

export function getStoredOptions(): Promise<LocalStorage> {
  const keys: LocalStorageKeys[] = ['fillColor'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result) => {
      resolve(result as LocalStorage);
    });
  });
}
