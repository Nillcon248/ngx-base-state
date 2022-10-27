import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppRouteEnum } from '../../../core';

interface Page {
    readonly path: string;
    readonly name: string;
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    public readonly pages: Page[] = [
        { name: 'Counter', path: AppRouteEnum.Counter },
        { name: 'Todos', path: AppRouteEnum.Todos }
    ];
}
