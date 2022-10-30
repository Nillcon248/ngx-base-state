import { Injectable } from '@angular/core';
import { NgxState, PrimitiveState } from '@ngx-base-state';

@NgxState()
@Injectable()
export class ValuePreviewerExpansionState extends PrimitiveState<boolean> {
    constructor() {
        super(false);
    }

    public toggle(): void {
        this.set(!this.data);
    }
}
