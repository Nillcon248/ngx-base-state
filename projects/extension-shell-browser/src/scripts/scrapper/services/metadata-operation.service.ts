import { adaptOperationToExtensionFormat } from '@shell-browser/adapters';
import { MetadataStorage } from '@shell-browser/classes';
import {
    CustomRequestEventEnum,
    CustomResponseEventEnum,
    MetadataKeyEnum
} from '@shell-browser/enums';
import { emitCustomEvent } from '@shell-browser/functions';
import { OriginalMetadataOperation } from '@shell-browser/interfaces';
import type { Observable } from 'rxjs';
import { fromEvent, map, takeUntil } from 'rxjs';

export class MetadataOperationsService {
    private get metadataOperation$(): Observable<OriginalMetadataOperation> {
        return MetadataStorage.get(MetadataKeyEnum.MetadataOperation);
    }

    private get stopReceiveOperations$(): Observable<unknown> {
        return fromEvent(document, CustomRequestEventEnum.StopReceiveMetadataOperation);
    }

    public initMetadataOperationEmitter(): void {
        this.metadataOperation$
            ?.pipe(
                takeUntil(this.stopReceiveOperations$),
                map((operation) => adaptOperationToExtensionFormat(operation))
            )
            .subscribe((data) => emitCustomEvent(CustomResponseEventEnum.MetadataOperation, data));
    }
}
