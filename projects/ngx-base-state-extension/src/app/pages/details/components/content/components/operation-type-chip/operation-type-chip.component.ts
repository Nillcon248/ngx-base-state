import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OPERATION_TYPE_MAP } from '@extension-data';
import { OperationType } from '@extension-interfaces';
import { ɵMetadataOperation } from '@ngx-base-state/classes';

@Component({
    selector: 'app-operation-type-chip',
    templateUrl: './operation-type-chip.component.html',
    styleUrls: ['./operation-type-chip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperationTypeChipComponent {
    @Input()
    public operation!: ɵMetadataOperation;

    public get operationType(): OperationType {
        return OPERATION_TYPE_MAP
            .get(this.operation.type) as OperationType;
    }
}
