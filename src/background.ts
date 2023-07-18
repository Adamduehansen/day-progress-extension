import { getStoredOptions } from './storage';

let fillColor = '#000000';

function renderIcon(percentage: number) {
  const canvas = new OffscreenCanvas(16, 16);
  const context = canvas.getContext('2d');

  if (context === null) {
    return;
  }

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY);
  const startAngle = -0.5 * Math.PI;
  const endAngle = startAngle + 2 * Math.PI * (percentage / 100);

  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  context.fillStyle = '#e0e0e0';
  context.fill();

  // Draw the filled part
  context.beginPath();
  context.moveTo(centerX, centerY);
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.closePath();
  context.fillStyle = fillColor;
  context.fill();

  const imageData = context.getImageData(0, 0, 16, 16);

  chrome.action.setIcon({
    imageData: imageData,
  });
}

function getPercentageOfDayPassed(date: Date) {
  const startOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const millisecondsInDay = 24 * 60 * 60 * 1000;

  const elapsedMilliseconds = date.getTime() - startOfDay.getTime();
  return Math.floor((elapsedMilliseconds / millisecondsInDay) * 100);
}

function update() {
  const percentageOfDayProgess = getPercentageOfDayPassed(new Date());

  renderIcon(percentageOfDayProgess);
  updateBadgeText(percentageOfDayProgess);
}

function updateBadgeText(percentage: number) {
  chrome.action.setBadgeText({
    text: `${percentage}%`,
  });
}

chrome.alarms.create('Timer', {
  periodInMinutes: 1,
});

chrome.alarms.onAlarm.addListener(update);
update();

getStoredOptions().then((options) => {
  fillColor = options.fillColor;

  const percentageOfDayProgess = getPercentageOfDayPassed(new Date());
  renderIcon(percentageOfDayProgess);
});
