import { InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsParamEnum } from '../enums';

export const OPENED_CLASS_NAME = new InjectionToken('OPENED_CLASS_NAME');

export const OPENED_CLASS_NAME_PROVIDER: Provider = {
    provide: OPENED_CLASS_NAME,
    useFactory: (activatedRoute: ActivatedRoute) => {
        return activatedRoute.snapshot.params[DetailsParamEnum.ClassName];
    },
    deps: [ActivatedRoute]
};
