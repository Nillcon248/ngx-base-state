import { Injectable } from '@angular/core';
import { NgxState, ObjectState } from 'projects/library/src/lib';
import { SORT_OPERATION_ARRAY } from '../data';
import { Filters } from '../interfaces';

@NgxState()
@Injectable()
export class MetadataListFiltersState extends ObjectState<Filters> {
    constructor() {
        super({
            searchString: '',
            dataType: null,
            sortBy: SORT_OPERATION_ARRAY[0]
        });
    }
}
