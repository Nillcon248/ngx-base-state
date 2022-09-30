import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OPENED_CLASS_NAME_PROVIDER } from './consts';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    OPENED_CLASS_NAME_PROVIDER
  ]
})
export class DetailsComponent {}
