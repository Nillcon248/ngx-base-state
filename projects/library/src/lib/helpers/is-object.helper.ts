export function isObject(data: unknown): data is object {
    return (
        (typeof data === 'object') &&
        !Array.isArray(data) &&
        (data !== null)
    );
}
