import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxState } from '../decorators';
import { ObjectState } from './object.state';

interface ItemMock {
	readonly id: number;
	readonly data: string;
	strangeField?: number;
}

const itemDataMock1: ItemMock = {
	id: 248,
	data: 'Some info'
};

const itemDataMock2: ItemMock = {
	id: 163264,
	data: 'Some info alala'
};

@NgxState()
@Injectable()
class ObjectStateMock extends ObjectState<ItemMock> {
	public setStrangeField(value: number): void {
		this.data!.strangeField = value;
	}
}

describe('ObjectState', () => {
	let objectState: ObjectStateMock;

	beforeEach(() => {
		const testBed = TestBed.configureTestingModule({
			providers: [ObjectStateMock]
		});

		objectState = testBed.inject(ObjectStateMock);
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

	it('should updateWithPartial', () => {
		objectState.set(itemDataMock1);

		objectState.updateWithPartial({ id: 333 });

		expect(objectState.data).toEqual({ ...itemDataMock1, id: 333 });
	});

	it('should throw error with specific message when object doesn\'t set', () => {
		try {
			objectState.setStrangeField(333);
        } catch (error) {
            const errorMessage = (error as TypeError).message;
            expect(errorMessage).toContain('Firstly set Object.');
        }
	});
});
