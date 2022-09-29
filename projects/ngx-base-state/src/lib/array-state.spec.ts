import { ArrayState } from './array-state';

interface ItemMock {
  id: number;
  data: string;
}

class ArrayStateMock extends ArrayState<ItemMock> {
  protected getItemId(item: ItemMock): number {
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
    arrayState = new ArrayStateMock();
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

  it('should return item by quired index', () => {
    const index = 0;

    arrayState.set(itemArrayDataMock);

    expect(arrayState.getByIndex(index)).toEqual(arrayState.data![index]);
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
