import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StateDataTypeEnum } from '@extension-core';
import { DataTypeService, MetadataService } from '@extension-services';
import { DATA_TYPE_MAP } from '@extension-data';
import { StateDataType } from '@extension-interfaces';
import { OPENED_CLASS_NAME } from '../../consts';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
    public stateData$: Observable<unknown> = this.metadataService.data$
        .pipe(
            map((metadata) => metadata[this.openedClassName])
        );

    public dataType$ = this.dataTypeService.data$
        .pipe(
            map((metadataMap) => metadataMap.get(this.openedClassName) as StateDataTypeEnum),
            map((dataTypeId) => DATA_TYPE_MAP.get(dataTypeId) as StateDataType)
        );

    constructor(
        @Inject(OPENED_CLASS_NAME) private readonly openedClassName: keyof Metadata,
        private readonly metadataService: MetadataService,
        private readonly dataTypeService: DataTypeService
    ) {}
}
