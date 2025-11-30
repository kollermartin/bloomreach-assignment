import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  element = inject(ElementRef);

  clickOutside = output<MouseEvent>();

  @HostListener('document:click', ['$event']) handleClick(event: MouseEvent) {
    if (!this.element.nativeElement.contains(event.target)) {
      this.clickOutside.emit(event);
    }
  }
}
