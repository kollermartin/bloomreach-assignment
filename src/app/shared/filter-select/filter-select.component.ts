import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter-select',
  imports: [],
  templateUrl: './filter-select.component.html',
  styleUrl: './filter-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSelectComponent {
  control = input.required<FormControl<string | null>>();
  label = input('Select an option');

  selectedValue = output<string>();

  onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.control().setValue(target.value);
    this.control().markAsDirty();
    this.control().markAsTouched();
    this.selectedValue.emit(target.value);
  }
}
