import { SortOperation } from '../interfaces';

export const SORT_OPERATION_ARRAY: SortOperation[] = [
    {
        name: 'Date [DESC]',
        compareFn: (stateInfoA, stateInfoB) => (
            new Date(stateInfoB.operation.date).getTime() - new Date(stateInfoA.operation.date).getTime()
        )
    },
    {
        name: 'Date [ASC]',
        compareFn: (stateInfoA, stateInfoB) => (
            new Date(stateInfoA.operation.date).getTime() - new Date(stateInfoB.operation.date).getTime()
        )
    },
    {
        name: 'Name [ASC]',
        compareFn: (stateInfoA, stateInfoB) => (
            stateInfoA.operation.className.localeCompare(stateInfoB.operation.className)
        )
    },
    {
        name: 'Name [DESC]',
        compareFn: (stateInfoA, stateInfoB) => (
            stateInfoB.operation.className.localeCompare(stateInfoA.operation.className)
        )
    },
    {
        name: 'Operation type [ASC]',
        compareFn: (stateInfoA, stateInfoB) => (
            stateInfoA.operation.type - stateInfoB.operation.type
        )
    },
    {
        name: 'Operation type [DESC]',
        compareFn: (stateInfoA, stateInfoB) => (
            stateInfoB.operation.type - stateInfoA.operation.type
        )
    }
];
