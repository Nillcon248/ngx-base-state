import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxState } from '../decorators';
import { RecordState } from './record.state';

interface User {
	age: number;
    name: string;
}

const userMock1: User = {
    name: 'User 1',
    age: 20
};

const userMock2: User = {
    name: 'User 2',
    age: 30
};

@NgxState()
@Injectable()
class UserMockState extends RecordState<string, User> {}

describe('RecordState', () => {
	let recordState: UserMockState;

	beforeEach(() => {
		const testBed = TestBed.configureTestingModule({
			providers: [UserMockState]
		});

		recordState = testBed.inject(UserMockState);
	});

	it('should exist', () => {
		expect(recordState).toBeTruthy();
	});

	it('should setItem', () => {
		recordState.set({});

        recordState.setItem('1', userMock1);
        recordState.setItem('2', userMock2);

		expect(recordState.data!['1']).toEqual(userMock1);
		expect(recordState.data!['2']).toEqual(userMock2);
	});

	it('should removeItem', () => {
		recordState.set({});

        recordState.setItem('1', userMock1);
        recordState.removeItem('1');

		expect(recordState.data!['1']).toBeFalsy();
		expect(recordState.data).toEqual({});
	});

    it('should removeAllItems', () => {
		recordState.set({});

        recordState.setItem('1', userMock1);
        recordState.setItem('2', userMock2);
        recordState.removeAllItems();

		expect(recordState.data).toEqual({});
	});

    it('should emit contain keys & emit keys$', () => {
        expect(recordState.keys).toEqual([]);

		recordState.set({
            '1': userMock1,
            '2': userMock2
        });

        const expectedKeys = ['1', '2'];

        expect(recordState.keys).toEqual(expectedKeys);
		recordState.keys$.subscribe((keys) => expect(keys).toEqual(expectedKeys));
	});

    it('should emit contain values & emit values$', () => {
        expect(recordState.values).toEqual([]);

		recordState.set({
            '1': userMock1,
            '2': userMock2
        });

        const expectedValues = [userMock1, userMock2];

        expect(recordState.values).toEqual(expectedValues);
		recordState.values$.subscribe((values) => expect(values).toEqual(expectedValues));
	});

    it('should throw error with specific message when object doesn\'t set', () => {
		try {
			recordState.setItem('1', userMock1);
        } catch (error) {
            const errorMessage = (error as TypeError).message;
            expect(errorMessage).toContain('Firstly set Object [Record].');
        }
	});
});
