import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxState } from '../decorators';
import { MapState } from './map.state';

interface ItemMock {
    readonly id: number;
    readonly data: string;
}

@NgxState()
@Injectable()
class MapStateMock extends MapState<number, ItemMock> {}

const itemDataMock1: ItemMock = {
    id: 1,
    data: 'Some info',
};

const itemDataMock2: ItemMock = {
    id: 2,
    data: 'Some info alala',
};

describe('MapState', () => {
    let mapState: MapStateMock;

    beforeEach(() => {
        const testBed = TestBed.configureTestingModule({
			providers: [MapStateMock]
		});

        mapState = testBed.inject(MapStateMock);
    });

    it('should exist', () => {
        expect(mapState).toBeTruthy();
    });

    it('should set data to state', () => {
        mapState.set(new Map());

        expect(mapState.data).toEqual(new Map());
    });

    it('should clear data in state', () => {
        mapState.set(new Map());

        mapState.clear();

        expect(mapState.data).not.toBeTruthy();
    });

    it('should emit data to subscribers after data has set', () => {
        const spyData = jasmine.createSpy();
        const spyDataAsArray = jasmine.createSpy();
        mapState.data$.subscribe(spyData);
        mapState.dataAsArray$.subscribe(spyDataAsArray);

        mapState.set(new Map([[1, itemDataMock1]]));

        expect(spyData).toHaveBeenCalled();
        expect(spyDataAsArray).toHaveBeenCalled();
    });

    it('should contain data as array in dataAsArray & dataAsArray$ fields', () => {
        mapState.set(new Map([
            [1, itemDataMock1],
            [2, itemDataMock2]
        ]));

        expect(mapState.dataAsArray).toEqual([itemDataMock1, itemDataMock2]);
        mapState.dataAsArray$
            .subscribe((dataAsArray) => expect(dataAsArray).toEqual([itemDataMock1, itemDataMock2]));
    });

    it('should setItem', () => {
        mapState.set(new Map());

        mapState.setItem(1, itemDataMock1);

        expect(mapState.data).toEqual(new Map([
            [1, itemDataMock1]
        ]));
    });

    it('should removeItem', () => {
        mapState.set(new Map([
            [1, itemDataMock1],
            [2, itemDataMock2]
        ]));

        mapState.deleteItem(2);

        expect(mapState.data).toEqual(new Map([
            [1, itemDataMock1]
        ]));
    });

    it('should clearItems', () => {
        mapState.set(new Map([
            [1, itemDataMock1],
            [2, itemDataMock2]
        ]));

        mapState.clearItems();

        expect(mapState.data).toEqual(new Map());
    });

    it('should throw error with specific message when map doesn\'t set', () => {
        try {
            mapState.setItem(1, itemDataMock1);
        } catch (error) {
            const errorMessage = (error as TypeError).message;
            expect(errorMessage).toContain('Firstly set Map.');
        }
    });
});
