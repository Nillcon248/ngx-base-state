import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { ChromeTabsService, RuntimeMessageEnum } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public data$ = this.chromeTabsService.watchForActive()
    .pipe(
      map((tab) => tab.id as number),
      switchMap((tabId) => this.chromeTabsService.sendMessage<string>(tabId, { type: RuntimeMessageEnum.Metadata }))
    );

  constructor(
    private readonly chromeTabsService: ChromeTabsService
  ) {}
}
