import { Component, ElementRef } from '@angular/core'

@Component({
  selector: 'h3[form-checkbox-label]',
  template: `<ng-content></ng-content>`,
})
export class CheckboxLabelComponent {
  el: HTMLHeadingElement
  constructor(private _el: ElementRef<HTMLHeadingElement>) {
    this.el = this._el.nativeElement
  }
}
