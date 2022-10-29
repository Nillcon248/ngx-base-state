import { CustomEventEnum } from '../enums/custom-event.enum';

export function emitCustomEvent<T>(eventName: CustomEventEnum, detail: T | null = null): void {
    const event = new CustomEvent(eventName, { detail });

    document.dispatchEvent(event);
}
