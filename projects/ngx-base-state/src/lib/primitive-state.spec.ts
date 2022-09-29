import { PrimitiveState } from './primitive-state';

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

class PrimitiveStateMock extends PrimitiveState<ItemMock> {}

describe('Primitive state', () => {
	let primitiveState: PrimitiveStateMock;

	beforeEach(() => {
		primitiveState = new PrimitiveStateMock();
	});

	it('should exist', () => {
		expect(primitiveState).toBeTruthy();
	});

	it('should set data to state', () => {
		primitiveState.set(itemDataMock1);

		expect(primitiveState.data).toEqual(itemDataMock1);
	});

	it('should emit data to subscribers after data has set', () => {
		const spy = jasmine.createSpy();
		primitiveState.data$.subscribe(spy);

		primitiveState.set(itemDataMock2);

		expect(spy).toHaveBeenCalled();
	});

	it('should clear data in state', () => {
		primitiveState.set(itemDataMock1);

		primitiveState.clear();

		expect(primitiveState.data).not.toBeTruthy();
	});
});