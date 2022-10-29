import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxBaseStateDevtoolsConfig } from '../classes';
import { NgxState } from '../decorators';
import { NgxBaseStateDevtoolsModule } from '../devtools.module';
import { NGX_BASE_STATE_DEVTOOLS_CONFIG } from '../tokens';
import { BaseState } from './base.state';

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

@NgxState()
@Injectable()
class BaseStateMock extends BaseState<ItemMock> {
    public throwErrorMockedAction(): void {
        throw new Error('Something went wrong...');
    }
}

@NgxState()
@Injectable()
class BaseStateInitDataMock extends BaseState<ItemMock> {
    constructor() {
        super(itemDataMock1);
    }
}

@Injectable()
class BaseStateWithoutDecoratorMock extends BaseState<ItemMock> {}

describe('BaseState', () => {
    let testBed: TestBed;
    let baseState: BaseStateMock;

    beforeEach(() => {
        testBed = TestBed.configureTestingModule({
            imports: [NgxBaseStateDevtoolsModule],
            providers: [
                BaseStateMock,
                BaseStateInitDataMock,
                BaseStateWithoutDecoratorMock,
                {
                    provide: NGX_BASE_STATE_DEVTOOLS_CONFIG,
                    useValue: new NgxBaseStateDevtoolsConfig({
                        isEnabled: true
                    })
                }
            ]
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

    it('should restoreInitialData', () => {
        const state = testBed.inject(BaseStateInitDataMock);

        state.clear();
        state.restoreInitialData();
        expect(state.data).toEqual(itemDataMock1);
    });

    it('should use initData for first value in state', () => {
        const baseStateInitDataMock = testBed.inject(BaseStateInitDataMock);

        expect(baseStateInitDataMock.data).toEqual(itemDataMock1);
    });

    it('should access to config from window', () => {
        const baseStateInitDataMock = testBed.inject(BaseStateInitDataMock);

        expect(baseStateInitDataMock.data).toEqual(itemDataMock1);
    });

    it('should throw error with specific message when object doesn\'t set', () => {
        try {
            baseState.throwErrorMockedAction();
        } catch (error) {
            const errorMessage = (error as Error).message;
            const actionName = 'throwErrorMockedAction';
            const constructorName = baseState.constructor.name;

            expect(errorMessage).toContain(`\n${constructorName} [${actionName}]: `);
        }
    });

    it('should throw error with specific message when object doesn\'t set', () => {
        try {
            baseState.throwErrorMockedAction();
        } catch (error) {
            const errorMessage = (error as Error).message;
            const actionName = 'throwErrorMockedAction';
            const constructorName = baseState.constructor.name;

            expect(errorMessage).toContain(`\n${constructorName} [${actionName}]: `);
        }
    });

    it(`should show console.warn when state doesn't covered by
        @NgxState decorator and DevToolsConfig.isEnabled=true`, () => {
        spyOn(console, 'warn');

        const state = testBed.inject(BaseStateWithoutDecoratorMock);
        const stateName = state.constructor.name;

        expect(console.warn).toHaveBeenCalledOnceWith(
            `${stateName} class is missed @NgxState() decorator.` +
            `Some features of DevTools will work incorrectly!`
        );
    });
});
