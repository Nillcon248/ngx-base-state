import { StateDataTypeEnum } from '@extension-enums';
import { StateDataType } from '../interfaces';

export const DATA_TYPE_MAP = new Map<StateDataTypeEnum, StateDataType>([
    [StateDataTypeEnum.Array, {
        id: StateDataTypeEnum.Array,
        name: 'Array',
        color: '#ff8400'
    }],
    [StateDataTypeEnum.Object, {
        id: StateDataTypeEnum.Object,
        name: 'Object',
        color: '#ff8400'
    }],
    [StateDataTypeEnum.String, {
        id: StateDataTypeEnum.String,
        name: 'String',
        color: '#FF6B6B'
    }],
    [StateDataTypeEnum.Number, {
        id: StateDataTypeEnum.Number,
        name: 'Number',
        color: '#009688'
    }],
    [StateDataTypeEnum.Boolean, {
        id: StateDataTypeEnum.Boolean,
        name: 'Boolean',
        color: '#B938A4'
    }],
    [StateDataTypeEnum.Null, {
        id: StateDataTypeEnum.Null,
        name: 'null',
        color: '#304fc9'
    }],
    [StateDataTypeEnum.Undefined, {
        id: StateDataTypeEnum.Undefined,
        name: 'undefined',
        color: '#c93030'
    }]
]);
