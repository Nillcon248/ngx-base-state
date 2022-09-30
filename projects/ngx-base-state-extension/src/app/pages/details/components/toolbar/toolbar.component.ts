import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { OPENED_CLASS_NAME } from '../../consts';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  constructor(
    @Inject(OPENED_CLASS_NAME) public readonly openedClassName: string
  ) {}
}
