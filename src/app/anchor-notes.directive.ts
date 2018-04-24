import { Directive, ViewContainerRef, Input } from '@angular/core';

@Directive({
    selector: '[appanchornotes]',
})
export class AnchorNotesDirective {
    @Input() someVariable: string;
    constructor(public viewContainerRef: ViewContainerRef) {}
}
