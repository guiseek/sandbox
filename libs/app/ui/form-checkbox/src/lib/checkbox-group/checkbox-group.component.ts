import { takeUntil } from 'rxjs/operators'
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Injectable,
  forwardRef,
  Output,
  EventEmitter,
  Optional,
  Self,
  AfterViewInit,
} from '@angular/core'
import { AbstractControl, ControlContainer, FormArray, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Subject } from 'rxjs'
import { CheckboxItemComponent } from '../checkbox-item/checkbox-item.component'
import { FormControlAccessor } from '../control-accessor'

@Injectable()
export class FormCheckboxGroup extends FormControlAccessor {}

const FormCheckboxProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxGroupComponent),
  multi: true,
}

let nextId = 0

@Component({
  selector: 'form-checkbox-group',
  template: `
    <div class="form-checkbox-group" #group [id]="id">
      <ng-content></ng-content>
    </div>
  `,
  providers: [FormCheckboxGroup, FormCheckboxProvider],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupComponent extends FormCheckboxGroup
  implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject<void>()
  @ViewChild('group', { static: true }) _el: ElementRef<HTMLDivElement>
  get el() {
    return this._el.nativeElement
  }

  @ContentChildren(CheckboxItemComponent) checkboxItems: QueryList<CheckboxItemComponent>

  private _id: string = `form-checkbox-group-${nextId++}`

  public get id(): string {
    return this._id
  }
  @Input()
  public set id(value: string) {
    this._id = value
  }

  @Output()
  valueChange = new EventEmitter<any>()

  control: AbstractControl

  get formArray() {
    return this.control as FormArray
  }

  constructor(@Optional() @Self() public ngControl: ControlContainer) {
    super()
  }

  ngOnInit(): void {}

  ngAfterContentInit() {
    this.control = this.ngControl?.control ? this.ngControl?.control : new FormArray([])

    this.checkboxItems.map((item) => {
      item.checkboxChange.pipe(takeUntil(this.destroy$)).subscribe(this.onItemChange.bind(this))
    })
  }

  onItemChange({ checked, value }) {
    if (checked) {
      this.formArray.push(new FormControl(value))
    } else {
      this.formArray.controls.forEach((ctrl, i) => {
        if (ctrl.value === value) {
          return this.formArray.removeAt(i)
        }
      })
    }
  }

  ngAfterViewInit() {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => this.onChange(value))
  }

  ngOnDestroy() {
    this.destroy$.complete()
  }
}
