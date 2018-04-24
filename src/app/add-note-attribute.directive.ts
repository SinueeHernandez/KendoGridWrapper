import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';
import { TrigerNotesResolverService } from './triger-notes-resolver.service';

@Directive({
  selector: '[appAddNoteAttribute]'
})
export class AddNoteAttributeDirective implements OnInit {

  constructor(
    private render: Renderer2,
    private el: ElementRef,
    private trigerNotesResolver: TrigerNotesResolverService
  ) { }

  ngOnInit() {
    const listEl = this.el.nativeElement.querySelectorAll('[name]');
    for (const element of listEl) {
      this.render.setAttribute(element, 'appAnchorNotes', '');
    }
    this.trigerNotesResolver.finishDomModification.emit(true);
  }
}
