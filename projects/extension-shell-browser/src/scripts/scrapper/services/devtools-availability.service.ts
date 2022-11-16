import { MetadataStorage } from '@shell-browser/classes';
import { CustomResponseEventEnum, MetadataKeyEnum } from '@shell-browser/enums';
import { emitCustomEvent } from '@shell-browser/functions';
import type { Observable } from 'rxjs';

export class DevtoolsAvailabilityService {
    private get isEnabled(): Observable<boolean> {
        return MetadataStorage.get(MetadataKeyEnum.DevtoolsEnabled);
    }

    public emitEnabledStatusAsCustomEvent(): void {
        const state = (this.isEnabled ?? false);

        emitCustomEvent(CustomResponseEventEnum.IsDevtoolsEnabled, state);
    }
}
