import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonViewerComponent {
    @Input()
    public data!: unknown;

    public isJsonViewerExpanded = false;

    public onExpandButtonClick(): void {
        this.isJsonViewerExpanded = !this.isJsonViewerExpanded;
    }
}
