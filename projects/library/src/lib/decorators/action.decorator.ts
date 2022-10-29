import { ɵTRY_DO_ACTION_METHOD_NAME } from '../constants';
import { ɵTryDoActionFunction } from '../types';

export function ɵAction(targetClass: any, fieldName: string, descriptor: any): any {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: unknown[]): unknown {
        const tryDoAction: ɵTryDoActionFunction = targetClass[ɵTRY_DO_ACTION_METHOD_NAME];

        return tryDoAction.call(this, fieldName, () => {
            return originalMethod.apply(this, args);
        });
    };
}
