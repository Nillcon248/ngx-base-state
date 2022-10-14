const appEntryHtmlFilePath = '../index.html';
const panelName = 'ngx-base-state';

chrome.devtools.panels.create(panelName, null, appEntryHtmlFilePath);
