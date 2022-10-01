import { MetadataKeyEnum } from '../../../../ngx-base-state/src/lib/enums';
import { NgxBaseStateDevtoolsMetadata as Metadata } from '../../../../ngx-base-state/src/lib/interfaces';
import { Observable } from 'rxjs';
import { METADATA_INPUT_ELEMENT_ID } from './consts';

const windowObj: any = window;
const dataKey = MetadataKeyEnum.Data;
const metadata$: Observable<Metadata> = windowObj[dataKey];
const metadataInputElement = document.createElement('input');
metadataInputElement.id = METADATA_INPUT_ELEMENT_ID;
metadataInputElement.type = 'hidden';

document.body.appendChild(metadataInputElement);

metadata$.subscribe((metadata) => {
    metadataInputElement.value = JSON.stringify(metadata);

    // FIXME: Find actual approach to trigger "change" event
    const event = document.createEvent("HTMLEvents");
    event.initEvent("change", false, true);
    metadataInputElement.dispatchEvent(event);
});
