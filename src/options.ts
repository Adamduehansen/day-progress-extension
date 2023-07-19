import { LocalStorage, getStoredOptions } from './storage.js';

const fillColorPicker = getElement<HTMLInputElement>('#fill-color-picker');
const saveButton = getElement<HTMLButtonElement>('button');

function getElement<T extends Element = Element>(selector: string): T | null {
  return document.querySelector<T>(selector);
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

  chrome.storage.local.set(updatedOptions, () => {
    chrome.runtime.sendMessage(updatedOptions);
  });
}

if (saveButton !== null) {
  saveButton.addEventListener('click', saveOptions);
}

getStoredOptions().then((options) => {
  initFillColorPicker(options.fillColor);
});
