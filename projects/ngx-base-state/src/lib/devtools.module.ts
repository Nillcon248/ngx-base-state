import { NgModule, ModuleWithProviders } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MetadataKeyEnum } from './enums';
import { MetadataStorage } from './helpers';
import { NgxBaseStateDevtoolsConfig, NgxBaseStateDevtoolsMetadata } from './interfaces';

@NgModule({})
export class NgxBaseStateDevtoolsModule {
    public static setConfig(config: NgxBaseStateDevtoolsConfig): ModuleWithProviders<NgxBaseStateDevtoolsModule> {
		const initialMetadata = new BehaviorSubject<NgxBaseStateDevtoolsMetadata>({});

        MetadataStorage.set(MetadataKeyEnum.Config, config);
		MetadataStorage.set(MetadataKeyEnum.Data, initialMetadata);

        return {
            ngModule: NgxBaseStateDevtoolsModule
        };
    }
}
