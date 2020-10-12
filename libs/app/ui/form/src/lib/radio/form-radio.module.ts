import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { RadioComponent } from './radio.component'
import { RadioOptionComponent } from './radio-option.component'

export * from './radio.component'
export * from './radio-option.component'

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [RadioComponent, RadioOptionComponent],
  exports: [RadioComponent, RadioOptionComponent],
})
export class FormRadioModule {}
