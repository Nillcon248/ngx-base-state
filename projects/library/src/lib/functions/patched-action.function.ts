const tryDoActionMethodName = 'tryDoAction';
const actionLikeInvokedMethodName = '_onActionLikeInvoked';
const actionLikeInvokeEndMethodName = '_onActionLikeInvokeEnd';

export function patchedActionFunction(actionName: string, actionFunction: Function): unknown {
    return function innerFunction(this: typeof innerFunction, ...args: unknown[]): unknown {
        return this[tryDoActionMethodName](actionName, () => {
            this[actionLikeInvokedMethodName](actionName);

            const originalMethodResult = actionFunction.apply(this, args);

            this[actionLikeInvokeEndMethodName]();

            return originalMethodResult;
        });
    };
}
