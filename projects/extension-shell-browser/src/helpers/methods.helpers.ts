export function isObject(data: unknown): data is Object {
    return (
        (typeof data === 'object') &&
        !Array.isArray(data) &&
        (data !== null)
    );
}

export function isExtendedObject(data: object): boolean {
    return (data.constructor.name !== 'Object');
}
