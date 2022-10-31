import * as inspect from 'object-inspect';

export function adaptDataToStringPreview(object: any, maxLength: number = 140): string {
    const objectAsStringPreview = inspect(object, {
        depth: 1,
        indent: '\t',
        maxStringLength: maxLength
    });

    return `[[OBJECT PREVIEW]] ${objectAsStringPreview}`;
}
