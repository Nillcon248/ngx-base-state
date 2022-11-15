import { fromEvent, take } from 'rxjs';
import { CustomEventEnum, RuntimeMessageEnum } from '../enums';

export class DevToolsAvailabilityService {
    private isEnabled = false;

    public initIsDevtoolsEnabledObserver(): void {
        fromEvent<CustomEvent<boolean>>(document, CustomEventEnum.IsDevtoolsEnabled)
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
