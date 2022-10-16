import { BaseState } from './base-state';

enum ObjectStateActionEnum {
    UpdateWithPartial = 'update with partial'
}

/**
 *	@class
 *	@classdes Object state class. Used for save state with Object type.
 */
export abstract class ObjectState<T> extends BaseState<T> {
	/**
	 *  Updates state by merging new partial object with the existing one.
     *  @public
     *  @param {T | null} value - the value that should be set to update `BehaviorSubject`.
	 */
	 public updateWithPartial(value: Partial<T>): void {
		this.tryDoAction(ObjectStateActionEnum.UpdateWithPartial, () => {
			this.set({ ...this.data!, ...value });
		});
	}

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
