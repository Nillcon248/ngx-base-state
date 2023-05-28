import {
    ApplicationInitStatusService,
    DevToolsAvailabilityService,
    MetadataOperationsService,
    ScrapperScriptService
} from './services';

window.addEventListener('load', () => {
    const applicationInitStatusService = new ApplicationInitStatusService();
    const devtoolsAvailabilityService = new DevToolsAvailabilityService();
    const metadataOperationsService = new MetadataOperationsService();
    const scrapperScriptService = new ScrapperScriptService();

    applicationInitStatusService.initObserver();
    devtoolsAvailabilityService.initIsDevtoolsEnabledObserver();
    devtoolsAvailabilityService.initIsLibraryAvailableMessageObserver();
    metadataOperationsService.initObserver();
    scrapperScriptService.injectToDocument();
});
