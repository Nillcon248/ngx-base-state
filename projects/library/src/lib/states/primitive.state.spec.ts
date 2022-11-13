import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxState } from '../decorators';
import { PrimitiveState } from './primitive.state';

enum MockEnum {
    Value1 = 1,
    Value2
}

@NgxState()
@Injectable()
class PrimitiveStateMock extends PrimitiveState<MockEnum> {}

describe('PrimitiveState', () => {
    let primitiveState: PrimitiveStateMock;

    beforeEach(() => {
        const testBed = TestBed.configureTestingModule({
            providers: [PrimitiveStateMock]
        });

        primitiveState = testBed.inject(PrimitiveStateMock);
    });

    it('should exist', () => {
        expect(primitiveState).toBeTruthy();
    });

    it('should set data to state', () => {
        primitiveState.set(MockEnum.Value1);

        expect(primitiveState.data).toEqual(MockEnum.Value1);
    });

    it('should emit data to subscribers after data has set', () => {
        const spy = jasmine.createSpy();
        primitiveState.data$.subscribe(spy);

        primitiveState.set(MockEnum.Value2);

        expect(spy).toHaveBeenCalled();
    });

    it('should clear data in state', () => {
        primitiveState.set(MockEnum.Value2);

        primitiveState.clear();

        expect(primitiveState.data).not.toBeTruthy();
    });
});
