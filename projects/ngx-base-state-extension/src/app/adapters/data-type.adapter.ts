import { Injectable } from '@angular/core';
import { NgxBaseStateDevtoolsMetadata as Metadata } from '@ngx-base-state/interfaces';
import { StateDataTypeEnum } from '@extension-core';

@Injectable({
    providedIn: 'root'
})
export class DataTypeAdapter {
    public adapt(metadata: Metadata): Map<string, StateDataTypeEnum> {
        const data = new Map<string, StateDataTypeEnum>();

        for (const [className, stateData] of Object.entries(metadata)) {
            let dataType = this.adaptDataType(stateData);

            data.set(className, dataType);
        }

        return data;
    }

    private adaptDataType(data: unknown): StateDataTypeEnum {
        if (Array.isArray(data)) {
            return StateDataTypeEnum.Array;
        } else if (typeof data === 'number') {
            return StateDataTypeEnum.Number;
        } else if (typeof data === 'string') {
            return StateDataTypeEnum.String;
        } else if (typeof data === 'boolean') {
            return StateDataTypeEnum.Boolean;
        } else if (data === null) {
            return StateDataTypeEnum.Null;
        } else if (data === undefined) {
            return StateDataTypeEnum.Undefined;
        }

        return StateDataTypeEnum.Object;
    }
}
