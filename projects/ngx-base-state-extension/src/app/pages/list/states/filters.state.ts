import { Injectable } from '@angular/core';
import { ObjectState } from '@ngx-base-state';
import { Filters } from '../interfaces';

@Injectable()
export class MetadataListFiltersState extends ObjectState<Filters> {
    constructor() {
        super({
            searchString: '',
            operationType: null
        });
    }
}
