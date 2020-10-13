import { Component } from '@angular/core'
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, NgControl } from '@angular/forms'
import { SpectatorHost, createHostFactory, createComponentFactory, Spectator } from '@ngneat/spectator'
import { CheckboxLabelComponent } from './checkbox-label.component'
import { CheckboxArrayComponent } from './checkbox-array.component'
import { CheckboxGroupComponent } from './checkbox-group.component'
import { CheckboxItemComponent } from './checkbox-item.component'
import { CheckboxComponent } from './checkbox.component'

const useCase = {
  onlyCheckbox: `<form-checkbox [formControl]="check">Label</form-checkbox>`,
  withValue: `<form-checkbox [formControl]="check" value="Gui"></form-checkbox>`,
  withId: `<form-checkbox [formControl]="check" id="id-1"></form-checkbox>`,
  withLabel: `<form-checkbox [formControl]="check">Label</form-checkbox>`,
  withValueChange: `<form-checkbox [formControl]="check" value="Gui" (valueChange)="onChange($event)">Label</form-checkbox>`,
  withAll: `<form-checkbox [formControl]="check" value="Gui" id="id-1" (valueChange)="onChange($event)">Label</form-checkbox>`,
}

const checkGroup = `
<form (ngSubmit)="onSubmit()" [formGroup]="form">
  <form-checkbox-group formGroupName="group">
    <h3 form-checkbox-label>Checkbox Group Label</h3>
    <form-checkbox formControlName="one" value="One">One</form-checkbox>
    <form-checkbox formControlName="two" value="Two">Two</form-checkbox>
    <form-checkbox formControlName="three" value="Three">Three</form-checkbox>
    <form-checkbox formControlName="four">Four</form-checkbox>
  </form-checkbox-group>
</form>
`

const checkArray = `
  <form (ngSubmit)="onSubmit()" [formGroup]="form">
    <form-checkbox-array formArrayName="array">
      <h3 form-checkbox-label>Checkbox Array Label</h3>
      <form-checkbox-item value="Hackfest 1">Hackfest 1</form-checkbox-item>
      <form-checkbox-item value="Hackfest 2">Hackfest 2</form-checkbox-item>
      <form-checkbox-item value="Hackfest 3">Hackfest 3</form-checkbox-item>
      <form-checkbox-item value="Hackfest 4">Hackfest 4</form-checkbox-item>
    </form-checkbox-array>
  </form>
  `

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

  describe('Use cases snapshots', () => {
    it('onlyCheckbox', () => {
      spectator = createCheckboxHost(useCase.onlyCheckbox)
      expect(spectator.query('.form-checkbox')).toMatchSnapshot()
    })

    it('withValue', () => {
      spectator = createCheckboxHost(useCase.withValue)
      expect(spectator.query('.form-checkbox')).toMatchSnapshot()
    })

    it('withId', () => {
      spectator = createCheckboxHost(useCase.withId)
      expect(spectator.query('.form-checkbox')).toMatchSnapshot()
    })

    it('withLabel', () => {
      spectator = createCheckboxHost(useCase.withLabel)
      expect(spectator.query('.form-checkbox')).toMatchSnapshot()
    })

    it('withValueChange', () => {
      spectator = createCheckboxHost(useCase.withValueChange)
      expect(spectator.query('.form-checkbox')).toMatchSnapshot()
    })

    it('withAll', () => {
      spectator = createCheckboxHost(useCase.withAll)
      expect(spectator.query('.form-checkbox')).toMatchSnapshot()
    })

    it('checkboxGroup', () => {
      spectatorGroup = createCheckboxGroupHost(checkGroup)
      expect(spectatorGroup.query('.form-checkbox-group')).toMatchSnapshot()
    })

    it('checkboxArray', () => {
      spectatorArray = createCheckboxArrayHost(checkArray)
      expect(spectatorArray.query('.form-checkbox-array')).toMatchSnapshot()
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
// })
