import { Component, Input, HostBinding, HostListener } from '@angular/core';

@Component({
    template: '',
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

    private readonly id = Math.random();

    private static selectedId: number;

    @HostListener('click')
    public onHostClick(): void {
        this.markAsSelected();
    }

    private markAsSelected(): void {
        BaseTimelineItemComponent.selectedId = this.id;
    }
}
