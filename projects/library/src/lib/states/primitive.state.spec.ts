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

@NgxState()
@Injectable()
class PrimitiveNumberStateMock extends PrimitiveState<number> {
    constructor() {
        super(123);
    }
}

@NgxState()
@Injectable()
class PrimitiveStringStateMock extends PrimitiveState<string> {
    constructor() {
        super('Hello World!');
    }
}

@NgxState()
@Injectable()
class PrimitiveBooleanStateMock extends PrimitiveState<boolean> {
    constructor() {
        super(true);
    }
}

@NgxState()
@Injectable()
class PrimitiveBigintStateMock extends PrimitiveState<bigint> {
    constructor() {
        super(BigInt(456));
    }
}

@NgxState()
@Injectable()
class PrimitiveSymbolStateMock extends PrimitiveState<symbol> {
    constructor() {
        super(Symbol('symbol'));
    }
}

function expectErrorWhenPassIncorrectDataType(state: PrimitiveState<any>, error: Error): void {
    expect(error.message).toContain(
        `${state.constructor.name}: ` +
        `Expected data in Primitive format!`
    );
}

describe('PrimitiveState', () => {
    let primitiveState: PrimitiveStateMock;
    let testBed: TestBed;

    beforeEach(() => {
        testBed = TestBed.configureTestingModule({
            providers: [
                PrimitiveStateMock,
                PrimitiveNumberStateMock,
                PrimitiveStringStateMock,
                PrimitiveBooleanStateMock,
                PrimitiveBigintStateMock,
                PrimitiveSymbolStateMock
            ]
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

    it('should throw error when pass incorrect data type (object)', () => {
        try {
            primitiveState.set({} as any);
        } catch (error) {
            expectErrorWhenPassIncorrectDataType(primitiveState, (error as Error));
        }
    });

    it('should throw error when pass incorrect data type (array)', () => {
        try {
            primitiveState.set([] as any);
        } catch (error) {
            expectErrorWhenPassIncorrectDataType(primitiveState, (error as Error));
        }
    });

    it('should throw error when pass incorrect data type (undefined)', () => {
        try {
            primitiveState.set(undefined as any);
        } catch (error) {
            expectErrorWhenPassIncorrectDataType(primitiveState, (error as Error));
        }
    });

    it('should not throw error when pass null', () => {
        primitiveState.set(null as any);
        expect(primitiveState.data).toBe(null);
    });

    it('should not throw error when pass number', () => {
        const state = testBed.inject(PrimitiveNumberStateMock);

        expect(state.data).toBe(123);
        state.set(456);
        expect(state.data).toBe(456);
    });

    it('should not throw error when pass string', () => {
        const state = testBed.inject(PrimitiveStringStateMock);

        expect(state.data).toBe('Hello World!');
        state.set('my string');
        expect(state.data).toBe('my string');
    });

    it('should not throw error when pass boolean', () => {
        const state = testBed.inject(PrimitiveBooleanStateMock);

        expect(state.data).toBe(true);
        state.set(false);
        expect(state.data).toBe(false);
    });

    it('should not throw error when pass bigint', () => {
        const state = testBed.inject(PrimitiveBigintStateMock);

        expect(state.data).toEqual(BigInt(456));
        state.set(BigInt(789));
        expect(state.data).toEqual(BigInt(789));
    });

    it('should not throw error when pass symbol', () => {
        const state = testBed.inject(PrimitiveSymbolStateMock);
        const newValue = Symbol('q');

        expect(state.data?.description).toEqual('symbol');
        state.set(newValue);
        expect(state.data).toBe(newValue);
    });
});
