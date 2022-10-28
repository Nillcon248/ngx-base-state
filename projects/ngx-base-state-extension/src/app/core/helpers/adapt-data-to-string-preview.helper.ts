import * as inspect from 'object-inspect';

export function adaptDataToStringPreview(object: object, maxLength: number = 140): string {
    return inspect(object, { depth: 1, indent: '\t', maxStringLength: maxLength });
}
