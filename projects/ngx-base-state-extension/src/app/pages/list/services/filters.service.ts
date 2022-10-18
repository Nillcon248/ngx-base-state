import { Injectable } from '@angular/core';
import { Filters } from '../interfaces';
import { MetadataListFiltersState } from '../states';

@Injectable()
export class MetadataListFiltersService {
    public readonly data$ = this.state.data$;

    constructor(
        private readonly state: MetadataListFiltersState
    ) {}

    public update(filters: Partial<Filters>): void {
        this.state.updateWithPartial(filters);
    }
}
