import { BehaviorSubject, Observable } from 'rxjs';

export abstract class BaseState<T> {
	public get data$(): Observable<T | null> {
		return this._data$.asObservable();
	}

	public get data(): T | null {
		return this._data$.value;
    }
    
    protected readonly _data$: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(null);

	public set(value: T): void {
		this.setNewValue(value);
	}

	public clear(): void {
		this.setNewValue(null);
	}

	protected setNewValue(value: T | null): void {
		this._data$.next(value);
	}

	protected getErrorMessage(e: Error, actionName: string): Error {
		if (e instanceof TypeError) {
			return new Error(`Can not ${actionName}. Firstly set array.`);
		}

		return new Error('Unknow error')
	}
}