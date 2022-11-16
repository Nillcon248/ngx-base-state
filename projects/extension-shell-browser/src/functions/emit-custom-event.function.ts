import { CustomRequestEventEnum, CustomResponseEventEnum } from '../enums';

type EventType = CustomRequestEventEnum | CustomResponseEventEnum;

export function emitCustomEvent<T>(eventName: EventType, detail: T | null = null): void {
    const event = new CustomEvent(eventName, { detail });

    document.dispatchEvent(event);
}
