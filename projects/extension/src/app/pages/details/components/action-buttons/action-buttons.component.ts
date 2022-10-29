import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MetadataOperation } from 'projects/extension/src/app/interfaces';

@Component({
    selector: 'app-action-buttons',
    templateUrl: './action-buttons.component.html',
    styleUrls: ['./action-buttons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonsComponent {
    @Input()
    public operation!: MetadataOperation;
}
