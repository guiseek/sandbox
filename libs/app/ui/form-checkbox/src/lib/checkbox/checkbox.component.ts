import { FormControlAccessor } from './../control-accessor'
import { takeUntil } from 'rxjs/operators'
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injectable,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild,
} from '@angular/core'
import { AbstractControl, FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Subject } from 'rxjs'
import { EventInputTarget } from '../event-input'

@Injectable()
export class FormCheckbox extends FormControlAccessor {}

const FormCheckboxProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormCheckbox),
  multi: true,
}

let nextId = 0

@Component({
  selector: 'form-checkbox',
  template: `
    <div class="form-checkbox">
      <input
        [id]="id"
        type="checkbox"
        name="checkbox"
        [value]="value"
        [checked]="el?.checked"
        [attr.aria-checked]="el?.checked"
        [attr.disabled]="disabled"
        [formControl]="control"
        (change)="onChangeEvent($event)"
        #input
      />
      <label [for]="id">
        <ng-content></ng-content>

        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.3,61.3c5.7,4.1,13.2,11.8,16.7,18C53,60.5,66,41,77.7,20.8" />
        </svg>
      </label>
    </div>
  `,
  styleUrls: ['../checkbox.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormCheckbox, FormCheckboxProvider],
})
export class CheckboxComponent extends FormCheckbox implements AfterContentInit, OnDestroy {
  destroy$ = new Subject<void>()

  @ViewChild('input', { static: true }) _el: ElementRef<HTMLInputElement>
  get el() {
    return this._el.nativeElement
  }

  private _id: string = `form-checkbox-${nextId++}`

  @Input()
  public set value(value: any) {
    this._value = value
  }
  public get value(): any {
    return this._value
  }

  @Input()
  public set id(value: string) {
    this._id = value
  }
  public get id(): string {
    return this._id
  }

  @Input()
  public set disabled(value: boolean) {
    this._disabled = value
  }

  @Output()
  valueChange = new EventEmitter<any>()

  @Output()
  checkedChange = new EventEmitter<boolean>()

  control: AbstractControl

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super()
  }

  ngAfterContentInit() {
    this.control = this.ngControl?.control ? this.ngControl?.control : new FormControl()
  }

  onChangeEvent({ target }: EventInputTarget) {
    this.onChange(target.value)
    this.checkedChange.emit(target.checked)
    this.valueChange.emit(target.value)
  }

  ngOnDestroy() {
    this.destroy$.complete()
  }
}
