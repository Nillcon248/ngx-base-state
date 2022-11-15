import { injectScriptToDocument } from '../functions';

export class ScrapperScriptService {
    private readonly scrapperScriptName = 'scrapper.js';

    public injectToDocument(): void {
        const scriptFullPath = chrome.runtime.getURL(this.scrapperScriptName);

        injectScriptToDocument(scriptFullPath);
    }
}
