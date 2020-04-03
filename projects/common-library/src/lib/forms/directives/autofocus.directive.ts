import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[libAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef<HTMLElement>) {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 0);
  }

}
