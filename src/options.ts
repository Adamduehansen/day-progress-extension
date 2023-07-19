import { LocalStorage, getStoredOptions, setStoredOptions } from './storage.js';

function getElement<T extends Element = Element>(selector: string): T | null {
  return document.querySelector<T>(selector);
}

const fillColorPicker = getElement<HTMLInputElement>('#fill-color-picker');
const showPercentageTextCheckbox = getElement<HTMLInputElement>(
  '#show-percentage-text-checkbox'
);
const saveButton = getElement<HTMLButtonElement>('button');

function initFillColorPicker(value: string): void {
  if (fillColorPicker === null) {
    return;
  }

  fillColorPicker.setAttribute('value', value);
}

function initShowPercentageTextCheckbox(value: boolean) {
  if (showPercentageTextCheckbox === null) {
    return;
  }

  showPercentageTextCheckbox.checked = value;
}

function saveOptions(): void {
  if (fillColorPicker === null || showPercentageTextCheckbox === null) {
    return;
  }

  const updatedOptions: LocalStorage = {
    fillColor: fillColorPicker.value,
    showPercentageText: showPercentageTextCheckbox.checked,
  };

  console.log(updatedOptions);

  setStoredOptions(updatedOptions).then(() => {
    chrome.runtime.sendMessage(updatedOptions);
  });
}

if (saveButton !== null) {
  saveButton.addEventListener('click', saveOptions);
}

getStoredOptions().then((options) => {
  console.log(options);

  initFillColorPicker(options.fillColor);
  initShowPercentageTextCheckbox(options.showPercentageText);
});
