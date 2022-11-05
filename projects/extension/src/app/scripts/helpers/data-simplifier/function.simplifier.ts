import { adaptDataToStringPreview } from '../adapt-data-to-string-preview.helper';
import { BaseSimplifier } from './base.simplifier';

export class FunctionSimplifier extends BaseSimplifier {
    public isCompatible(data: unknown): data is Function {
        return (typeof data === 'function');
    }

    public process(data: Function): unknown {
        return adaptDataToStringPreview(data);
    }
}
