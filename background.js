chrome.alarms.create('Timer', {
  periodInMinutes: 1 / 60,
});

function update() {
  const percentageOfDayProgess = 0;

  updateIcon(percentageOfDayProgess);
  updateBadgeText(percentageOfDayProgess);
}

function updateIcon(percentageOfDayProgess) {
  const canvas = new OffscreenCanvas(16, 16);
  const context = canvas.getContext('2d');

  if (context === null) {
    return;
  }

  context.clearRect(0, 0, 16, 16);
  context.fillStyle = '#00FF00';
  context.fillRect(0, 0, 16, 16);
  const imageData = context.getImageData(0, 0, 16, 16);
  chrome.action.setIcon({
    imageData: imageData,
  });
}

function updateBadgeText(percentageOfDayProgess) {
  chrome.action.setBadgeText({
    text: `${percentageOfDayProgess}%`,
  });
}

chrome.alarms.onAlarm.addListener(update);
