import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MetadataService } from '@extension-services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(
    private readonly metadataService: MetadataService
  ) {}

  public ngOnInit(): void {
    this.metadataService.initObserver();
  }
}
