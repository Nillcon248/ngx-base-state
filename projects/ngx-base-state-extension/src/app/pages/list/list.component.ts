import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AppRouteEnum } from '../../core';
import { MetadataService } from '../../services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  public stateClassNames$ = this.metadataService.data$
    .pipe(
      map((metadata) => Object.keys(metadata))
    );

  constructor(
    private readonly metadataService: MetadataService,
    private readonly router: Router
  ) {}

  public onListItemClick(className: string): void {
    this.router.navigateByUrl(`/${AppRouteEnum.Details}/${className}`);
  }
}
