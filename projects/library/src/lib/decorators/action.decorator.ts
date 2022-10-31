import { patchedActionFunction } from '../functions';

export function ɵAction(targetClass: any, fieldName: string, descriptor: any): any {
    const originalMethod = descriptor.value;

    descriptor.value = patchedActionFunction(fieldName, originalMethod);
}
