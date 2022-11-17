import { MetadataKeyEnum } from '../enums';

export abstract class MetadataStorage {
    private static get window(): any {
        return window;
    }

    public static get<R = unknown>(key: MetadataKeyEnum): R {
        return this.window[key];
    }
}
