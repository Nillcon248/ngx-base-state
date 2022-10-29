/* eslint-disable max-lines-per-function */
// FIXME: Refactor
// Based on https://github.com/joaopmi/circular-reference-remover/blob/main/src/app-ts/circular-remover.ts
import { adaptDataToStringPreview } from './adapt-data-to-string-preview.helper';

export function removeCircularReferences(data: unknown): any {
    const initialNewTarget = (Array.isArray(data)) ? [] : {};

    function internalRemover(target: any, src: any, references: any[]): unknown {
        for (const key in src) {
            const srcValue = src[key];

            if (typeof srcValue !== 'object') {
                target[key] = srcValue;

                continue;
            } else {
                let referenceFound = false;

                for (const reference of references) {
                    if (reference === srcValue) {
                        target[key] = (
                            `[CIRCULAR REFERENCE] ` +
                            `${adaptDataToStringPreview(reference, 60)}`
                        );
                        referenceFound = true;

                        break;
                    }
                }

                if (!referenceFound) {
                    if (srcValue instanceof Map || Array.isArray(srcValue)) {
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

    return internalRemover(initialNewTarget, data, [data]);
}
