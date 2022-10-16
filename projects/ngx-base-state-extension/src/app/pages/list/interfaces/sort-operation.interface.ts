import { StateFullInfo } from './state-full-info.interface';

export interface SortOperation {
    readonly name: string;
    readonly compareFn: (operationA: StateFullInfo, operationB: StateFullInfo) => number;
}
