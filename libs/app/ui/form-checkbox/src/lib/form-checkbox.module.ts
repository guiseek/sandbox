import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { CheckboxComponent } from './checkbox.component'
import { CheckboxGroupComponent } from './checkbox-group.component'
import { CheckboxLabelComponent } from './checkbox-label.component'
import { CheckboxItemComponent } from './checkbox-item.component'
import { CheckboxArrayComponent } from './checkbox-array.component'

export * from './checkbox.component'
export * from './checkbox-group.component'
export * from './checkbox-label.component'
export * from './checkbox-item.component'

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    CheckboxComponent,
    CheckboxGroupComponent,
    CheckboxItemComponent,
    CheckboxLabelComponent,
    CheckboxArrayComponent,
  ],
  exports: [
    CheckboxComponent,
    CheckboxGroupComponent,
    CheckboxItemComponent,
    CheckboxLabelComponent,
    CheckboxArrayComponent,
  ],
})
export class FormCheckboxModule {}
