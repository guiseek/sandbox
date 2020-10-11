import { Component } from '@angular/core'
import { ReactiveFormsModule, FormControl, FormArray } from '@angular/forms'
import { Spectator, SpectatorHost, createHostFactory, createComponentFactory } from '@ngneat/spectator'

import { CheckboxComponent } from './checkbox/checkbox.component'

const VIEWS = {
  onlyCheck: `<form-checkbox [formControl]="check"></form-checkbox>`,
  withLabel: `<form-checkbox [formControl]="check">Label</form-checkbox>`,
  withCustomId: `<form-checkbox id="x" [formControl]="check"></form-checkbox>`,
  groupItems: `
    <form-checkbox-group formArrayName="items">
      <form-checkbox-item value="value1">Valor 1</form-checkbox-item>
      <form-checkbox-item value="value2">Valor 2</form-checkbox-item>
      <form-checkbox-item value="value3">Valor 3</form-checkbox-item>
    </form-checkbox-group>
  `,
}

@Component({ selector: 'form-custom-form', template: '' })
class CustomFormComponent {
  check = new FormControl()
}

describe('CheckboxComponent', () => {
  describe('Host', () => {
    let spectator: SpectatorHost<CheckboxComponent, CustomFormComponent>
    const createHost = createHostFactory({
      component: CheckboxComponent,
      host: CustomFormComponent,
      imports: [ReactiveFormsModule],
    })

    describe('Views', () => {
      it('should display only input', () => {
        spectator = createHost(VIEWS.onlyCheck)
        expect(spectator.query('.form-checkbox')).toMatchSnapshot()
      })

      it('should display checkbox with label', () => {
        spectator = createHost(VIEWS.withLabel)
        expect(spectator.query('.form-checkbox')).toMatchSnapshot()
      })

      it('should display checkbox with custom id', () => {
        spectator = createHost(VIEWS.withCustomId)
        expect(spectator.query('.form-checkbox')).toMatchSnapshot()
      })
    })

    describe('Props', () => {
      it('should create an instance', () => {
        spectator = createHost(VIEWS.withCustomId)
        const input = spectator.query('.form-checkbox > input')
        expect(input.getAttribute('id')).toEqual('x')
      })
    })
  })

  describe('Forms', () => {
    let spectator: Spectator<CheckboxComponent>
    const createComponent = createComponentFactory({
      component: CheckboxComponent,
      imports: [ReactiveFormsModule],
    })

    it('should create', () => {
      spectator = createComponent()
      expect(spectator.component).toBeTruthy()
    })

    it('should value changed if set value', () => {
      spectator.component.control.setValue('abc')
      expect(spectator.component.control.value).toBe('abc')
    })

    it('should value changed if set value', async () => {
      spyOn(spectator.component.valueChange, 'emit')
      spectator.component.control.valueChanges.subscribe(() => {
        expect(spectator.component.onChangeEvent).toBeCalledTimes(1)
        expect(spectator.component.valueChange.emit).toBeCalledTimes(1)
        expect(spectator.component.checkedChange.emit).toBeCalledTimes(1)
      })
      spectator.component.control.setValue('qwe')
    })
  })
})
