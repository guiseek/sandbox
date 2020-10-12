import { FormCheckboxModule } from './checkbox/form-checkbox.module'
import { FormRadioModule } from './radio/form-radio.module'
import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'

@NgModule({
  exports: [ReactiveFormsModule, FormCheckboxModule, FormRadioModule],
})
export class AppUiFormModule {}
