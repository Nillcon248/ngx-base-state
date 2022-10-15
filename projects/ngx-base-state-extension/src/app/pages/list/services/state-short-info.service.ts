import { Injectable } from '@angular/core';
import { combineLatest, map, share } from 'rxjs';
import { ɵMetadataOperation } from '@ngx-base-state/classes';
import { DataTypeService, MetadataService } from '@extension-services';
import { StateDataTypeEnum } from '@extension-core';
import { StateShortInfo } from '../interfaces';
import { StateDataType } from '../../../interfaces';
import { DATA_TYPE_MAP, OPERATION_TYPE_MAP } from '../../../data';

@Injectable()
export class StateShortInfoService {
    public readonly data$ = combineLatest([
        this.metadataService.data$,
        this.dataTypeService.data$
    ])
        .pipe(
            map(([metadata, dataTypeMap]) => this.adaptMetadata(metadata, dataTypeMap)),
            share()
        );

    constructor(
        private readonly metadataService: MetadataService,
        private readonly dataTypeService: DataTypeService
    ) {}

    private adaptMetadata(
        metadataMap: Map<string, ɵMetadataOperation>,
        dataTypeMap: Map<string, StateDataTypeEnum>
    ): StateShortInfo[] {
        return [...metadataMap.keys()]
            .map((className) => {
                const operationTypeId = metadataMap.get(className)!.type;
                const dataTypeId = dataTypeMap.get(className) as StateDataTypeEnum;
                const operationType = OPERATION_TYPE_MAP.get(operationTypeId)!;

                return {
                    className,
                    operationType,
                    dataType: this.getDataTypeById(dataTypeId)
                } as StateShortInfo;
            });
    }

    private getDataTypeById(id: StateDataTypeEnum): StateDataType {
        return DATA_TYPE_MAP.get(id) as StateDataType;
    }
}
