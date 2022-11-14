export function adaptDataToType(data: unknown): string {
    if (data === undefined) {
        return 'undefined';
    } else if (data === null) {
        return 'null';
    }

    return data.constructor.name;
}
