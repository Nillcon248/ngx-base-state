import { ɵAction as Action } from '../decorators';
import { isObject } from '../helpers';
import { BaseState } from './base.state';

/**
 *	@class
 *	@classdes Object state class. Used for save state with Object type.
 */
export abstract class ObjectState<T extends object> extends BaseState<T> {
    /**
     *  Updates state by merging new partial object with the existing one.
     *  @public
     *  @param {T | null} value - the value that should be set to update `BehaviorSubject`.
     */
    @Action
    public updateWithPartial(value: Partial<T>): void {
        this.set({ ...this.data!, ...value });
    }

    protected override setNewValue(value: T | null): void {
        if (value) {
            super.setNewValue({ ...value });
        } else {
            super.setNewValue(null);
        }
    }

    protected override catchError(error: Error | TypeError, actionName: string): void {
        if (error instanceof TypeError) {
            throw new Error(
                `\n${this.constructor.name} [${actionName}]:` +
                `Firstly set Object.\n\n${error.message}`
            );
        }

        super.catchError(error, actionName);
    }

    protected override validateDataType(data: unknown): void {
        if (!isObject(data)) {
            throw new Error(`${this.constructor.name}: Expected data in Object format!`);
        }
    }
}
