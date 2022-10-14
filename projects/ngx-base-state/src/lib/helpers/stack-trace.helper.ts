export abstract class StackTrace {
    public static capture(): string[] {
        const amoutOfInternalMethodCall = 4;
        const stackTrace = new Error().stack!
        const rawMethods = stackTrace.split('at ');
        const methods = rawMethods
            .map((rawMethod) => rawMethod.slice(0, rawMethod.indexOf(' (')))
            .filter((method) => !method.startsWith('http'))
            .slice(amoutOfInternalMethodCall);

        return methods;
    }
}
