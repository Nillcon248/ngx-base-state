import { Injectable } from '@angular/core';
import { MetadataOperation } from 'projects/extension/src/app/interfaces';
import { ArrayState, NgxState } from 'projects/library/src/lib';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class ActionsState extends ArrayState<MetadataOperation> {
    private readonly maxActionAmount = 30;

    constructor() {
        super([]);
    }

    public register(action: MetadataOperation): void {
        const lastActions = this.data!.slice(0, (this.maxActionAmount - 1));
        const newActions = [action, ...lastActions];

        this.set(newActions);
    }
}
