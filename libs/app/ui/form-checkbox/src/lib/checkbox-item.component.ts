import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core'
import { EventInputTarget } from './event-input'

let nextId = 0

@Component({
  selector: 'form-checkbox-item',
  template: `
    <div class="form-checkbox">
      <input
        [id]="id"
        type="checkbox"
        name="checkboxes"
        role="checkbox"
        tabindex="0"
        [value]="value"
        [attr.aria-checked]="el?.checked"
        [attr.disabled]="disabled"
        (change)="onChangeEvent($event)"
        #input
      />
      <label [for]="id">
        <ng-content></ng-content>

        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.3,61.3c5.7,4.1,13.2,11.8,16.7,18C53,60.5,66,41,77.7,20.8" />
        </svg>
      </label>
    </div>
  `,
  styleUrls: ['./checkbox.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxItemComponent {
  @ViewChild('input', { static: true }) _el: ElementRef<HTMLInputElement>
  get el() {
    return this._el.nativeElement
  }

  private _id: string = `form-checkbox-item-${nextId++}`
  private _value: any
  private _disabled: boolean

  public get id(): string {
    return this._id
  }
  @Input()
  public set id(value: string) {
    this._id = value
  }

  @Input()
  public set value(value: any) {
    this._value = value
  }
  public get value(): any {
    return this._value
  }

  @Input()
  public set disabled(value: boolean) {
    this._disabled = value
  }
  public get disabled(): boolean {
    return this._disabled
  }

  @Output()
  checkboxChange = new EventEmitter<HTMLInputElement>()

  onChangeEvent({ target }: EventInputTarget) {
    this.checkboxChange.emit(target)
  }
}
