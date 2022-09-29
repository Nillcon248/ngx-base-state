import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { finalize, map, Observable, switchMap, tap } from 'rxjs';
import { ChromeTabsService, RuntimeMessageEnum } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-base-state-extension';

  public test!: number;

  public data$: Observable<unknown> = this.chromeTabsService.watchForActive()
    .pipe(
      map((tab) => tab.id as number),
      map((tabId) => this.domSanitizer.sanitize(SecurityContext.NONE, tabId.toString())),
      tap((data) => console.log(data))
    );

  constructor(
    private readonly chromeTabsService: ChromeTabsService,
    private readonly domSanitizer: DomSanitizer
  ) {
    this.chromeTabsService.watchForActive()
      .pipe(
        map((tab) => tab.id as number),
        tap((data) => console.log(data))
      )
      .subscribe((data) => this.test = data);
  }
}
