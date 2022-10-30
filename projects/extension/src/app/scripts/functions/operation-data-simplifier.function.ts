/* eslint-disable max-lines-per-function */
// This script simplifies complex data.
// CustomEvent doesn't support no-serializable objects.

// FIXME: Refactor
// FIXME: Might be added web worker if this algorithm has optimization issues
import { isExtendedObject, isObject } from '../../core/helpers/methods.helpers';
import { adaptDataToStringPreview } from '../helpers/adapt-data-to-string-preview.helper';

export function simplifyUnknownData(data: unknown): unknown {
    if (Array.isArray(data)) {
        return simplifyArrayItems(data);
    } else if (isObject(data) && isExtendedObject(data)) {
        return adaptDataToStringPreview(data);
    } else if (isObject(data)) {
        return removeCircularReferencesAndSimplifyObject(data);
    } else if (typeof data === 'function') {
        return adaptDataToStringPreview(data);
    }

    return data;
}

function simplifyArrayItems(array: unknown[]): unknown {
    return array.map((item) => simplifyUnknownData(item));
}

function removeCircularReferencesAndSimplifyObject(data: object): any {
    function internalRemover(target: any, originalData: any, references: any[]): unknown {
        for (const [key, value] of Object.entries(originalData)) {
            if (isObjectWithDefaultConstructorName(value)) {
                if (isObjectContainedInReferences(value, references)) {
                    target[key] = getCircularReferenceStringPreview(value);
                } else {
                    target[key] = (Array.isArray(value)) ? [] : {};

                    internalRemover(target[key], value, [...references, value]);
                }
            } else {
                target[key] = simplifyUnknownData(value);
            }
        }

        return target;
    }

    return internalRemover({}, data, [data]);
}

function getCircularReferenceStringPreview(data: any): string {
    return `[[CIRCULAR REFERENCE]] ${adaptDataToStringPreview(data, 60)}`;
}

function isObjectContainedInReferences(data: any, references: unknown[]): boolean {
    return references.some((reference) => (reference === data));
}

function isObjectWithDefaultConstructorName(data: unknown): boolean {
    return (
        (data !== null) &&
        (typeof data === 'object') &&
        (data.constructor.name === 'Object')
    );
}
