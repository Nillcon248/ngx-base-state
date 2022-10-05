import { Injectable } from '@angular/core';
import { BaseState, ObjectState } from '@ngx-base-state';
import { NgxBaseStateDevtoolsMetadata as Metadata } from '@ngx-base-state/interfaces';

@Injectable({
    providedIn: 'root'
})
export class MetadataState extends ObjectState<Metadata> {}
