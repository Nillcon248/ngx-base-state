import { BaseState } from './base.state';

type Primitive = number | string | boolean | bigint | symbol;

/**
 *	@class
 *	@classdes Primitive state class. Used for save state with Primitive type (Like boolean, number or string).
 */
export class PrimitiveState<T extends Primitive> extends BaseState<T> {
    protected override validateDataType(data: unknown): void {
        const isDataValid = (
            (typeof data === 'number') ||
            (typeof data === 'string') ||
            (typeof data === 'boolean') ||
            (typeof data === 'bigint') ||
            (typeof data === 'symbol')
        );

        if (!isDataValid) {
            throw new Error(`${this.constructor.name}: Expected data in Primitive format!`);
        }
    }
}
