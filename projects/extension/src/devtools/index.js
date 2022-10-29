const appEntryHtmlFilePath = '/index.html';
const iconPath = '/assets/icons/icon-48.png';
const panelName = 'ngx-base-state';

chrome.devtools.panels.create(panelName, iconPath, appEntryHtmlFilePath);
