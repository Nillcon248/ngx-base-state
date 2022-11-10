export abstract class BaseSimplifier {
    public abstract isCompatible(data: unknown): boolean;
    public abstract process(data: unknown): unknown;
}
