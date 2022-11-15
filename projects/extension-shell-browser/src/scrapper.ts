import type { Observable } from 'rxjs';
import { fromEvent, map, takeUntil } from 'rxjs';
import { adaptOperationToExtensionFormat } from './adapters';
import { CustomEventEnum, MetadataKeyEnum } from './enums';
import { emitCustomEvent } from './functions';
import { OriginalMetadataOperation } from './interfaces';

const windowObj = (window as any);
const metadataOperation$: Observable<OriginalMetadataOperation>
    = windowObj[MetadataKeyEnum.MetadataOperation];

emitIsDevtoolsEnabled();

fromEvent(document, CustomEventEnum.RequestMetadataOperation)
    .subscribe(() => initMetadataOperationEmitter());

function initMetadataOperationEmitter(): void {
    metadataOperation$
        ?.pipe(
            takeUntil(fromEvent(document, CustomEventEnum.StopRequestMetadataOperation)),
            map((operation) => adaptOperationToExtensionFormat(operation))
        )
        .subscribe((operation) => emitCustomEvent(CustomEventEnum.MetadataOperation, operation));
}

function emitIsDevtoolsEnabled(): void {
    const state = (windowObj[MetadataKeyEnum.DevtoolsEnabled] ?? false);

    emitCustomEvent(CustomEventEnum.IsDevtoolsEnabled, state);
}
