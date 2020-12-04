import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appShrinkNav]',
})
export class ShrinkNavDirective {
  @HostBinding('class.shrink') isShrinked: boolean;
  @HostListener('window:scroll', ['$event']) onScroll(e) {
    if (scrollY > 0) this.isShrinked = true;
    if (scrollY === 0) this.isShrinked = false;
  }
  @HostListener('mouseup', ['$event']) onHold(e) {
    this.isShrinked = false;
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }
}
