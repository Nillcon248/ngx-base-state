// FIXME: Need to avoid index.ts files & path aliases,
// or investigate how to setup webpack
// to avoid huge bundle sizes while using index.ts files.
import type { ɵMetadataOperation } from 'projects/ngx-base-state/src/lib/interfaces/metadata-operation.interface';
import type { Observable } from 'rxjs';
import { fromEvent, map, takeUntil } from 'rxjs';
import { ɵMetadataKeyEnum } from '../../../../ngx-base-state/src/lib/enums/metadata-key.enum';
import { adaptOperationToExtensionFormat } from './adapters/operation.adapter';
import { CustomEventEnum } from './enums/custom-event.enum';
import { emitCustomEvent } from './functions/emit-custom-event.function';

const windowObj = (window as any);
const metadataOperation$: Observable<ɵMetadataOperation> = windowObj[ɵMetadataKeyEnum.MetadataOperation];

emitIsDevtoolsEnabled();
initOperationMetadataRequestObserver();

function initOperationMetadataRequestObserver(): void {
    fromEvent(document, CustomEventEnum.RequestMetadataOperation)
        .subscribe(() => initMetadataOperationEmitter());
}

function initMetadataOperationEmitter(): void {
    metadataOperation$
        ?.pipe(
            takeUntil(fromEvent(document, CustomEventEnum.StopRequestMetadataOperation)),
            map((operation) => adaptOperationToExtensionFormat(operation))
        )
        .subscribe((operation) => emitCustomEvent(CustomEventEnum.MetadataOperation, operation));
}

function emitIsDevtoolsEnabled(): void {
    const state = (windowObj[ɵMetadataKeyEnum.DevtoolsEnabled] ?? false);

    emitCustomEvent(CustomEventEnum.IsDevtoolsEnabled, state);
}
