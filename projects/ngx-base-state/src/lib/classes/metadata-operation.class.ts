import { ɵStackTrace } from '../helpers';
import { ɵMetadataOperationTypeEnum } from '../enums';

export class ɵMetadataOperation {
    public readonly date: string = new Date().toJSON();
    public readonly stackTrace = ɵStackTrace.capture();

    constructor(
        public readonly className: string,
        public readonly data: unknown,
        public readonly type: ɵMetadataOperationTypeEnum
    ) {}
}