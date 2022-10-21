import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[highlightWhenDataChanges]'
})
export class HighlightWhenDataChangesDirective<T = unknown> {
    @Input('highlightWhenDataChanges')
    public set data(data: T) {
        if (this._previousData !== data) {
            this.applyHighlightClass();
        }

        this._previousData = data;
    }

    private readonly highlightClassName = 'highlight';
    private readonly highlightClassAssignmentDelayInMs = 10;

    private _previousData: T | undefined;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {}

    private applyHighlightClass(): void {
        this.hostElementRef.nativeElement.classList.remove(this.highlightClassName);

        setTimeout(
            () => this.hostElementRef.nativeElement.classList.add(this.highlightClassName),
            this.highlightClassAssignmentDelayInMs
        );
    }
}
