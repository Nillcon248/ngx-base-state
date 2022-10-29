import { Component, HostBinding, HostListener, Input } from '@angular/core';

@Component({
    template: ''
})
export abstract class BaseTimelineItemComponent {
    @Input()
    @HostBinding('class.selected')
    public set isSelected(isSelected: boolean) {
        if (isSelected) {
            this.markAsSelected();
        }
    }

    public get isSelected(): boolean {
        return (BaseTimelineItemComponent.selectedId === this.id);
    }

    private static selectedId: number;

    private readonly id = Math.random();

    @HostListener('click')
    public onHostClick(): void {
        this.markAsSelected();
    }

    private markAsSelected(): void {
        BaseTimelineItemComponent.selectedId = this.id;
    }
}
