import { ɵMetadataOperationTypeEnum } from '../enums';

export interface ɵMetadataOperation {
    readonly date: string;
    readonly stackTrace: string[];
    readonly className: string;
    readonly classContext: string | undefined;
    readonly classId: number;
    readonly actionName: string;
    readonly data: unknown;
    readonly type: ɵMetadataOperationTypeEnum;
}
