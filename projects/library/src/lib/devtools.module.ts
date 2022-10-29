import { NgModule, Inject } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ɵMetadataOperation } from './interfaces';
import { ɵMetadataKeyEnum } from './enums';
import { ɵMetadataStorage } from './helpers';
import { NgxBaseStateDevtoolsConfig } from './classes';
import { NGX_BASE_STATE_DEVTOOLS_CONFIG } from './tokens';

@NgModule({})
export class NgxBaseStateDevtoolsModule {
    constructor(
        @Inject(NGX_BASE_STATE_DEVTOOLS_CONFIG) private readonly config: NgxBaseStateDevtoolsConfig,
        private readonly metadataStorage: ɵMetadataStorage
    ) {
        if (this.config.isEnabled) {
            this.metadataStorage.set(ɵMetadataKeyEnum.DevtoolsEnabled, true);
            this.metadataStorage.set(ɵMetadataKeyEnum.MetadataOperation, new ReplaySubject<ɵMetadataOperation>());
        }
    }
}
