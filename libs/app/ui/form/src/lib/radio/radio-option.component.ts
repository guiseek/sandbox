import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core'

let nextId = 0

@Component({
  selector: 'form-radio-option',
  template: `
    <div class="form-radio">
      <input
        #input
        [id]="id"
        [name]="name"
        type="radio"
        class="cdk-visually-hidden"
        [value]="value"
        [checked]="el?.checked"
        [attr.aria-checked]="el?.checked"
        (change)="onChangeEvent()"
      />
      <label [attr.for]="id">
        <ng-content></ng-content>

        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M27.8,18.6c-3.7,5.1-7.3,10.1-11,15.2c13.7-6.9,27.5-13.9,42.4-17.6c-4.5,5.5-10.4,9.7-15.7,14.5
    c-4.4,4-8.5,8.4-12.5,12.8C25,50,19,56.5,14.1,63.9c10.2-6.1,20.4-12.2,30.6-18.4c3.1-1.9,6.2-3.7,9.4-5.2c3.2-1.4,6.5-2.5,9.7-3.7
    c7.5-2.8,14.7-6.5,21.8-10.2c-4.2,3.7-9.4,6.1-13.9,9.4c-3.1,2.3-5.8,4.9-8.8,7.4c-3.5,2.9-7.3,5.4-10.7,8.4
    c-4.5,4.2-8,9.3-11.6,14.2c-4.6,6.1-9.6,11.9-14.3,17.9c9.7-8.4,17-19.5,27.5-26.9c7.1-5,15.3-8.2,23.6-10.6
    c2.9-0.8,5.8-1.6,8.4-3.1c-3.5,4.9-8.2,8.7-12.8,12.6c-7.6,6.7-14.5,14-20.7,22C62.7,74.1,71,66.1,81.4,63.2"
          />
        </svg>
      </label>
    </div>
  `,
  styleUrls: ['./radio.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioOptionComponent {
  @ViewChild('input', { static: true }) _el: ElementRef<HTMLInputElement>
  get el() {
    return this._el.nativeElement
  }

  name: string

  public _value: any
  public get value(): any {
    return this._value
  }

  @Input()
  public set value(value: any) {
    this._value = value
  }

  @Input()
  public set id(value: string) {
    this._id = value
  }
  public get id(): string {
    return this._id
  }
  private _id = `form-radio-option-${nextId++}`

  @Output()
  checkedChange = new EventEmitter<RadioOptionComponent>()

  onChangeEvent() {
    this.checkedChange.emit(this)
  }
}
