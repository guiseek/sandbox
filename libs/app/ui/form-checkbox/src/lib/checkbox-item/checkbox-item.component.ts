import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core'
import { EventInputTarget } from '../event-input'

let nextId = 0

@Component({
  selector: 'form-checkbox-item',
  templateUrl: './checkbox-item.component.html',
  styleUrls: ['../checkbox-styles.scss'],
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
