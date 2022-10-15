// Need to avoid index.ts files,
// or investigate how to setup webpack
// to avoid huge bundle sizes while using index.ts files.
import { Observable } from 'rxjs';
import { ɵMetadataKeyEnum } from '../../../../ngx-base-state/src/lib/enums/metadata-key.enum';
import { ɵMetadataOperation } from '../../../../ngx-base-state/src/lib/classes/metadata-operation.class';
import { CustomEventEnum } from './enums/custom-event.enum';

const windowObj = (window as any);
const metadataOperation$: Observable<ɵMetadataOperation> = windowObj[ɵMetadataKeyEnum.MetadataOperation];

emitIsDevtoolsEnabled();
initMetadataOperationEmitter();

function initMetadataOperationEmitter(): void {
    metadataOperation$
        .subscribe((operation) => emitCustomEvent(CustomEventEnum.MetadataOperation, operation));
}

function emitIsDevtoolsEnabled(): void {
    const state = windowObj[ɵMetadataKeyEnum.DevtoolsEnabled];

    emitCustomEvent(CustomEventEnum.IsDevtoolsEnabled, state);
}

function emitCustomEvent<T>(eventName: CustomEventEnum, detail: T): void {
    const event = new CustomEvent(eventName, { detail });

    document.dispatchEvent(event);
}
