import { MetadataKeyEnum } from '../enums';

export abstract class MetadataStorage {
    private static get window(): any {
        return window;
    }

    public static get<T, R = unknown>(key: MetadataKeyEnum): R {
        return this.window[key];
    }

    public static set<T>(key: MetadataKeyEnum, data: T): void {
        this.window[key] = data;
    }
}
