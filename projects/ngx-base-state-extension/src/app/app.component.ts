import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { MetadataService } from '@extension-services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private readonly metadataService: MetadataService
  ) {}

  public ngOnInit(): void {
    this.metadataService.initObserver();
  }

  public ngOnDestroy(): void {
    console.log('extension destroy');
  }
}
