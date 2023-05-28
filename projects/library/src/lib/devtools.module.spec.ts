import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { NgxState } from './decorators';
import { NgxBaseStateDevtoolsModule } from './devtools.module';
import { ɵMetadataKeyEnum } from './enums';
import { ɵMetadataStorage } from './helpers';
import { ɵNgxBaseStateConfigParams } from './interfaces';
import { BaseState } from './states';

@NgxState()
@Injectable()
class BaseStateMock extends BaseState<unknown> {}

describe('DevtoolsModule', () => {
    let testBed: TestBed;
    let metadataStorage: ɵMetadataStorage;

    function createTestBedWithDevtoolsModule(config: ɵNgxBaseStateConfigParams): TestBed {
        testBed = TestBed.configureTestingModule({
            imports: [
                NgxBaseStateDevtoolsModule.forRoot(config)
            ],
            providers: [
                BaseStateMock,
                {
                    provide: ɵMetadataStorage,
                    useFactory: () => {
                        const storage = <ɵMetadataStorage>{
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            get: (key: ɵMetadataKeyEnum) => null,
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        expect(metadataStorage.set).toHaveBeenCalledWith(
            ɵMetadataKeyEnum.MetadataOperation,
            new ReplaySubject()
        );
    });
});
