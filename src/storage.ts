export interface LocalStorage {
  fillColor: string;
  showPercentageText: boolean;
}

type LocalStorageKeys = keyof LocalStorage;

export function getStoredOptions(): Promise<LocalStorage> {
  const keys: LocalStorageKeys[] = ['fillColor', 'showPercentageText'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result) => {
      resolve(result as LocalStorage);
    });
  });
}

export function setStoredOptions(options: LocalStorage): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set(options, resolve);
  });
}
