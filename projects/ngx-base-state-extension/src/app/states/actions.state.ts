import { Injectable } from '@angular/core';
import { ArrayState, NgxState, ɵMetadataOperation } from '@ngx-base-state';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class ActionsState extends ArrayState<ɵMetadataOperation> {
    private readonly maxActionAmount = 30;

    constructor() {
        super([]);
    }

    public register(action: ɵMetadataOperation): void {
        const lastActions = this.data!.slice(0, (this.maxActionAmount - 1));
        const newActions = [action, ...lastActions];

        this.set(newActions);
    }
}
