let metadataInput;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === '__ngx-base-state-metadata') {
        const metadata = metadataInput.value;
        console.log('from content-script', metadata);

        sendResponse(metadata);
    }
});

function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
    s.addEventListener('load', () => {
        metadataInput = document.getElementById('ngxBaseStateMetadataInput');
        console.log(metadataInput);
    });
}
injectScript(chrome.extension.getURL('test.js'), 'body');
