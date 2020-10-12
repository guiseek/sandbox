import { Component, ElementRef } from '@angular/core'

@Component({
  selector: `
    form-checkbox-label,
    h3[form-checkbox-label]
  `,
  template: `<ng-content></ng-content>`,
})
export class CheckboxLabelComponent {
  el: HTMLHeadingElement
  constructor(private _el: ElementRef<HTMLHeadingElement>) {
    this.el = this._el.nativeElement
  }
}
