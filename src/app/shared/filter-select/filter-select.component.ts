import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
      useExisting: FilterSelectComponent,
      multi: true,
    },
  ],
})
export class FilterSelectComponent implements ControlValueAccessor {
  label = input('Select an option');
  value = '';
  disabled = false;

  onChange: (value: string) => void = () => {
    /* empty */
  };
  onTouched: () => void = () => {
    /* empty */
  };

  writeValue(value: string): void {
    this.value = value || '';
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
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
