import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { AppDataAccessCoreService } from '@sandbox/app/data-access-core'

@Component({
  template: `
    <div class="container my-3 my-md-5">
      <form (ngSubmit)="onSubmit()" [formGroup]="form">
        <form-checkbox-group class="bordered" formGroupName="group">
          <h3 form-checkbox-label>Checkbox Group</h3>
          <form-checkbox formControlName="one" value="um">Um</form-checkbox>
          <form-checkbox formControlName="two" value="dois">Dois</form-checkbox>
          <form-checkbox formControlName="three" value="tres">Três</form-checkbox>
          <form-checkbox formControlName="four">Four</form-checkbox>
        </form-checkbox-group>

        <form-checkbox-array formArrayName="array">
          <h3 form-checkbox-label>Checkbox Array</h3>
          <form-checkbox-item value="Hackfest 1">Hackfest 1</form-checkbox-item>
          <form-checkbox-item value="Hackfest 2">Hackfest 2</form-checkbox-item>
          <form-checkbox-item value="Hackfest 3">Hackfest 3</form-checkbox-item>
          <form-checkbox-item value="Hackfest 4">Hackfest 4</form-checkbox-item>
        </form-checkbox-array>
        <div>
          <form-checkbox formControlName="check" value="Gui" (valueChange)="onChange($event)">
            Opção 0
          </form-checkbox>

          <form-radio formControlName="radio">
            <form-radio-option value="opção 1">Opção 1</form-radio-option>
            <form-radio-option value="opção 2">Opção 2</form-radio-option>
            <form-radio-option value="opção 3">Opção 3</form-radio-option>
          </form-radio>
        </div>
      </form>
      <div class="card">
        <div class="card-header">
          Dashboard
        </div>
        <div class="card-content"></div>
        <div class="card-footer">
          <code>{{ form.value | json }}</code>
        </div>
        <!--<div class="card-footer">Server uptime: {{ uptime$ | async }}</div>-->
      </div>
    </div>
  `,
  styles: [
    `
      :host form {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 50px 25px;
      }
    `,
  ],
})
export class AppFeatureDashboardComponent {
  // public uptime$ = this.data.uptimeWatch()

  obj = { value: 1, label: 'a' }

  form: FormGroup = this.fb.group({
    check: [true],
    array: this.fb.array([]),
    group: this.fb.group({
      one: [],
      two: [],
      three: [],
      four: [],
    }),
    radio: [],
  })

  constructor(
    /*private readonly data: AppDataAccessCoreService, */
    private fb: FormBuilder,
  ) {}

  onSubmit() {}

  onChange($event: any) {
    console.log($event)
  }

  onCheck($event: any) {
    console.log($event)
  }
}
