import seedColor from 'seed-color';

export class DataType {
    public readonly color: string = seedColor(this.name).toHex();
    
    constructor(
        public readonly name: string
    ) {}
}
