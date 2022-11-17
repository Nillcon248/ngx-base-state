import { adaptDataToStringPreview } from '../adapt-data-to-string-preview.helper';
import { isExtendedObject, isObject } from '../methods.helpers';
import { BaseSimplifier } from './base.simplifier';
import { UnknownDataSimplifier } from './unknown-data.simplifier';

export class ObjectSimplifier extends BaseSimplifier {
    public isCompatible(data: unknown): data is object {
        return (isObject(data) && !isExtendedObject(data));
    }

    public process(data: object): unknown {
        return this.removeCircularReferencesAndSimplifyObject(data);
    }

    // eslint-disable-next-line max-lines-per-function
    private removeCircularReferencesAndSimplifyObject(data: object): any {
        const internalRemover = (target: any, originalData: any, references: any[]): unknown => {
            for (const [key, value] of Object.entries(originalData)) {
                if (this.isWithDefaultConstructorName(value)) {
                    if (this.isContainedInReferences(value, references)) {
                        target[key] = this.getCircularReferenceStringPreview(value);
                    } else {
                        target[key] = (Array.isArray(value)) ? [] : {};

                        internalRemover(target[key], value, [...references, value]);
                    }
                } else {
                    target[key] = UnknownDataSimplifier.process(value);
                }
            }

            return target;
        };

        return internalRemover({}, data, [data]);
    }

    private getCircularReferenceStringPreview(data: any): string {
        return `[[CIRCULAR REFERENCE]] ${adaptDataToStringPreview(data, 60)}`;
    }

    private isContainedInReferences(object: any, references: unknown[]): boolean {
        return references.some((reference) => (reference === object));
    }

    private isWithDefaultConstructorName(object: unknown): boolean {
        return (
            (object !== null) &&
            (typeof object === 'object') &&
            (object.constructor.name === 'Object')
        );
    }
}
