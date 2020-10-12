import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Component } from '@angular/core'
import { Spectator, SpectatorHost, createHostFactory, createComponentFactory } from '@ngneat/spectator'

import { RadioComponent } from './radio.component'
import { RadioOptionComponent } from '../radio-option/radio-option.component'

const VIEWS = {
  onlyOne: `
    <form-radio [formControl]="form">
      <form-radio-option value="1">1</form-radio-option>
    </form-radio>
  `,
  withOptions: `
    <form-radio [formControl]="form">
      <form-radio-option *ngFor="let c of choices" [value]="c.k">{{ c.v }}</form-radio-option>
    </form-radio>
  `,
  withCustomId: `
    <form-radio-option id="x" value="1">1</form-radio-option>
  `,
}

const OPTIONS = Array.from(['HTML', 'CSS'])

@Component({ selector: 'form-custom-form', template: '' })
class CustomFormComponent {
  form = new FormControl()
  choices = OPTIONS
}

describe('RadioComponent', () => {
  describe('Host', () => {
    let spectator: SpectatorHost<RadioComponent, CustomFormComponent>
    const createHost = createHostFactory({
      component: RadioComponent,
      host: CustomFormComponent,
      declarations: [RadioOptionComponent],
      imports: [ReactiveFormsModule],
    })

    describe('Views', () => {
      it('should display only one option', () => {
        spectator = createHost(VIEWS.onlyOne)
        expect(spectator.query('.form-radio')).toMatchSnapshot()
      })

      it('should display radio with options', () => {
        spectator = createHost(VIEWS.withOptions)
        expect(spectator.query('.form-radio')).toMatchSnapshot()
      })
    })

    describe('Props', () => {
      it('should display only one option', () => {
        spectator = createHost(VIEWS.onlyOne)
        const input = spectator.queryAll('form-radio-option')
        expect(input.length).toEqual(1)
      })

      it('should create an instance with 2 options', () => {
        spectator = createHost(VIEWS.withOptions)
        const input = spectator.queryAll('form-radio-option')
        expect(input.length).toEqual(2)
      })
    })
  })

  describe('Forms', () => {
    let spectator: Spectator<RadioComponent>
    const createComponent = createComponentFactory({
      component: RadioComponent,
      imports: [FormsModule, ReactiveFormsModule],
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
