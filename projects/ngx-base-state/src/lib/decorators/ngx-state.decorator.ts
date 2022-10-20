import { ɵTryDoActionFunction } from '../types';
import { ɵTRY_DO_ACTION_METHOD_NAME } from '../data';

const forbiddenMethodNamesToPatch = [
    'constructor',
    'ngOnDestroy'
];

export function NgxState(): any {
    return function InnerFunction(targetClass: any, fieldName: string, descriptor: any): any {
        const prototype = targetClass.prototype;

        Object.getOwnPropertyNames(prototype).forEach((fieldName) => {
            const isFieldNameForbidden = forbiddenMethodNamesToPatch.includes(fieldName);

            if (!isFieldNameForbidden && isFieldHaveTypeFunction(prototype, fieldName)) {
                markMethodOfStateAsAction(prototype, fieldName, prototype[fieldName]);
            }
        });
    };
}

function markMethodOfStateAsAction(stateClass: any, fieldName: string, originalMethod: Function): void {
    const tryDoAction: ɵTryDoActionFunction = stateClass[ɵTRY_DO_ACTION_METHOD_NAME];
    
    stateClass[fieldName] = function(...args: unknown[]): unknown {
        return tryDoAction.call(this, fieldName, () => {
            return originalMethod.apply(this, args);
        });
    }
}

function isFieldHaveTypeFunction(stateClass: any, fieldName: string): boolean {
    return (
        !Object.getOwnPropertyDescriptor(stateClass, fieldName)?.get &&
        !Object.getOwnPropertyDescriptor(stateClass, fieldName)?.set &&
        (typeof stateClass[fieldName] === 'function')
    );
}
