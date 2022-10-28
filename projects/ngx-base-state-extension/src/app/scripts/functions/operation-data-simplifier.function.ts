// This script simplifies complex data.
// CustomEvent doesn't support objects which more complex that JSON objects.
import { isObject } from '../../core/helpers/methods.helpers';
import { adaptDataToStringPreview } from '../helpers/adapt-data-to-string-preview.helper';
import { removeCircularReferences } from '../helpers/circular-reference-remover.helper';

export function simplifyOperationData(data: unknown): unknown {
    const simplifiedData = simplifyUnknownData(data);

    if (Array.isArray(simplifiedData) || isObject(simplifiedData)) {
        return removeCircularReferences(simplifiedData);
    }

    return simplifiedData;
}

function simplifyUnknownData(data: unknown): unknown {
    if (Array.isArray(data)) {
        return proccessArray(data);
    } else if (isObject(data)) {
        return processObject(data);
    } else if (typeof data === 'function') {
        return adaptDataToStringPreview(data);
    }

    return data;
}

function proccessArray(array: unknown[]): unknown {
    return array.map((item) => simplifyUnknownData(item));
}

function processObject(data: object): unknown {
    if (data.constructor.name === 'Object') {
        return simplifyObject(data);
    } else {
        return adaptDataToStringPreview(data);
    }
}

function simplifyObject(data: object): object {
    return Object.entries(data).reduce((output, [key, value]) => {
        output[key] = simplifyUnknownData(value);

        return output;
    }, {} as any);
}
