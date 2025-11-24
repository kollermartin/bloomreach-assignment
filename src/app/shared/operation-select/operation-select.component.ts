import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CustomerEventPropertyType } from '../../core/models/customer-events.model';
import {
  filterOperationsList,
  numberFilterOperations,
  stringFilterOperations,
} from '../../core/models/filter.operations.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-operation-select',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './operation-select.component.html',
  styleUrl: './operation-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OperationSelect),
      multi: true,
    },
  ],
})
export class OperationSelect implements ControlValueAccessor {
  defaultPropertyType = input.required<CustomerEventPropertyType>();
  label = input<string>('Select operator');

  isOpen = signal(false);
  value = signal<string | null>(null);

  private _activeTab = signal<CustomerEventPropertyType | null>(null);

  activeTab = computed(() => this._activeTab() || this.defaultPropertyType());

  stringOperations = stringFilterOperations;
  numberOperations = numberFilterOperations;

  operations = computed(() => {
    return this.activeTab() === 'string' ? this.stringOperations : this.numberOperations;
  });

  defaultSelectedOperation = computed(() => {
    const ops = this.operations();
    return ops.length > 0 ? ops[0].value : null;
  });

  displayLabel = computed(() => {
    const currentValue = this.value();
    if (!currentValue) {
      return null;
    }

    const allOperations = filterOperationsList;
    const operation = allOperations.find((op) => op.value === currentValue);
    return operation?.label || '';
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: string | null) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};
  private disabled = false;

  constructor() {
    // Set default operation when propertyType changes and control has no value
    effect(() => {
      const defaultOp = this.defaultSelectedOperation();
      const currentValue = this.value();

      if (!currentValue && defaultOp) {
        this.writeValue(defaultOp);
        this.onChange(defaultOp);
      }
    });
  }

  writeValue(value: string | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onBlur(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement;

    if (!relatedTarget) {
      this.closeDropdown();
      this.onTouched();
    }
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.isOpen.update((value) => !value);
    }
  }

  closeDropdown() {
    this.isOpen.set(false);
  }

  switchTab(type: CustomerEventPropertyType) {
    this._activeTab.set(type);
  }

  selectOperator(value: string) {
    this.value.set(value);
    this.onChange(value);
    this.closeDropdown();
  }
}
