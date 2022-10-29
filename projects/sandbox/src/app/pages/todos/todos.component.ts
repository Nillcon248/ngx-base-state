import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription } from 'rxjs';
import { TodoCreationWindowComponent } from './components';
import { TodosService } from './services';
import { TodosState } from './states';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TodosService,
        TodosState
    ]
})
export class TodosComponent {
    constructor(
        private readonly injector: Injector,
        private readonly dialogService: MatDialog,
    ) {}

    @AutoUnsubscribe()
    public onTodoCreateButtonClick(): Subscription {
        return this.dialogService.open(TodoCreationWindowComponent, {
            injector: this.injector
        })
            .afterClosed()
            .subscribe();
    }
}
