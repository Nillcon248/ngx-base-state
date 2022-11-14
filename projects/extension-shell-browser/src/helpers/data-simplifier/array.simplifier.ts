import { BaseSimplifier } from './base.simplifier';
import { UnknownDataSimplifier } from './unknown-data.simplifier';

export class ArraySimplifier extends BaseSimplifier {
    public isCompatible(data: unknown): data is unknown[] {
        return Array.isArray(data);
    }

    public process(data: unknown[]): unknown {
        return data.map((item) => UnknownDataSimplifier.process(item));
    }
}
