import { BaseState } from './base.state';

type Primitive = number | string | boolean | bigint | symbol | null;

/**
 *	@class
 *	@classdes Primitive state class. Used for save state with Primitive type (Like boolean, number or string).
 */
export class PrimitiveState<T extends Primitive> extends BaseState<T> {}
