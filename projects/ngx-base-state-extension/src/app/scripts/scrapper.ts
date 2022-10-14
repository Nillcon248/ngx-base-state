import { Observable } from 'rxjs';
import { MetadataKeyEnum } from '../../../../ngx-base-state/src/lib/enums';
import { MetadataStorage } from '../../../../ngx-base-state/src/lib/helpers';
import { ɵMetadataOperation } from '../../../../ngx-base-state/src/lib/classes';
import { METADATA_OPERATION_EMITTER_EVENT } from './consts';

const metadataOperation$: Observable<ɵMetadataOperation> = MetadataStorage
    .get(MetadataKeyEnum.MetadataOperation);

metadataOperation$
    .subscribe((metadataOperation) => {
        const event = new CustomEvent(METADATA_OPERATION_EMITTER_EVENT, { detail: metadataOperation });
        document.dispatchEvent(event);
    });
