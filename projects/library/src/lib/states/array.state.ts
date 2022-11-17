import { ɵAction as Action } from '../decorators';
import { BaseState } from './base.state';

/**
 *	@class
 *	@abstract
 *	@classdes Array state class. Implementing base array functionality.
 */
export abstract class ArrayState<T> extends BaseState<T[]> {
    /**
     * 	Return item by quired index.
     *	@public
     *	@param {Number} index - Quired index
     *  @deprecated use `this.data[index]` instead
     *	@return {Generic} quired item.
     */
    public getByIndex(index: number): T | undefined {
        const items = this.data;

        return items![index];
    }

    /**
     * 	Unshift item to array in state.
     *	@public
     *	@param {Generic} item - Item needs to unshift.
     */
    @Action
    public unshiftItem(item: T): void {
        const items = this.data;

        items!.unshift(item);

        this.setNewValue(items);
    }

    /**
     * 	Shift array in state.
     *	@public
     */
    @Action
    public shift(): void {
        const items = this.data;

        items!.shift();

        this.setNewValue(items);
    }

    /**
     * 	Pop array in state.
     *	@public
     */
    @Action
    public pop(): void {
        const items = this.data;

        items!.pop();

        this.setNewValue(items);
    }

    /**
     * 	Concat current state with another array.
     *	@param {T[]} array - Another array to concat with the current state.
     *	@public
     */
    @Action
    public concatWith(array: T[]): void {
        const items = this.data;
        const newItems = items!.concat(array);

        this.setNewValue(newItems);
    }

    /**
     * 	Push item to array in state.
     *	@public
     *	@param {Generic} item - Item needs to push
     */
    @Action
    public pushItem(item: T): void {
        const items = this.data;

        items!.push(item);

        this.setNewValue(items);
    }

    /**
     * 	Insert item in array by index.
     *	@public
     *	@param {number} index - Index where to insert new item.
     *	@param {Generic} item - Item need to insert.
     */
    @Action
    public insertItemByIndex(index: number, item: T): void {
        const items = this.data;

        items!.splice(index, 0, item);
        this.setNewValue(items);
    }

    /**
     * 	Remove item in array by item identify param (using `compareItems` method).
     *	@public
     *	@param {Generic} itemId - Id of item you want to remove.
     */
    @Action
    public removeItem(item: T): T | undefined {
        const index = this.data!.findIndex((_item) =>
            this.compareItems(item, _item)
        );

        return this.removeItemByIndex(index);
    }

    /**
     * 	Remove item in array by item id (using `getItemId` method).
     *	@public
     *	@param {Generic} itemId - Id of item you want to remove.
     */
    @Action
    public removeItemById(itemId: unknown): T | undefined {
        const index = this.data!.findIndex(
            (_item) => itemId === this.getItemId(_item)
        );

        return this.removeItemByIndex(index);
    }

    /**
     * 	Remove item in array by index.
     *	@public
     *	@param {number} index - Index of item you want to remove.
     */
    @Action
    public removeItemByIndex(index: number): T | undefined {
        const items = this.data;
        const removedItem = this.data![index];

        items!.splice(index, 1);

        this.setNewValue(items);

        return removedItem;
    }

    /**
     * 	Update item in array by item identify param (using `compareItems` method).
     *	@public
    *	@param {Generic} itemToUpdate - item that will be update.
    */
    @Action
    public updateItem(itemToUpdate: T): void {
        const items = this.data;
        const newItemToUpdate = { ...itemToUpdate };

        const itemIndex = items!.findIndex((_currentItem) =>
            this.compareItems(_currentItem, newItemToUpdate)
        );

        items![itemIndex] = newItemToUpdate;

        this.setNewValue(items);
    }

    /**
     * 	Update item in array by index.
     *	@public
     *	@param {Generic} itemToUpdate - item that will be update.
     *	@param {Generic} index - index of item that need to update.
     */
    @Action
    public updateItemByIndex(itemToUpdate: T, index: number): void {
        const items = this.data;

        items![index] = itemToUpdate;

        this.setNewValue(items);
    }

    protected override setNewValue(value: T[] | null): void {
        if (value) {
            this.validateDataType(value);
            super.setNewValue([...value]);
        } else {
            super.setNewValue(null);
        }
    }

    protected override catchError(error: Error | TypeError, actionName: string): void {
        if (error instanceof TypeError) {
            throw new Error(
                `\n${this.constructor.name} [${actionName}]: ` +
                `Firstly set Array.\n\n${error.message}`
            );
        }

        super.catchError(error, actionName);
    }

    /**
     *	Must return identify param of item.
     *	Method must be filled in child classes.
     *	Used for compare two any items.
     *  @protected
     *	@param {Generic} item - item of your state.
     *	@return {any} identify param of item.
     */
    protected getItemId(item: T): any {
        return item;
    }

    protected override validateDataType(data: unknown): void {
        if (!Array.isArray(data)) {
            throw new Error(`${this.constructor.name}: Expected data in Array format!`);
        }
    }

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
