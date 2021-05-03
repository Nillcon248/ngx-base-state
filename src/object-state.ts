import { BaseState } from './base-state';


/**
 *	@class
 *	@classdes Object state class. Used for save state with Object type.
 */
export abstract class ObjectState<T> extends BaseState<T> {
	/**
	 * 
	 *  Copied value to new object for avoid issues with ChangeDetection
	 */
	protected setNewValue(value: T | null): void {
		if (value) {
			this._data$.next({...value});
		} else {
			this._data$.next(null);
		}
	}
}
