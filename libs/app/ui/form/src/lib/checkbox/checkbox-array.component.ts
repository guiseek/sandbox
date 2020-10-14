import { AbstractControl, ControlContainer, FormArray, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { CheckboxLabelComponent } from './checkbox-label.component'
import { CheckboxItemComponent } from './checkbox-item.component'
import { ControlAccessor } from '../control-accessor'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import {
  Component,
  ChangeDetectionStrategy,
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
  ContentChild,
} from '@angular/core'

@Injectable()
export class CheckboxArrayAccessor extends ControlAccessor {}

const CheckboxArrayProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxArrayComponent),
  multi: true,
}

let nextId = 0

@Component({
  selector: 'form-checkbox-array',
  template: `
    <div class="form-checkbox-array">
      <ng-content select="h3"></ng-content>
      <span class="asterisk"></span>
      <div role="group" [attr.aria-labelledby]="id">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CheckboxArrayAccessor, CheckboxArrayProvider],
  styles: [
    `
      .asterisk {
        position: relative;
      }
      :host.ng-invalid .asterisk::before {
        top: 0px;
        right: 6px;
        content: '*';
        font-size: 34px;
        line-height: 34px;
        position: absolute;
        visibility: visible;
        color: rgb(219, 94, 94);
      }
    `,
  ],
})
export class CheckboxArrayComponent extends CheckboxArrayAccessor
  implements AfterContentInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject<void>()

  @ContentChild(CheckboxLabelComponent) checkboxLabel: CheckboxLabelComponent

  @ContentChildren(CheckboxItemComponent) checkboxItems: QueryList<CheckboxItemComponent>

  private _id = `form-checkbox-array-${nextId++}`

  public get id(): string {
    return this._id
  }

  @Input() public set id(value: string) {
    this._id = value
  }

  @Input() minLength = 0

  @Output() valueChange = new EventEmitter<any>()

  control: AbstractControl

  get formArray() {
    return this.control as FormArray
  }

  constructor(@Optional() @Self() public ngControl: ControlContainer) {
    super()
  }

  ngAfterContentInit() {
    this.control = this.ngControl?.control ? this.ngControl?.control : new FormArray([])

    if (this.checkboxLabel) {
      this.checkboxLabel.el.id = this.id
    }

    if (this.checkboxItems?.length) {
      this.checkboxItems.map((item) => {
        item.checkboxChange
          .pipe(takeUntil(this.destroy$))

          .subscribe(this.onItemChange.bind(this))
      })
    }
    // this.checkValidator()
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
    // this.checkValidator()
  }

  checkValidator() {
    if (this.formArray.length < this.minLength) {
      this.control.setErrors({ minLength: true })
    }
  }

  ngAfterViewInit() {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => this.onChange(value))
  }

  ngOnDestroy() {
    this.destroy$.complete()
  }
}
