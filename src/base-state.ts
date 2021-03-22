import { BehaviorSubject, Observable } from 'rxjs';

export abstract class BaseState<T> {
	public get data$(): Observable<T | null> {
		return this._data$.asObservable();
	}

	public get data(): T | null {
		return this._data$.value;
    }
    
    protected readonly _data$ = new BehaviorSubject<T | null>(null);

	public set(value: T): void {
		this.setNewValue(value);
	}

	public clear(): void {
		this.setNewValue(null);
	}

	protected setNewValue(value: T | null): void {
		this._data$.next(value);
	}

	protected getErrorMessage(error: Error, actionName: string): Error {
		if (error instanceof TypeError) {
			return new Error(`Can't ${actionName}. Firstly set array.`);
		}

		return new Error('Unknown error.');
	}
}
