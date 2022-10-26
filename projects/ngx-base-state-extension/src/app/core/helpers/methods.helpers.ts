export function isObject(data: unknown): data is Object {
    return (
        (typeof data === 'object') &&
        !Array.isArray(data) &&
        (data !== null)
    );
}
