import { ContentScriptConnectionEnum } from '../enums';

export class ApplicationInitStatusService {
    public initObserver(): void {
        chrome.runtime.onConnect.addListener((port) => {
            if (port.name === ContentScriptConnectionEnum.AppInit) {
                port.postMessage(true);
            }
        });
    }
}
