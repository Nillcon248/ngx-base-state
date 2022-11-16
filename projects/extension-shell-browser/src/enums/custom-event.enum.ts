/** CustomEvent from content-script to scrapper */
export const enum CustomRequestEventEnum {
    MetadataOperation = 'nbs-req-o-e',
    StopReceiveMetadataOperation = 'nbs-stop-req-o-e',
}

/** CustomEvent from scrapper to content-script */
export const enum CustomResponseEventEnum {
    MetadataOperation = 'nbs-res-o-e',
    IsDevtoolsEnabled = 'nbs-enabled'
}
