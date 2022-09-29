import { ObjectState } from './object-state';

interface ItemMock {
	id: number;
	data: string;
}

const itemDataMock1: ItemMock = {
	id: 248,
	data: 'Some info'
};

const itemDataMock2: ItemMock = {
	id: 163264,
	data: 'Some info alala'
};

class ObjectStateMock extends ObjectState<ItemMock> {}

describe('Object state', () => {
	let objectState: ObjectStateMock;

	beforeEach(() => {
		objectState = new ObjectStateMock();
	});

	it('should exist', () => {
		expect(objectState).toBeTruthy();
	});

	it('should set data to state', () => {
		objectState.set(itemDataMock1);

		expect(objectState.data).toEqual(itemDataMock1);
	});

	it('should emit data to subscribers after data has set', () => {
		const spy = jasmine.createSpy();
		objectState.data$.subscribe(spy);

		objectState.set(itemDataMock2);

		expect(spy).toHaveBeenCalled();
	});

	it('should clear data in state', () => {
		objectState.set(itemDataMock1);

		objectState.clear();

		expect(objectState.data).not.toBeTruthy();
	});
});