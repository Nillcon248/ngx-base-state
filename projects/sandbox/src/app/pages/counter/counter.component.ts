import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CounterState } from './states';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        CounterState
    ]
})
export class CounterComponent {
    public readonly counterValue$ = this.counterState.data$;

    constructor(
        private readonly counterState: CounterState
    ) {
        this.counterState.get();
    }

    public onIncrementButtonClick(): void {
        this.counterState.increment();
    }

    public onDecrementButtonClick(): void {
        this.counterState.decrement();
    }

    public onInputValueChange(event: Event): void {
        const inputElement = (event.target as HTMLInputElement);
        const value = +inputElement.value;

        this.counterState.set(value);
    }

    public onResetButtonClick(): void {
        this.counterState.restoreInitialData();
    }
}
