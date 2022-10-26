import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ArrayState } from '../array.state';
import { NgxState } from '../decorators';

interface ItemMock {
    readonly id: number;
    readonly data: string;
}

@NgxState()
@Injectable()
class ArrayStateMock extends ArrayState<ItemMock> {
    protected override getItemId(item: ItemMock): number {
        return item.id;
    }
}

const itemDataMock1: ItemMock = {
    id: 248,
    data: 'Some info',
};

const itemDataMock2: ItemMock = {
    id: 163264,
    data: 'Some info alala',
};

const itemArrayDataMock: ItemMock[] = [itemDataMock1, itemDataMock2];

describe('ArrayState', () => {
    let arrayState: ArrayStateMock;

    beforeEach(() => {
        const testBed = TestBed.configureTestingModule({
			providers: [ArrayStateMock]
		});

        arrayState = testBed.inject(ArrayStateMock);
    });

    it('should exist', () => {
        expect(arrayState).toBeTruthy();
    });

    it('should set data to state', () => {
        arrayState.set(itemArrayDataMock);

        expect(arrayState.data).toEqual(itemArrayDataMock);
    });

    it('should clear data in state', () => {
        arrayState.set(itemArrayDataMock);

        arrayState.clear();

        expect(arrayState.data).not.toBeTruthy();
    });

    it('should emit data to subscribers after data has set', () => {
        const spy = jasmine.createSpy();
        arrayState.data$.subscribe(spy);

        arrayState.set(itemArrayDataMock);

        expect(spy).toHaveBeenCalled();
    });

    it('should return item by quired index (deprecated getByIndex method)', () => {
        const index = 0;

        arrayState.set(itemArrayDataMock);

        expect(arrayState.getByIndex(index)).toEqual(arrayState.data![index]);
    });

    it('should return item by quired index', () => {
        const index = 0;

        arrayState.set(itemArrayDataMock);

        expect(arrayState.getItemByIndex(index)).toEqual(arrayState.data![index]);
    });

    it('should push item to array', () => {
        const newItem: ItemMock = {
            id: Math.random(),
            data: 'new data',
        };

        arrayState.set(itemArrayDataMock);

        arrayState.pushItem(newItem);

        expect(arrayState.data!.pop()).toEqual(newItem);
    });

    it('should remove item from array', () => {
        const newItem: ItemMock = {
            id: Math.random(),
            data: 'new data',
        };

        arrayState.set(itemArrayDataMock);
        arrayState.pushItem(newItem);

        arrayState.removeItem(newItem);

        expect(arrayState.data!.pop()).not.toEqual(newItem);
    });

    it('should remove item from array by index', () => {
        const newItem: ItemMock = {
            id: Math.random(),
            data: 'new data',
        };

        arrayState.set(itemArrayDataMock);
        arrayState.pushItem(newItem);
        const lastItemIndex = (arrayState.data!.length - 1);

        arrayState.removeItemByIndex(lastItemIndex);

        expect(arrayState.data!.pop()).not.toEqual(newItem);
    });

    it('should pop array', () => {
        arrayState.set(itemArrayDataMock);
        const lastItemBeforePop = arrayState.data![arrayState.data!.length - 1];
        arrayState.pop();
        const currentLastItem = arrayState.data![arrayState.data!.length - 1];

        expect(lastItemBeforePop).not.toEqual(currentLastItem);
    });

    it('should shift array', () => {
        arrayState.set(itemArrayDataMock);
        const firstItemBeforeShift = arrayState.data![0];
        arrayState.shift();
        const currentFirstItem = arrayState.data![0];

        expect(firstItemBeforeShift).not.toEqual(currentFirstItem);
    });

    it('should unshiftItem into array', () => {
        const newItem: ItemMock = {
            id: Math.random(),
            data: 'new data',
        };
        arrayState.set(itemArrayDataMock);
        arrayState.unshiftItem(newItem);

        expect(arrayState.data![0]).toEqual(newItem);
    });

    it('should insertItemByIndex into array', () => {
        const newItem: ItemMock = {
            id: Math.random(),
            data: 'new data',
        };
        arrayState.set(itemArrayDataMock);
        arrayState.insertItemByIndex(1, newItem);

        expect(arrayState.data![1]).toEqual(newItem);
    });

    it('should concatWith another array', () => {
        const newItem: ItemMock = {
            id: Math.random(),
            data: 'new data',
        };
        const anotherArray = [newItem];
        arrayState.set(itemArrayDataMock);
        arrayState.concatWith(anotherArray);
        const lastItem = arrayState.data![arrayState.data!.length - 1];

        expect(lastItem).toEqual(newItem);
    });

    it('should return removed item after remove', () => {
        const newItem: ItemMock = {
            id: Math.random(),
            data: 'new data',
        };

        arrayState.set(itemArrayDataMock);
        arrayState.pushItem(newItem);

        expect(arrayState.removeItem(newItem)).toEqual(newItem);
    });

    it('should update item in array by index', () => {
        const indexOfItem = 0;
        const itemToUpdate = { ...itemArrayDataMock[indexOfItem] };
        itemToUpdate.data = `${Math.random()} new data for updated item by index`;

        arrayState.set(itemArrayDataMock);

        arrayState.updateItemByIndex(itemToUpdate, indexOfItem);

        expect(arrayState.data![indexOfItem]).toEqual(itemToUpdate);
    });

    it('should update item in array by id', () => {
        const indexOfItem = 0;
        const itemToUpdate = { ...itemArrayDataMock[indexOfItem] };
        itemToUpdate.data = `${Math.random()} new data for updated item by id`;

        arrayState.set(itemArrayDataMock);

        arrayState.updateItem(itemToUpdate);

        expect(arrayState.data![indexOfItem]).toEqual(itemToUpdate);
    });
});
