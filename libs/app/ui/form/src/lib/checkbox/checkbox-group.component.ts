import { AbstractControl, ControlContainer, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms'
import { CheckboxLabelComponent } from './checkbox-label.component'
import { CheckboxComponent } from './checkbox.component'
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
export class CheckboxGroupAccessor extends ControlAccessor {}

const CheckboxGroupProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxGroupComponent),
  multi: true,
}

let nextId = 0

@Component({
  selector: 'form-checkbox-group',

  template: `
    <div class="form-checkbox-group">
      <ng-content select="h3"></ng-content>
      <div role="group" [attr.aria-labelledby]="id">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      :host.bordered .form-checkbox-group {
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 12px 12px 4px;
      }
    `,
  ],
  providers: [CheckboxGroupAccessor, CheckboxGroupProvider],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupComponent extends CheckboxGroupAccessor
  implements AfterContentInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject<void>()

  @ContentChild(CheckboxLabelComponent) checkboxLabel: CheckboxLabelComponent

  @ContentChildren(CheckboxComponent) checkboxes: QueryList<CheckboxComponent>

  private _id = `form-checkbox-group-${nextId++}`

  public get id(): string {
    return this._id
  }

  @Input() public set id(value: string) {
    this._id = value
  }

  @Output() valueChange = new EventEmitter<any>()

  control: AbstractControl

  get formGroup() {
    return this.control as FormGroup
  }

  constructor(@Optional() @Self() public ngControl: ControlContainer) {
    super()
  }

  ngAfterContentInit() {
    this.control = this.ngControl?.control ? this.ngControl?.control : new FormGroup({})

    if (this.checkboxLabel) {
      this.checkboxLabel.el.id = this.id
    }

    if (this.checkboxes?.length) {
      this.checkboxes.map((item) => {
        item.checkedChange
          .pipe(takeUntil(this.destroy$))

          .subscribe(this.onCheckboxChecked.bind(this))
      })
    }
  }

  onCheckboxChecked(item: CheckboxComponent) {
    if (item.el.value !== 'undefined' && item.el.checked) {
      item.control.patchValue(item.el.value)
    }
  }

  ngAfterViewInit() {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => this.onChange(value))
  }

  ngOnDestroy() {
    this.destroy$.complete()
  }
}
