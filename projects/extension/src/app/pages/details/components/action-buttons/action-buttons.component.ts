import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MetadataOperation } from '@extension-interfaces';

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
