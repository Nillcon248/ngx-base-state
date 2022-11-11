import { BaseState } from './base.state';

/**
 *	@class
 *	@classdes Primitive state class. Used for save state with Primitive type (Like boolean, number or string).
 */
export class PrimitiveState<
  T = string | number | boolean | bigint | symbol
> extends BaseState<T> {}
