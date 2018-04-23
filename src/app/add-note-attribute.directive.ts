import { Directive, Renderer2, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAddNoteAttribute]'
})
export class AddNoteAttributeDirective implements AfterViewInit {

  constructor(
    private render: Renderer2,
    private el: ElementRef
  ) { }

  ngAfterViewInit() {
    this.el.nativeElement.querySelectorAll('[name]').forEach(element => {
      this.render.addClass(element, 'app-notes');
    });
    // console.log(this.el.nativeElement.querySelectorAll('[name]'));
  }
}
