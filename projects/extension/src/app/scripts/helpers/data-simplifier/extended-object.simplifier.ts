import { isExtendedObject, isObject } from '../../../core/helpers/methods.helpers';
import { adaptDataToStringPreview } from '../adapt-data-to-string-preview.helper';
import { BaseSimplifier } from './base.simplifier';

export class ExtendedObjectSimplifier extends BaseSimplifier {
    public isCompatible(data: unknown): data is Object {
        return (isObject(data) && isExtendedObject(data));
    }

    public process(data: Object): unknown {
        return adaptDataToStringPreview(data);
    }
}
