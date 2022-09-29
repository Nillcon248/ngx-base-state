import { TestBed } from '@angular/core/testing';
import { BaseState } from './base-state';


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

class BaseStateMock extends BaseState<ItemMock> {}

class BaseStateInitDataMock extends BaseState<ItemMock> {
	constructor() {
		super(itemDataMock1);
	}
}

describe('Base state', () => {
	let baseState: BaseStateMock;

	beforeEach(() => {
		baseState = new BaseStateMock();
	});

	it('should exist', () => {
		expect(baseState).toBeTruthy();
	});

	it('should set data to state', () => {
		baseState.set(itemDataMock1);

		expect(baseState.data).toEqual(itemDataMock1);
	});

	it('should emit data to subscribers after data has set', () => {
		const spy = jasmine.createSpy();
		baseState.data$.subscribe(spy);

		baseState.set(itemDataMock2);

		expect(spy).toHaveBeenCalled();
	});

	it('should clear data in state', () => {
		baseState.set(itemDataMock1);

		baseState.clear();

		expect(baseState.data).not.toBeTruthy();
	});

	it('should use initData for first value in state', () => {
		const baseStateInitDataMock = new BaseStateInitDataMock();

		expect(baseStateInitDataMock.data).toEqual(itemDataMock1);
	});

	it('should access to config from window', () => {
		const baseStateInitDataMock = new BaseStateInitDataMock();

		expect(baseStateInitDataMock.data).toEqual(itemDataMock1);
	});
});
