import { APP_INITIALIZER, Provider } from '@angular/core';
import { AppConfig } from './app.config';

export const APP_CONFIG_PROVIDER: Provider = {
    provide: APP_INITIALIZER,
    useFactory: (config: AppConfig) => () => config.load(),
    deps: [AppConfig],
    multi: true
};
