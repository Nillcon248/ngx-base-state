import { SortOperation } from '../interfaces';

export const SORT_OPERATION_ARRAY: SortOperation[] = [
    {
        name: 'Date [DESC]',
        compareFn: (operationA, operationB) => (
            new Date(operationB.date).getTime() - new Date(operationA.date).getTime()
        )
    },
    {
        name: 'Date [ASC]',
        compareFn: (operationA, operationB) => (
            new Date(operationA.date).getTime() - new Date(operationB.date).getTime()
        )
    },
    {
        name: 'Name [ASC]',
        compareFn: (operationA, operationB) => (
            operationA.className.localeCompare(operationB.className)
        )
    },
    {
        name: 'Name [DESC]',
        compareFn: (operationA, operationB) => (
            operationB.className.localeCompare(operationA.className)
        )
    },
    {
        name: 'Operation type [ASC]',
        compareFn: (operationA, operationB) => (
            operationA.type - operationB.type
        )
    },
    {
        name: 'Operation type [DESC]',
        compareFn: (operationA, operationB) => (
            operationB.type - operationA.type
        )
    }
];
