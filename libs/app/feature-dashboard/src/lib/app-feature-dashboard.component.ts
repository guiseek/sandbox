import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { AppDataAccessCoreService } from '@sandbox/app/data-access-core'

@Component({
  template: `
    <div class="container my-3 my-md-5">
      <div class="card">
        <div class="card-header">
          Dashboard
        </div>
        <div class="card-content">
          <form (ngSubmit)="onSubmit()" [formGroup]="form">
            <form-checkbox formControlName="check" value="Gui" (valueChange)="onChange($event)">
              Gui Seek
            </form-checkbox>

            <form-checkbox-group formArrayName="group">
              <form-checkbox-item value="Hackfest 1">Hackfest 1</form-checkbox-item>
              <form-checkbox-item value="Hackfest 2">Hackfest 2</form-checkbox-item>
              <form-checkbox-item value="Hackfest 3">Hackfest 3</form-checkbox-item>
              <form-checkbox-item value="Hackfest 4">Hackfest 4</form-checkbox-item>
            </form-checkbox-group>

            <pre>{{ form.value | json }}</pre>

            <form-radio formControlName="radio">
              <form-radio-option value="opção 1">Opção 1</form-radio-option>
              <form-radio-option value="opção 2">Opção 2</form-radio-option>
              <form-radio-option value="opção 3">Opção 3</form-radio-option>
            </form-radio>
          </form>
        </div>
        <div class="card-footer">Server uptime: {{ uptime$ | async }}</div>
      </div>
    </div>
  `,
})
export class AppFeatureDashboardComponent {
  public uptime$ = this.data.uptimeWatch()

  form: FormGroup = this.fb.group({
    check: [true],
    group: this.fb.array([]),
    radio: [],
  })

  constructor(private readonly data: AppDataAccessCoreService, private fb: FormBuilder) {}

  onSubmit() {}

  onChange($event) {
    console.log($event)
  }

  onCheck($event) {
    console.log($event)
  }
}
