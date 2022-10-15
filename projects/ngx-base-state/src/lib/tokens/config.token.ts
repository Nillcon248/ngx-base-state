import { InjectionToken } from '@angular/core';
import { NgxBaseStateDevtoolsConfig } from '../classes';

export const NGX_BASE_STATE_DEVTOOLS_CONFIG = new InjectionToken('NGX_BASE_STATE_DEVTOOLS_CONFIG', {
    providedIn: 'root',
    factory: () => (new NgxBaseStateDevtoolsConfig({
        isEnabled: false
    }))
});
