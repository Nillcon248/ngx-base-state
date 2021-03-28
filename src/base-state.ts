import { BehaviorSubject, Observable } from 'rxjs';

/**
 * The base class, used for creation more
 *
 * @type {Object.<string, number>}
 */
export abstract class BaseState<T> {

	public get data$(): Observable<T | null> {
		return this._data$.asObservable();
	}

	public get data(): T | null {
		return this._data$.value;
	}

	protected readonly initialData: T | null = null;

	protected readonly _data$: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(this.initialData);

	public set(value: T): void {
		this.setNewValue(value);
	}

	public clear(): void {
		this.setNewValue(null);
	}

	protected setNewValue(value: T | null): void {
		this._data$.next(value);
	}

	protected tryDoAction<V>(actionName: string, actionFunc: () => any): V {
		try {
			return actionFunc();
		} catch (e) {
			this.catchError(e, actionName);

			// Quick fix of this issue 'not all code paths return a value'
			return undefined;
		}
	}

	protected catchError(e: Error, actionName: string): Error {
		if (e instanceof TypeError) {
			throw new Error(`Can not ${actionName}. Firstly set array.`);
		}

		throw new Error(`Error: '${e.message}' in action '${actionName}'`);
	}
}