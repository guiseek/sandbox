import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { CheckboxComponent } from './checkbox/checkbox.component'
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component'
import { CheckboxItemComponent } from './checkbox-item/checkbox-item.component'

export * from './checkbox/checkbox.component'
export * from './checkbox-group/checkbox-group.component'
export * from './checkbox-item/checkbox-item.component'

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [CheckboxComponent, CheckboxGroupComponent, CheckboxItemComponent],
  exports: [CheckboxComponent, CheckboxGroupComponent, CheckboxItemComponent],
})
export class FormCheckboxModule {}
