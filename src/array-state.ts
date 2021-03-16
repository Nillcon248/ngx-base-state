import { BaseState } from './base-state';

export abstract class ArrayState<T> extends BaseState<T[]> {


	public set(array: T[]): void {
		this.setNewValue(array);
	}

	public getByIndex(index: number): T {
		try {
			const items: T[] = this.data as T[];

			return items[index];
		} catch(e) {
			throw this.getErrorMessage(e, 'get by index');
		}
	}

	public addItem (item: T): void  {
		try {
			const items: T[] = this.data as T[];

			items.push(item);

			this.setNewValue(items);
		} catch(e) {
			throw this.getErrorMessage(e, 'add item');
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
			throw this.getErrorMessage(e, 'remove item');
		}
	}

	public updateItemByIndex(itemToChange: T, index: number): void {
		try {
			const items = this.data as T[];

			items[index] = itemToChange;

			this.setNewValue(items);
		} catch(e) {
			throw this.getErrorMessage(e, 'change item by index');
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
			throw this.getErrorMessage(e, 'update item');
		}
	}

	protected abstract compareItems(firstItem: T, secondItem: T): boolean;
}
