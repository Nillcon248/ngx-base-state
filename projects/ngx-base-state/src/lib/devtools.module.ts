import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MetadataKeyEnum } from './enums';
import { MetadataStorage } from './helpers';
import { ɵMetadataOperation as MetadataOperation } from './classes';
import { NgxBaseStateDevtoolsConfig } from './interfaces';

@NgModule({})
export class NgxBaseStateDevtoolsModule {
    public static setConfig(config: NgxBaseStateDevtoolsConfig): ModuleWithProviders<NgxBaseStateDevtoolsModule> {
		const initialMetadataOperationSubject = new ReplaySubject<MetadataOperation>();

        MetadataStorage.set(MetadataKeyEnum.Config, config);
		MetadataStorage.set(MetadataKeyEnum.MetadataOperation, initialMetadataOperationSubject);

        return {
            ngModule: NgxBaseStateDevtoolsModule
        };
    }
}
