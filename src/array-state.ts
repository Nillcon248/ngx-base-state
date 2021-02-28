import { BehaviorSubject, Observable } from 'rxjs';

export abstract class ArrayState<T> {

	public get data$(): Observable<T[] | null> {
		return this._data$.asObservable();
	}

	public get data(): T[] | null {
		return this._data$.value;
	}

	private readonly _data$: BehaviorSubject<T[] | null> = new BehaviorSubject<T[] | null>(null);

	public set(array: T[]): void {
		this.setNewValue(array);
	}

	public addItem (item: T): void  {
		try {
			const items: T[] = this.data as T[];

			items.push(item);

			this.setNewValue(items);
		} catch(e) {
			this.catchError(e, 'add item');
		}
	}

	public removeItem(item: T): void {
		try {
			const items: T[] = (this.data as T[])
				.filter(_currentItem => 
					!this.compareItems(_currentItem, item)
				);

			this.setNewValue(items);
		} catch(e) {
			this.catchError(e, 'remove item');
		}
	}

	public updateItem(itemToUpdate: T): void {
		try {
			const items = this.data as T[];
			const itemIndex = (items)
				.findIndex(_currentItem => 
					this.compareItems(_currentItem, itemToUpdate)
				);

			items[itemIndex] = itemToUpdate;

			this.setNewValue(items);
		} catch(e) {
			this.catchError(e, 'update item');
		}
	}

	protected setNewValue(value: T[] | null): void {
		this._data$.next(value);
	}

	private catchError(e: Error, actionName: string): void {
		if (e instanceof TypeError) {
			throw new Error(`Can not ${actionName}. Firstly set array.`);
		}
	}

	abstract compareItems(firstItem: T, secondItem: T): boolean;
}
