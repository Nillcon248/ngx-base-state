import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { BaseState } from '../base.state';
import { NgxBaseStateDevtoolsConfig } from '../classes';
import { NgxState } from '../decorators';
import { NgxBaseStateDevtoolsModule } from '../devtools.module';
import { ɵMetadataKeyEnum } from '../enums';
import { ɵMetadataStorage } from '../helpers';
import { ɵNgxBaseStateConfigParams } from '../interfaces';
import { NGX_BASE_STATE_DEVTOOLS_CONFIG } from '../tokens';

@NgxState()
@Injectable()
class BaseStateMock extends BaseState<unknown> {}

describe('DevtoolsModule', () => {
    let testBed: TestBed;
    let metadataStorage: ɵMetadataStorage;

    function createTestBedWithDevtoolsModule(config: ɵNgxBaseStateConfigParams): TestBed {
        testBed = TestBed.configureTestingModule({
            imports: [
                NgxBaseStateDevtoolsModule
            ],
            providers: [
                BaseStateMock,
                {
                    provide: NGX_BASE_STATE_DEVTOOLS_CONFIG,
                    useValue: new NgxBaseStateDevtoolsConfig(config)
                },
                {
                    provide: ɵMetadataStorage,
                    useFactory: () => {
                        const storage = <ɵMetadataStorage>{
                            get: (key: ɵMetadataKeyEnum) => null,
                            set: (key: ɵMetadataKeyEnum, value: unknown) => undefined
                        };

                        spyOn(storage, 'get');
                        spyOn(storage, 'set');

                        return storage;
                    }
                }
            ]
        });

        metadataStorage = testBed.inject(ɵMetadataStorage);

        return testBed;
    }

	it('should not modify window when isEnabled=false passed into config', () => {
        createTestBedWithDevtoolsModule({ isEnabled: false });

		expect(metadataStorage.set).toHaveBeenCalledTimes(0);
	});

    it('should modify window when isEnabled=true passed into config', () => {
        createTestBedWithDevtoolsModule({ isEnabled: true });

		expect(metadataStorage.set).toHaveBeenCalledWith(ɵMetadataKeyEnum.DevtoolsEnabled, true);
		expect(metadataStorage.set).toHaveBeenCalledWith(ɵMetadataKeyEnum.MetadataOperation, new ReplaySubject());
	});
});
