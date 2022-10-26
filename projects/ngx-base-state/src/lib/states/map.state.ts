import { Observable, map, shareReplay } from 'rxjs';
import { BaseState } from './base.state';
import { ɵAction as Action } from '../decorators';

/**
 *	@class
 *	@classdes Map state class. Used for save state with Map type.
 */
export abstract class MapState<TKey, TValue> extends BaseState<Map<TKey, TValue>> {
    public get dataAsArray(): TValue[] | null {
        return (this.data) ? [...this.data.values()] : [];
    }

    public readonly dataAsArray$: Observable<TValue[] | null> = this.data$
        .pipe(
            map(() => this.dataAsArray),
            shareReplay(1)
        );

    @Action
    public setItem(key: TKey, value: TValue): void {
        this.data!.set(key, value);
        this.setNewValue(this.data);
    }

    @Action
    public deleteItem(key: TKey): void {
        this.data!.delete(key);
        this.setNewValue(this.data);
    }

    @Action
    public clearItems(): void {
        this.set(new Map());
    }

    /**
     *  Copied value to new array for avoid issues with ChangeDetection
     *  @protected
     *  @param {Map<TKey, TValue> | null} value - the value that should be set to update `BehaviorSubject`.
     */
     protected override setNewValue(value: Map<TKey, TValue> | null): void {
        if (value) {
            super.setNewValue(new Map(value));
        } else {
            super.setNewValue(null);
        }
    }

    protected override catchError(error: Error | TypeError, actionName: string): void {
		if (error instanceof TypeError) {
            throw new Error(`\n${this.constructor.name} [${actionName}]: Firstly set Map.\n\n${error.message}`);
		}

		super.catchError(error, actionName);
	}
}
