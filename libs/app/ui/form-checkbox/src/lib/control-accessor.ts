import { ControlValueAccessor } from '@angular/forms'

export class FormControlAccessor implements ControlValueAccessor {
  protected _value: any
  protected _disabled: boolean

  public get disabled(): boolean {
    return this._disabled
  }

  onChange: any = () => {}
  onTouched: any = () => {}

  writeValue(obj: any): void {
    if (obj) {
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled
  }
}
