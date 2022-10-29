import { ɵNgxBaseStateConfigParams } from '../interfaces';

export class NgxBaseStateDevtoolsConfig implements ɵNgxBaseStateConfigParams {
    public readonly isEnabled: boolean = false;

    constructor(params: ɵNgxBaseStateConfigParams) {
        Object.assign(this, params);
    }
}
