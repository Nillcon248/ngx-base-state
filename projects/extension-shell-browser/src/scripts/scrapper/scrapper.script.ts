import { CustomRequestEventEnum } from '@shell-browser/enums';
import { fromEvent } from 'rxjs';
import { DevtoolsAvailabilityService, MetadataOperationsService } from './services';

const metadataOperationsService = new MetadataOperationsService();
const devtoolsAvailabilityService = new DevtoolsAvailabilityService();

devtoolsAvailabilityService.emitEnabledStatusAsCustomEvent();

fromEvent(document, CustomRequestEventEnum.MetadataOperation)
    .subscribe(() => metadataOperationsService.initMetadataOperationEmitter());
