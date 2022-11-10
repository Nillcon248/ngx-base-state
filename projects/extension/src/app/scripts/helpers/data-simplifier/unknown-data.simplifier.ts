import { ArraySimplifier } from './array.simplifier';
import { BaseSimplifier } from './base.simplifier';
import { ExtendedObjectSimplifier } from './extended-object.simplifier';
import { FunctionSimplifier } from './function.simplifier';
import { ObjectSimplifier } from './object.simplifier';

/**
 * This class simplifies complex data.
 * CustomEvent doesn't support no-serializable objects.
 **/
export abstract class UnknownDataSimplifier {
    private static readonly simplifiers: BaseSimplifier[] = [
        new ArraySimplifier(),
        new ExtendedObjectSimplifier(),
        new ObjectSimplifier(),
        new FunctionSimplifier()
    ];

    public static process(data: unknown): unknown {
        const targetSimplifier = this.simplifiers
            .find((simplifier) => simplifier.isCompatible(data));

        if (targetSimplifier) {
            return targetSimplifier.process(data);
        }

        return data;
    }
}
