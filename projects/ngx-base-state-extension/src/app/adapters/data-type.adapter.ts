import { Injectable } from '@angular/core';
import { StateDataTypeEnum } from '@extension-core';

@Injectable({
    providedIn: 'root'
})
export class DataToTypeAdapter {
    public adapt(data: unknown): StateDataTypeEnum {
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
