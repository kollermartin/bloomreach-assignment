import {ChangeDetectionStrategy, Component, forwardRef, input, signal} from '@angular/core';
import { CustomerEvent } from '../../core/models/customer-events';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-filter-select',
  imports: [],
  templateUrl: './filter-select.component.html',
  styleUrl: './filter-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterSelectComponent),
      multi: true,
    },
  ],
})
export class FilterSelectComponent implements ControlValueAccessor {
  options = input.required<CustomerEvent[]>();

  value = signal('');
  disabled = false;

  private onChange: (value: string) => void = () => {
    /* empty */
  };
  private onTouched: () => void = () => {
    /* empty */
  };

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value.set(target.value);
    this.onChange(target.value);
    this.onTouched();
  }
}
