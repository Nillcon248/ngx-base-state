import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaseState } from '../base-state';

interface ItemMock {
	readonly id: number;
	readonly data: string;
}

const itemDataMock1: ItemMock = {
	id: 248,
	data: 'Some info'
};

const itemDataMock2: ItemMock = {
	id: 163264,
	data: 'Some info alala'
};

@Injectable()
class BaseStateMock extends BaseState<ItemMock> {}

@Injectable()
class BaseStateInitDataMock extends BaseState<ItemMock> {
	constructor() {
		super(itemDataMock1);
	}
}

describe('Base state', () => {
	let testBed: TestBed;
	let baseState: BaseStateMock;

	beforeEach(() => {
		testBed = TestBed.configureTestingModule({
			providers: [BaseStateMock, BaseStateInitDataMock]
		});

		baseState = testBed.inject(BaseStateMock);
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
		const baseStateInitDataMock = testBed.inject(BaseStateInitDataMock);

		expect(baseStateInitDataMock.data).toEqual(itemDataMock1);
	});

	it('should access to config from window', () => {
		const baseStateInitDataMock = testBed.inject(BaseStateInitDataMock);

		expect(baseStateInitDataMock.data).toEqual(itemDataMock1);
	});
});
