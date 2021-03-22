import { BaseState } from './base-state';

export abstract class ArrayState<T> extends BaseState<T[]> {
	public set(array: T[]): void {
		this.setNewValue(array);
	}

	public getByIndex(index: number): T {
		try {
			const items = this.data as T[];

			return items[index];
		} catch (error) {
			throw this.getErrorMessage(error, 'get by index');
		}
	}

	public addItem(item: T): void  {
		try {
			const items = this.data as T[];

			items.push(item);

			this.setNewValue(items);
		} catch (error) {
			throw this.getErrorMessage(error, 'add item');
		}
	}

	public removeItem(item: T): void {
		try {
			const items = (this.data as T[])
				.filter((currentItem) => !this.compareItems(currentItem, item));

			this.setNewValue(items);
		} catch (error) {
			throw this.getErrorMessage(error, 'remove item');
		}
	}

	public updateItemByIndex(itemToChange: T, index: number): void {
		try {
			const items = this.data as T[];

			items[index] = itemToChange;

			this.setNewValue(items);
		} catch (error) {
			throw this.getErrorMessage(error, 'change item by index');
		}
	}

	public updateItem(itemToUpdate: T): void {
		try {
			const items = this.data as T[];
			const itemIndex = (items)
				.findIndex((currentItem) => this.compareItems(currentItem, itemToUpdate));

			items[itemIndex] = itemToUpdate;

			this.setNewValue(items);
		} catch (error) {
			throw this.getErrorMessage(error, 'update item');
		}
	}

	protected abstract compareItems(firstItem: T, secondItem: T): boolean;
}
