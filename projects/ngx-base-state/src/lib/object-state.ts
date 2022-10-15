import { BaseState } from './base-state';

/**
 *	@class
 *	@classdes Object state class. Used for save state with Object type.
 */
export abstract class ObjectState<T> extends BaseState<T> {
	/**
	 *  Copied value to new object for avoid issues with ChangeDetection
     *  @protected
     *  @param {T | null} value - the value that should be set to update `BehaviorSubject`.
	 */
	protected override setNewValue(value: T | null): void {
		if (value) {
			super.setNewValue({ ...value });
		} else {
			super.setNewValue(null);
		}
	}
}
