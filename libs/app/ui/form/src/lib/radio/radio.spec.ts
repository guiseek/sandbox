import { Spectator, SpectatorHost, createHostFactory, createComponentFactory } from '@ngneat/spectator'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RadioOptionComponent } from './radio-option.component'
import { RadioComponent } from './radio.component'
import { Component } from '@angular/core'

const useCase = {
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
    <form-radio [formControl]="form">
      <form-radio-option *ngFor="let c of choices" [id]="'id-' + c" [value]="c.k">{{ c.v }}</form-radio-option>
    </form-radio>
  `,
}

@Component({ selector: 'form-custom-form', template: '' })
class CustomFormComponent {
  form = new FormControl()
  choices = ['HTML', 'CSS']
}

describe('RadioComponent', () => {
  let spectator: SpectatorHost<RadioComponent, CustomFormComponent>
  const createHost = createHostFactory({
    component: RadioComponent,
    host: CustomFormComponent,
    declarations: [RadioOptionComponent],
    imports: [ReactiveFormsModule],
  })

  describe('Use cases snapshots', () => {
    it('onlyOne', () => {
      spectator = createHost(useCase.onlyOne)
      expect(spectator.query('.form-radio')).toMatchSnapshot()
    })

    it('withOptions', () => {
      spectator = createHost(useCase.withOptions)
      expect(spectator.query('.form-radio')).toMatchSnapshot()
    })

    it('withCustomId', () => {
      spectator = createHost(useCase.withCustomId)
      expect(spectator.query('.form-radio')).toMatchSnapshot()
    })

    it('should display only one option', () => {
      spectator = createHost(useCase.onlyOne)
      const input = spectator.queryAll('form-radio-option')
      expect(input.length).toEqual(1)
    })

    it('should create an instance with 2 options', () => {
      spectator = createHost(useCase.withOptions)
      const input = spectator.queryAll('form-radio-option')
      expect(input.length).toEqual(2)
    })
  })

  describe('Radio', () => {
    let radio: Spectator<RadioComponent>
    const createRadio = createComponentFactory({
      component: RadioComponent,
      imports: [FormsModule, ReactiveFormsModule],
    })

    it('should create', () => {
      radio = createRadio()
      expect(spectator.component).toBeTruthy()
    })

    it('should value changed if set value', () => {
      radio.component.control.setValue('abc')
      expect(radio.component.control.value).toBe('abc')
    })

    it('should value changed if set value', async () => {
      spyOn(radio.component.valueChange, 'emit')
      radio.component.control.valueChanges.subscribe(() => {
        expect(radio.component.onChangeEvent).toBeCalledTimes(1)
        expect(radio.component.valueChange.emit).toBeCalledTimes(1)
        expect(radio.component.checkedChange.emit).toBeCalledTimes(1)
      })
      radio.component.control.setValue('qwe')
    })
  })
})
