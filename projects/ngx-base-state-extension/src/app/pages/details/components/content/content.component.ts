import { ChangeDetectionStrategy, Component, Input, Inject } from '@angular/core';
import { MetadataService } from '@extension-services';
import { map, Observable } from 'rxjs';
import { OPENED_CLASS_NAME } from '../../consts';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
  public stateData$: Observable<unknown> = this.metadataService.data$
    .pipe(
      // FIXME: Check why noPropertyAccessFromIndexSignature ts rule doesn't work
      map((metadata: any) => metadata[this.openedClassName])
    );

  constructor(
    @Inject(OPENED_CLASS_NAME) private readonly openedClassName: string,
    private readonly metadataService: MetadataService
  ) {}
}
