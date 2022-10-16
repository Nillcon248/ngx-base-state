import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { interval, take, takeUntil, Subject } from 'rxjs';
import { UfoState, UserState } from './states';

@Component({
    selector: 'app-ufo-table',
    templateUrl: './ufo-table.component.html',
    styleUrls: ['./ufo-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        UfoState,
        UserState
    ]
})
export class UfoTableComponent implements OnDestroy {
    private readonly viewDestroyed$ = new Subject<void>();

    constructor(
        public readonly ufoState: UfoState,
        public readonly userState: UserState
    ) {
        interval(500)
            .pipe(
                take(3),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(() => this.ufoState.set({ name: Math.random() }));
    }

    public ngOnDestroy(): void {
        this.viewDestroyed$.next();
        this.viewDestroyed$.complete();
    }
}
