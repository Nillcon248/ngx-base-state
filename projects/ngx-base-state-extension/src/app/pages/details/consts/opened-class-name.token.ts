import { InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsParamEnum } from '../enums';

export const OPENED_CLASS_ID = new InjectionToken('OPENED_CLASS_ID');

export const OPENED_CLASS_NAME_PROVIDER: Provider = {
    provide: OPENED_CLASS_ID,
    useFactory: (activatedRoute: ActivatedRoute) => {
        return +activatedRoute.snapshot.params[DetailsParamEnum.ClassId];
    },
    deps: [ActivatedRoute]
};
