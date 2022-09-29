import { NgModule, ModuleWithProviders } from '@angular/core';
import { MetadataKeyEnum } from './enums';
import { MetadataStorage } from './helpers';
import { NgxBaseStateDevtoolsConfig } from './interfaces';

@NgModule({})
export class NgxBaseStateDevtoolsModule {
    public static setConfig(config: NgxBaseStateDevtoolsConfig): ModuleWithProviders<NgxBaseStateDevtoolsModule> {
		MetadataStorage.set(MetadataKeyEnum.Config, config);
		MetadataStorage.set(MetadataKeyEnum.Data, {});

        return {
            ngModule: NgxBaseStateDevtoolsModule
        };
    }
}
