import { adaptDataToStringPreview } from '../adapt-data-to-string-preview.helper';
import { isExtendedObject, isObject } from '../methods.helpers';
import { BaseSimplifier } from './base.simplifier';

export class ExtendedObjectSimplifier extends BaseSimplifier {
    public isCompatible(data: unknown): data is Object {
        return (isObject(data) && isExtendedObject(data));
    }

    public process(data: Object): unknown {
        return adaptDataToStringPreview(data);
    }
}
