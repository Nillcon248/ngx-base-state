import { BaseState } from './base-state';

enum ArrayStateActionEnum {
	GetByIndex = 'get by index',
	PushItem = 'push item',
	RemoveItem = 'remove item',
	ChangeItemByIndex = 'change item by index',
	UpdateItem = 'update item',
}

export abstract class ArrayState<T> extends BaseState<T[]> {

	public getByIndex(index: number): T {
		return this.tryDoAction<T>(ArrayStateActionEnum.GetByIndex, () => {
			const items = this.data;

			return items[index];
		});
	}

	public pushItem (item: T): void  {
		return this.tryDoAction<void>(ArrayStateActionEnum.PushItem, () => {
			const items = this.data;

			items.push(item);

			this.setNewValue(items);
		});
	}

	public removeItem(itemId: any): T {
		return this.tryDoAction<T>(ArrayStateActionEnum.RemoveItem, () => {
			const items = this.data;

			const index = this.data
				.findIndex(_item =>
					this.getItemId(_item) === itemId
				);

			const removedItem = items.splice(index, 1).shift();

			this.setNewValue(items);

			return removedItem;
		});
	}

	public updateItemByIndex(itemToChange: T, index: number): void {
		this.tryDoAction<void>(ArrayStateActionEnum.ChangeItemByIndex, () => {
			const items = this.data;

			items[index] = itemToChange;

			this.setNewValue(items);
		});
	}

	public updateItem(itemToUpdate: T): void {
		this.tryDoAction<void>(ArrayStateActionEnum.UpdateItem, () => {
			const items = this.data;

			const itemIndex = (items)
				.findIndex(_currentItem =>
					this.compareItems(_currentItem, itemToUpdate)
				);

			items[itemIndex] = itemToUpdate;

			this.setNewValue(items);
		});
	}

	private compareItems(firstItem: T, secondItem: T): boolean {
		return this.getItemId(firstItem) === this.getItemId(secondItem);
	}

	protected abstract getItemId(item: T): any;
}
