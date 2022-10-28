import { adaptDataToStringPreview } from './adapt-data-to-string-preview.helper';

// Based on https://github.com/joaopmi/circular-reference-remover/blob/main/src/app-ts/circular-remover.ts
export function removeCircularReferences(src: any): any {
    if (src === undefined || src === null) {
        return src;
    }

    return referenceRemover(src);
}

function referenceRemover(src: any): any {
    function internalRemover(target: any, src: any, references: any[]) {
        for (const key in src) {
            const srcValue = src[key];

            if ('object' !== typeof srcValue) {
                target[key] = srcValue;

                continue;
            } else {
                let referenceFound = false;

                for (const reference of references) {
                    if (reference === srcValue) {
                        target[key] = `[CIRCULAR REFERENCE] ${adaptDataToStringPreview(reference, 60)}`;
                        referenceFound = true;

                        break;
                    }
                }

                if (!referenceFound) {
                    if (srcValue instanceof Map) {
                        const entries = Array.from(srcValue);
                        target[key] = entries;

                        internalRemover(entries, entries, [...references, entries]);
                    } else {
                        target[key] = Object.assign({}, srcValue);

                        internalRemover(target[key], srcValue, [...references, srcValue]);
                    }
                }
            }
        }

        return target;
    }

    return internalRemover({}, src, [src]);
}
