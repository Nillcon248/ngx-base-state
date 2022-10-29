import { map, Observable, shareReplay } from 'rxjs';
import { ɵAction as Action } from '../decorators';
import { BaseState } from './base.state';

/**
 *	@class
 *	@classdes Record state class. Used for save state with Record type.
 */
export abstract class RecordState<TKey extends string, TValue>
    extends BaseState<Record<TKey, TValue>> {
    /**
	 *  Get all `keys` of your `Record` object state.
     *  @public
	 */
    public get keys(): TKey[] {
        return (this.data) ? Object.keys(this.data) as TKey[] : [];
    }

    /**
	 *  Get all `values` of your `Record` object state.
     *  @public
	 */
    public get values(): TValue[] {
        return (this.data) ? Object.values(this.data) : [];
    }

    /**
	 *  Get `Observable` with all `keys` of your `Record` object state.
     *  @public
	 */
    public readonly keys$: Observable<TKey[]> = this.data$
        .pipe(
            map(() => this.keys),
            shareReplay(1)
        );

    /**
	 *  Get `Observable` with all `values` of your `Record` object state.
     *  @public
	 */
    public readonly values$: Observable<TValue[]> = this.data$
        .pipe(
            map(() => this.values),
            shareReplay(1)
        );

    /**
     * 	Set item to object in state.
     *	@public
     *	@param {TKey} key - Key to set into.
     *	@param {TValue} value - Value to set within `key`.
     */
    @Action
    public setItem(key: TKey, value: TValue): void {
        this.data![key] = value;

        this.setNewValue(this.data);
    }

    /**
     * 	Remove item from object in state.
     *	@public
     *	@param {TKey} key - Key to remove item within.
     */
    @Action
    public removeItem(key: TKey): void {
        delete this.data![key];

        this.setNewValue(this.data);
    }

    /**
     * 	Remove all items from object in state.
     *	@public
     */
    @Action
    public removeAllItems(): void {
        this.set({} as Record<TKey, TValue>);
    }

	protected override setNewValue(value: Record<TKey, TValue> | null): void {
		if (value) {
			super.setNewValue({ ...value });
		} else {
			super.setNewValue(null);
		}
	}

	protected override catchError(error: Error | TypeError, actionName: string): void {
		if (error instanceof TypeError) {
            throw new Error(`\n${this.constructor.name} [${actionName}]: Firstly set Object [Record].\n\n${error.message}`);
		}

		super.catchError(error, actionName);
	}
}
