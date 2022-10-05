import { MetadataKeyEnum } from '../../../../ngx-base-state/src/lib/enums';
import { NgxBaseStateDevtoolsMetadata as Metadata } from '../../../../ngx-base-state/src/lib/interfaces';
import { MetadataStorage } from '../../../../ngx-base-state/src/lib/helpers';
import { Observable } from 'rxjs';
import { METADATA_CHANGE_EVENT } from './consts';

const metadata$: Observable<Metadata> = MetadataStorage.get(MetadataKeyEnum.Data);

metadata$.subscribe((metadata) => emitMetadataChangeEvent(metadata));

function emitMetadataChangeEvent(metadata: Metadata): void {
    const event = new CustomEvent(METADATA_CHANGE_EVENT, { detail: metadata });
    document.dispatchEvent(event);
}
