import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Validator } from '@sandbox/app-ui-form'
// import { AppDataAccessCoreService } from '@sandbox/app/data-access-core'

@Component({
  template: `
    <div class="container my-3 my-md-5">
      <form (ngSubmit)="onSubmit()" [formGroup]="form">
        <div>
          <form-checkbox-group class="bordered" formGroupName="group">
            <h3 form-checkbox-label>Checkbox Group</h3>
            <form-checkbox formControlName="one">Um</form-checkbox>
            <form-checkbox formControlName="two" value="dois">Dois</form-checkbox>
            <form-checkbox formControlName="three">Três</form-checkbox>
            <form-checkbox formControlName="four">Quatro</form-checkbox>
          </form-checkbox-group>
          <pre>{{ group.value | json }}</pre>
        </div>
        <div>
          <form-checkbox-array formArrayName="array">
            <h3 form-checkbox-label>Checkbox Array</h3>
            <form-checkbox-item value="Hackfest 1">Hackfest 1</form-checkbox-item>
            <form-checkbox-item value="Hackfest 2">Hackfest 2</form-checkbox-item>
            <form-checkbox-item value="Hackfest 3">Hackfest 3</form-checkbox-item>
            <form-checkbox-item value="Hackfest 4">Hackfest 4</form-checkbox-item>
          </form-checkbox-array>
          <pre>{{ array.errors | json }}</pre>
          <pre>{{ array.value | json }}</pre>
        </div>
        <div>
          <form-radio formControlName="radio">
            <form-radio-option value="opção 1">Opção 1</form-radio-option>
            <form-radio-option value="opção 2">Opção 2</form-radio-option>
            <form-radio-option value="opção 3">Opção 3</form-radio-option>
          </form-radio>
          <pre>{{ radio.value | json }}</pre>
        </div>
      </form>
      <div>
        <form-checkbox [formControl]="check" value="Gui" (valueChange)="onChange($event)">
          {{ form.get('check').value ? 'check' : 'noop' }}
        </form-checkbox>

        <code>{{ form.value | json }}</code>
        <code>{{ form.valid | json }}</code>
      </div>
      <!--<div class="card-footer">Server uptime: {{ uptime$ | async }}</div>-->
    </div>
  `,
  styles: [
    `
      :host form {
        display: flex;
        justify-content: space-around;
        align-items: start;
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
    array: this.fb.array([], Validator.minSelected(3)),
    group: this.fb.group({
      one: ['', Validator.requiredTrue],
      two: [],
      three: ['', Validator.requiredTrue],
      four: [],
    }),
    radio: [],
  })

  constructor(
    /*private readonly data: AppDataAccessCoreService, */
    private fb: FormBuilder,
  ) {
    this.form.statusChanges.subscribe((status) => {
      console.log(status)
      console.log(this.form.get('array').hasError('minLength'))
    })
  }

  get array() {
    return this.form.get('array')
  }
  get group() {
    return this.form.get('group')
  }
  get radio() {
    return this.form.get('radio')
  }
  get check() {
    return this.form.get('check')
  }

  onSubmit() {}

  onChange($event: any) {
    console.log($event)
  }

  onCheck($event: any) {
    console.log($event)
  }
}
