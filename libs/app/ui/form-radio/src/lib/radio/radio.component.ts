import {
  Self,
  Input,
  Output,
  Optional,
  ViewChild,
  Component,
  Injectable,
  ElementRef,
  forwardRef,
  OnDestroy,
  EventEmitter,
  AfterViewInit,
  AfterContentInit,
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
} from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { EventInputTarget } from '../event-input'
import { AbstractControl, FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { FormControlAccessor } from '../control-accessor'
import { RadioOptionComponent } from '../radio-option/radio-option.component'

let nextId = 0

@Injectable()
export class FormRadio extends FormControlAccessor {
  @Input()
  public set disabled(value: boolean) {
    this._disabled = value
  }
  @Input()
  public set value(value: any) {
    this._value = value
  }
}

const RadioProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormRadio),
  multi: true,
}

@Component({
  selector: 'form-radio',
  template: `
    <div class="form-radio">
      <ng-content select="form-radio-option"></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormRadio, RadioProvider],
})
export class RadioComponent extends FormRadio implements AfterContentInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject<void>()

  @ContentChildren(forwardRef(() => RadioOptionComponent), {
    descendants: true,
  })
  _radios: QueryList<RadioOptionComponent>

  @ViewChild('input', { static: true }) _el: ElementRef<HTMLInputElement>
  get el() {
    return this._el.nativeElement
  }

  @Input()
  public set id(value: string) {
    this._id = value
  }
  public get id(): string {
    return this._id
  }
  private _id = `form-radio-${nextId++}`

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter<any>()

  @Output()
  checkedChange = new EventEmitter<boolean>(false)

  control: AbstractControl

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super()
  }

  ngAfterContentInit() {
    this.control = this.ngControl?.control ? this.ngControl.control : new FormControl()
  }
  ngAfterViewInit() {
    this.ngControl?.control?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.valueChange.emit(value))
    this._radios.map((item) => this.onChangeOption(item))
  }
  onChangeOption(option: RadioOptionComponent) {
    option.name = this.id
    option.checkedChange.pipe(takeUntil(this.destroy$)).subscribe(({ value, el }) => {
      this.control.setValue(value)
      this.checkedChange.emit(el.checked)
      this.valueChange.emit(value)
    })
  }
  onChangeEvent(evt: EventInputTarget) {
    this.onChange(evt.target.value)
    this.checkedChange.emit(evt.target.checked)
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
