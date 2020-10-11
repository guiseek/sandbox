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
              <form-checkbox-item value="Gui 1">Gui 1</form-checkbox-item>
              <form-checkbox-item value="Gui 2">Gui 2</form-checkbox-item>
              <form-checkbox-item value="Gui 3">Gui 3</form-checkbox-item>
            </form-checkbox-group>
          </form>
          <pre>{{ form.value | json }}</pre>
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
