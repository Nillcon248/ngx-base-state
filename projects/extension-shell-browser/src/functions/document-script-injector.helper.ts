export function injectScriptToDocument(scriptPath: string): HTMLScriptElement {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = scriptPath;

    document.body.appendChild(scriptElement);

    return scriptElement;
}
