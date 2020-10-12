import { Component } from '@angular/core'
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, NgControl } from '@angular/forms'
import { SpectatorHost, createHostFactory, createComponentFactory, Spectator } from '@ngneat/spectator'
import { CheckboxLabelComponent } from './checkbox-label.component'
import { CheckboxArrayComponent } from './checkbox-array.component'
import { CheckboxGroupComponent } from './checkbox-group.component'
import { CheckboxItemComponent } from './checkbox-item.component'
import { CheckboxComponent } from './checkbox.component'

const VIEWS = {
  onlyCheckbox: `<form-checkbox [formControl]="check" value="Gui" (valueChange)="onChange($event)">Label</form-checkbox>`,
  checkboxGroup: `
  <form (ngSubmit)="onSubmit()" [formGroup]="form">
    <form-checkbox-group formGroupName="group">
      <h3 form-checkbox-label>Checkbox Group Label</h3>
      <form-checkbox formControlName="one" value="One">One</form-checkbox>
      <form-checkbox formControlName="two" value="Two">Two</form-checkbox>
      <form-checkbox formControlName="three" value="Three">Three</form-checkbox>
      <form-checkbox formControlName="four">Four</form-checkbox>
    </form-checkbox-group>
  </form>
  `,
  checkboxArray: `
  <form (ngSubmit)="onSubmit()" [formGroup]="form">
    <form-checkbox-array formArrayName="array">
      <h3 form-checkbox-label>Checkbox Array Label</h3>
      <form-checkbox-item value="Hackfest 1">Hackfest 1</form-checkbox-item>
      <form-checkbox-item value="Hackfest 2">Hackfest 2</form-checkbox-item>
      <form-checkbox-item value="Hackfest 3">Hackfest 3</form-checkbox-item>
      <form-checkbox-item value="Hackfest 4">Hackfest 4</form-checkbox-item>
    </form-checkbox-array>
  </form>
  `,
  onlyCheck: `<form-checkbox [formControl]="check"></form-checkbox>`,
  withLabel: `<form-checkbox [formControl]="check">Label</form-checkbox>`,
  withCustomId: `<form-checkbox id="x" [formControl]="check"></form-checkbox>`,
}

@Component({ selector: 'form-custom-form', template: '' })
class CustomFormComponent {
  check = new FormControl()
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

  constructor(private fb: FormBuilder) {}
  onChange($event: any) {
    console.log($event)
  }
  onCheck($event: any) {
    console.log($event)
  }
}

describe('CheckboxComponent', () => {
  describe('Host', () => {
    let spectator: SpectatorHost<CheckboxComponent, CustomFormComponent>
    let spectatorGroup: SpectatorHost<CheckboxGroupComponent, CustomFormComponent>
    let spectatorArray: SpectatorHost<CheckboxArrayComponent, CustomFormComponent>

    const createCheckboxHost = createHostFactory({
      component: CheckboxComponent,
      host: CustomFormComponent,
      imports: [ReactiveFormsModule],
    })

    const createCheckboxGroupHost = createHostFactory({
      component: CheckboxGroupComponent,
      host: CustomFormComponent,
      declarations: [CheckboxComponent, CheckboxLabelComponent],
      imports: [ReactiveFormsModule],
    })

    const createCheckboxArrayHost = createHostFactory({
      component: CheckboxArrayComponent,
      host: CustomFormComponent,
      declarations: [CheckboxItemComponent],
      imports: [ReactiveFormsModule],
    })

    describe('Views', () => {
      it('should display only input', () => {
        spectator = createCheckboxHost(VIEWS.onlyCheck)
        expect(spectator.query('.form-checkbox')).toMatchSnapshot()
      })

      it('should display checkbox', () => {
        spectator = createCheckboxHost(VIEWS.onlyCheckbox)
        expect(spectator.component).toMatchSnapshot()
      })

      it('should display checkbox group', () => {
        spectatorGroup = createCheckboxGroupHost(VIEWS.checkboxGroup)
        expect(spectatorGroup.component).toMatchSnapshot()
      })

      it('should display checkbox array', () => {
        spectatorArray = createCheckboxArrayHost(VIEWS.checkboxArray)
        expect(spectatorArray.component).toMatchSnapshot()
      })
    })

    describe('Checkbox', () => {
      let checkbox: Spectator<CheckboxComponent>
      const createCheckbox = createComponentFactory({
        component: CheckboxComponent,
        imports: [ReactiveFormsModule],
      })

      it('should change value and snapshot', async () => {
        checkbox = createCheckbox()
        const label: HTMLLabelElement = checkbox.query('label')

        expect(checkbox.component.control.value).toMatchSnapshot()

        label.click()

        expect(checkbox.component.control.value).toMatchSnapshot()

        label.click()

        expect(checkbox.component.control.value).toMatchSnapshot()
      })

      it('should change value', async () => {
        checkbox = createCheckbox()
        const label: HTMLLabelElement = checkbox.query('label')

        expect(checkbox.component.control.value).toBe(null)

        label.click()

        expect(checkbox.component.control.value).toBe(true)

        label.click()

        expect(checkbox.component.control.value).toBe(false)
      })
    })

    describe('CheckboxGroup', () => {
      it('should change values on children checkboxes', async () => {
        const component = spectatorGroup.component
        const checkboxes = component.checkboxes.toArray()

        const valueExpect = { one: 0, two: 1, three: 2, four: 3 }

        checkboxes[0].control.setValue(0)
        checkboxes[1].control.setValue(1)
        checkboxes[2].control.setValue(2)
        checkboxes[3].control.setValue(3)

        expect(component.control.value).toStrictEqual(valueExpect)
      })
    })
  })
})
