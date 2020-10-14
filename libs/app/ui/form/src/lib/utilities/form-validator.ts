import { AbstractControl, FormArray, Validators } from '@angular/forms'

export class Validator extends Validators {
  static minSelected(min = 1) {
    return (formArray: FormArray) => {
      const selected = (control: AbstractControl) => control.value.length
      const totalSelected = formArray.controls.filter(selected).length
      return totalSelected >= min ? null : { minSelected: true }
    }
  }
  static maxSelected(min = 1) {
    return (formArray: FormArray) => {
      const selected = (control: AbstractControl) => control.value.length
      const totalSelected = formArray.controls.filter(selected).length
      return totalSelected <= min ? null : { maxSelected: true }
    }
  }
  static rangeSelected(min: number, max: number) {
    return (formArray: FormArray) => {
      const selected = (control: AbstractControl) => control.value.length
      const totalSelected = formArray.controls.filter(selected).length
      return totalSelected >= min && totalSelected <= max ? null : { rangeSelected: true }
    }
  }
}
