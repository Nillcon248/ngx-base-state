import {
    ApplicationInitStatusService,
    DevToolsAvailabilityService,
    MetadataOperationsService,
    ScrapperScriptService
} from './services';

const applicationInitStatusService = new ApplicationInitStatusService();
const devtoolsAvailabilityService = new DevToolsAvailabilityService();
const metadataOperationsService = new MetadataOperationsService();
const scrapperScriptService = new ScrapperScriptService();

applicationInitStatusService.initObserver();
devtoolsAvailabilityService.initIsDevtoolsEnabledObserver();
devtoolsAvailabilityService.initIsLibraryAvailableMessageObserver();
metadataOperationsService.initObserver();

window.addEventListener('load', () => scrapperScriptService.injectToDocument());
