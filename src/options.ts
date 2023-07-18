interface LocalStorage {
  fillColor: string;
}

type LocalStorageKeys = keyof LocalStorage;

const fillColorPicker = getElement<HTMLInputElement>('#fill-color-picker');
const saveButton = getElement<HTMLButtonElement>('button');

function getElement<T extends Element = Element>(selector: string): T | null {
  return document.querySelector<T>(selector);
}

function getStoredOptions(): Promise<LocalStorage> {
  const keys: LocalStorageKeys[] = ['fillColor'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result) => {
      resolve(result as LocalStorage);
    });
  });
}

function initFillColorPicker(value: string): void {
  if (fillColorPicker === null) {
    return;
  }

  fillColorPicker.setAttribute('value', value);
}

function saveOptions(): void {
  if (fillColorPicker === null) {
    return;
  }

  const updatedOptions: LocalStorage = {
    fillColor: fillColorPicker.value,
  };

  chrome.storage.local.set(updatedOptions, () => {});
}

if (saveButton !== null) {
  saveButton.addEventListener('click', saveOptions);
}

getStoredOptions().then((options) => {
  initFillColorPicker(options.fillColor);
});
