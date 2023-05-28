import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { NgxBaseStateDevtoolsConfig } from './classes';
import { ɵMetadataKeyEnum } from './enums';
import { ɵMetadataStorage } from './helpers';
import { ɵMetadataOperation } from './interfaces';
import { NGX_BASE_STATE_DEVTOOLS_CONFIG } from './tokens';

@NgModule({})
export class NgxBaseStateDevtoolsModule {
    constructor(
        @Inject(NGX_BASE_STATE_DEVTOOLS_CONFIG) private readonly config: NgxBaseStateDevtoolsConfig,
        private readonly metadataStorage: ɵMetadataStorage
    ) {
        if (this.config.isEnabled) {
            this.metadataStorage.set(ɵMetadataKeyEnum.DevtoolsEnabled, true);
            this.metadataStorage.set(
                ɵMetadataKeyEnum.MetadataOperation,
                new ReplaySubject<ɵMetadataOperation>()
            );
        }
    }

    public static forRoot(
        options: NgxBaseStateDevtoolsConfig
    ): ModuleWithProviders<NgxBaseStateDevtoolsModule> {
        return {
            ngModule: NgxBaseStateDevtoolsModule,
            providers: [
                {
                    provide: NGX_BASE_STATE_DEVTOOLS_CONFIG,
                    useValue: options
                }
            ]
        };
    }
}
