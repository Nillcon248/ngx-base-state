import { BaseState } from './base-state';

enum ArrayStateActionEnum {
    GetByIndex = 'get by index',
    PushItem = 'push item',
    RemoveItem = 'remove item',
    RemoveItemById = 'remove item by id',
    ChangeItemByIndex = 'change item by index',
    UpdateItem = 'update item'
}

/**
 *	@class
 *	@abstract
 *	@classdes Array state class. Implementing base array functionality.
 */
export abstract class ArrayState<T> extends BaseState<T[]> {
    /**
     * 	Return item by quired index.
     *	@public
    *	@param {Number} index - quired index
    *	@return {Generic} quired item.
    */
    public getByIndex(index: number): T | undefined {
        return this.tryDoAction<T>(ArrayStateActionEnum.GetByIndex, () => {
            const items = this.data;

            return items![index];
        });
    }

    /**
     * 	Push item to array in state.
     *	@public
    *	@param {Generic} item - item needs to push
    */
    public pushItem(item: T): void {
        return this.tryDoAction<void>(ArrayStateActionEnum.PushItem, () => {
            const items = this.data;

            items!.push(item);

            this.setNewValue(items);
        });
    }

    /**
     * 	Remove item in array by item identify param.
     *	@public
    *	@param {Generic} itemId - Id of item you want to remove.
    */
    public removeItem(item: T): T | undefined {
        return this.tryDoAction<T>(ArrayStateActionEnum.RemoveItem, () => {
            const items = this.data;

            const index = this.data!.findIndex((_item) =>
                this.compareItems(item, _item)
            );

            const removedItem = this.data![index];

            items!.splice(index, 1);

            this.setNewValue(items);

            return removedItem;
        });
    }

    public removeItemById(itemId: unknown): T | undefined {
        return this.tryDoAction<T>(ArrayStateActionEnum.RemoveItemById, () => {
            const items = this.data;

            const index = this.data!.findIndex(
                (_item) => itemId === this.getItemId(_item)
            );

            const removedItem = this.data![index];

            items!.splice(index, 1);

            this.setNewValue(items);

            return removedItem;
        });
    }

    /**
     * 	Update item in array by index.
     *	@public
    *	@param {Generic} itemToUpdate - item that will be update.
    *	@param {Generic} index - index of item that need to update.
    */
    public updateItemByIndex(itemToUpdate: T, index: number): void {
        this.tryDoAction<void>(ArrayStateActionEnum.ChangeItemByIndex, () => {
            const items = this.data;

            items![index] = itemToUpdate;

            this.setNewValue(items);
        });
    }

    /**
     * 	Update item in array by item identify param.
     *	@public
    *	@param {Generic} itemToUpdate - item that will be update.
    */
    public updateItem(itemToUpdate: T): void {
        this.tryDoAction<void>(ArrayStateActionEnum.UpdateItem, () => {
            const items = this.data;
            itemToUpdate = { ...itemToUpdate };

            const itemIndex = items!.findIndex((_currentItem) =>
                this.compareItems(_currentItem, itemToUpdate)
            );

            items![itemIndex] = itemToUpdate;

            this.setNewValue(items);
        });
    }

    /**
     *  Copied value to new array for avoid issues with ChangeDetection
     *  @protected
     *  @param {T[] | null} value - the value that should be set to update `BehaviorSubject`.
     */
     protected override setNewValue(value: T[] | null): void {
        if (value) {
            super.setNewValue([...value]);
        } else {
            super.setNewValue(null);
        }
    }

    /**
	 *  Method that	processed error for user friendly error messages
	 *  @protected
     *	@param {Error | TypeError} error - Error.
     *	@param {string} actionName - Name of the action where error happened.
	 */
    protected override catchError(error: Error | TypeError, actionName: string): void {
		if (error instanceof TypeError) {
			throw new Error(`Can not ${actionName}. Firstly set array.`);
		}

		super.catchError(error, actionName);
	}

    /**
     *	Must return identify param of item.
     *	Method must be filled in child classes.
     *	Used for compare two any items.
     *  @protected
     *	@param {Generic} item - item of your state.
     *	@return {Generic} identify param of item.
     */
    protected getItemId(item: T): any {
        return item;
    };

    /**
     * 	Compare two items via `getItemId`
     *	@private
     *	@param {Generic} itemToUpdate - item that will be update.
     *	@return {boolean} result of comparing two items via `getItemId`.
     */
    private compareItems(firstItem: T, secondItem: T): boolean {
        return (this.getItemId(firstItem) === this.getItemId(secondItem));
    }
}
