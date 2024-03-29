// Based on https://github.com/Tinkoff/taiga-ui/blob/main/projects/cdk/decorators/pure.ts
// eslint-disable-next-line max-lines-per-function
export function memoize<T>(
    _target: object,
    propertyKey: string,
    { get, enumerable, value }: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> {
    if (get) {
        return {
            enumerable,
            get(): T {
                const result = get.call(this);

                Object.defineProperty(this, propertyKey, { enumerable, value: result });

                return result;
            }
        };
    }

    if (typeof value !== `function`) {
        throw new Error('@memoize decorator works with functions only');
    }

    const original = value;

    return {
        enumerable,
        // eslint-disable-next-line max-lines-per-function
        get(): T {
            let previousArgs: readonly unknown[] = [];
            let originalFnWasCalledLeastAtOnce = false;
            let pureValue: unknown;

            const patched = (...args: unknown[]): unknown => {
                const isPure =
                    originalFnWasCalledLeastAtOnce &&
                    previousArgs.length === args.length &&
                    args.every((arg, index) => arg === previousArgs[index]);

                if (isPure) {
                    return pureValue;
                }

                previousArgs = args;
                pureValue = original.apply(this, args);
                originalFnWasCalledLeastAtOnce = true;

                return pureValue;
            };

            Object.defineProperty(this, propertyKey, { value: patched });

            return patched as unknown as T;
        }
    };
}
