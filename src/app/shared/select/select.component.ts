import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClickOutsideDirective } from '../click-outside.directive';
import { Option } from './select.model';

@Component({
  selector: 'app-select',
  imports: [ClickOutsideDirective],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  label = input('Select an option');
  options = input<Option[]>([]);

  isOpen = signal(false);
  value = signal<string>('');
  disabled = false;

  displayLabel = computed(() => {
    if (!this.value()) {
      return this.label();
    }

    return this.value();
  });

  onChange: (value: string) => void = () => {
    /* empty */
  };
  onTouched: () => void = () => {
    /* empty */
  };

  writeValue(value: string): void {
    this.value.set(value);
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

  onSelectChange(value: string): void {
    this.value.set(value);
    this.onChange(this.value());
    this.onTouched();
    this.closeDropdown();
  }

  toggleOpen(): void {
    this.isOpen.update((val) => !val);
  }

  onBlur(event: MouseEvent): void {
    if (event) {
      this.closeDropdown();
      this.onTouched();
    }
  }

  closeDropdown() {
    this.isOpen.set(false);
  }
}
