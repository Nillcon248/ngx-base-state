import seedColor from 'seed-color';

export class DataType {
    public readonly color: string;

    constructor(
        public readonly name: string
    ) {
        this.color = this.generateColor();
    }

    private generateColor(): string {
        return seedColor(this.name)
            .toHex();
    }
}
