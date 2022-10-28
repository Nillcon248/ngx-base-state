import { removeCircularReferences } from './circular-reference-remover.helper';
import { isObject } from './methods.helpers';

describe('removeCircularReferences [helper]', () => {
	beforeEach(() => {});

	it('should remove circular references from array with objects', () => {
        const data = [];
        const simpleItem = {
            myNumberField: 1,
            myStringField: 'Field'
        };
        const circularItem = {
            test: 'tst'
        };
        circularItem['circular'] = circularItem;

        data.push(simpleItem, circularItem);

        const processedResult = removeCircularReferences(data);

        expect(Array.isArray(processedResult)).toBeTrue();
        expect(processedResult[0]).toEqual(simpleItem);
        expect(processedResult[1].test).toBe('tst');
        expect(processedResult[1].circular).toContain('[CIRCULAR REFERENCE]');
	});

    it('should remove circular references from object [depth=1]', () => {
        const data = {
            myNumberField: 1,
            myStringField: 'Field'
        };
        data['circular'] = data;

        const processedResult = removeCircularReferences(data);

        expect(isObject(processedResult)).toBeTrue();
        expect(processedResult.circular).toContain('[CIRCULAR REFERENCE]');
	});

    it('should remove circular references from object [depth=2]', () => {
        const data = {
            myNumberField: 1,
            myStringField: 'Field'
        };
        data['circular'] = {
            depth1: data
        };

        const processedResult = removeCircularReferences(data);

        expect(processedResult.circular.depth1).toContain('[CIRCULAR REFERENCE]');
	});

    it('should remove circular references from object [depth=2] with object inside array', () => {
        const data = {
            myNumberField: 1,
            myStringField: 'Field'
        };
        data['circular'] = [
            {
                depth1: data
            }
        ]

        const processedResult = removeCircularReferences(data);

        expect(processedResult.circular[0].depth1).toContain('[CIRCULAR REFERENCE]');
	});
});
