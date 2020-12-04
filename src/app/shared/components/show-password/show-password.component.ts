import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-show',
  template: `
    <i (mouseover)="show()" (mouseleave)="show()" class="material-icons">{{
      showHide ? 'visibility' : 'visibility_off'
    }}</i>
  `,
  styles: [
    `
      i {
        position: absolute;
        right: 0.5rem;
        bottom: 0.5rem;
        font-size: 1.2rem;
      }
    `,
  ],
})
export class ShowPasswordComponent {
  @Input('show') showHide: boolean;
  @Output() toggle = new EventEmitter();
  show() {
    this.showHide = !this.showHide;
    this.toggle.emit(this.showHide);
  }
}
