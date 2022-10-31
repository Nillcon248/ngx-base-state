import { ɵNGX_STATE_DECORATOR_METADATA_FIELD } from '../constants';
import { patchedActionFunction } from '../functions';

const forbiddenMethodNamesToPatch = [
    'constructor',
    'ngOnDestroy'
];

export function NgxState(): any {
    return function InnerFunction(targetClass: any): any {
        const prototype = targetClass.prototype;

        markTargetClassWithMetadata(prototype);

        Object.getOwnPropertyNames(prototype).forEach((fieldName) => {
            const isFieldNameForbidden = forbiddenMethodNamesToPatch.includes(fieldName);

            if (!isFieldNameForbidden && isFieldHaveTypeFunction(prototype, fieldName)) {
                markMethodOfStateAsAction(prototype, fieldName, prototype[fieldName]);
            }
        });
    };
}

function markTargetClassWithMetadata(stateClass: any): void {
    stateClass[ɵNGX_STATE_DECORATOR_METADATA_FIELD] = true;
}

function markMethodOfStateAsAction(
    stateClass: any,
    fieldName: string,
    originalMethod: Function
): void {
    stateClass[fieldName] = patchedActionFunction(fieldName, originalMethod);
}

function isFieldHaveTypeFunction(stateClass: any, fieldName: string): boolean {
    return (
        !Object.getOwnPropertyDescriptor(stateClass, fieldName)?.get &&
        !Object.getOwnPropertyDescriptor(stateClass, fieldName)?.set &&
        (typeof stateClass[fieldName] === 'function')
    );
}
