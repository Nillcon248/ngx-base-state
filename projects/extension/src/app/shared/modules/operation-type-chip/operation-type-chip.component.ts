import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { OPERATION_TYPE_MAP } from '@extension-data';
import { OperationType } from '@extension-interfaces';
import { ɵMetadataOperationTypeEnum } from '@ngx-base-state';

@Component({
    selector: 'app-operation-type-chip',
    templateUrl: './operation-type-chip.component.html',
    styleUrls: ['./operation-type-chip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperationTypeChipComponent {
    @Input()
    public operationTypeId!: ɵMetadataOperationTypeEnum;

    @HostBinding('style.backgroundColor')
    public get hostBackgroundColorStyle(): string {
        return this.operationType.color;
    }

    public get operationType(): OperationType {
        return OPERATION_TYPE_MAP
            .get(this.operationTypeId) as OperationType;
    }
}
