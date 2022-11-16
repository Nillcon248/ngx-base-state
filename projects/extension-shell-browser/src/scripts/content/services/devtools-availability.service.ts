import { CustomResponseEventEnum, RuntimeMessageEnum } from '@shell-browser/enums';
import { fromEvent, take } from 'rxjs';

export class DevToolsAvailabilityService {
    private isEnabled = false;

    public initIsDevtoolsEnabledObserver(): void {
        fromEvent<CustomEvent<boolean>>(document, CustomResponseEventEnum.IsDevtoolsEnabled)
            .pipe(take(1))
            .subscribe((event) => {
                this.isEnabled = event.detail;
            });
    }

    public initIsLibraryAvailableMessageObserver(): void {
        chrome.runtime.onMessage.addListener((message, sender, response) => {
            if (message.type === RuntimeMessageEnum.RequestIsLibraryAvailable) {
                response(this.isEnabled);
            }
        });
    }
}
