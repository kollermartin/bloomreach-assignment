import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomerEventPropertyType } from '../../core/models/customer-events';
import { numberFilterOperations, stringFilterOperations } from '../../core/enums/filter-operations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-operator-select',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './filter-operator-select.component.html',
  styleUrl: './filter-operator-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterOperatorSelectComponent {
  control = input.required<FormControl<string | null>>();
  propertyType = input.required<CustomerEventPropertyType>();
  label = input<string>('Select operator');

  private _activeTab = signal<CustomerEventPropertyType | null>(null);

  activeTab = computed(() => this._activeTab() || this.propertyType());

  stringOperations = stringFilterOperations;
  numberOperations = numberFilterOperations;

  operations = computed(() => {
    return this.activeTab() === 'string' ? this.stringOperations : this.numberOperations;
  });

  defaultSelectedOperation = computed(() => {
    const ops = this.operations();
    return ops.length > 0 ? ops[0].value : null;
  });

  constructor() {
    // Set default operation when propertyType changes and control has no value
    effect(() => {
      const defaultOp = this.defaultSelectedOperation();
      const currentValue = this.control().value;

      if (!currentValue && defaultOp) {
        this.control().setValue(defaultOp);
      }
    });
  }

  switchTab(type: CustomerEventPropertyType) {
    this._activeTab.set(type);
  }

  selectOperator(value: string) {
    this.control().setValue(value);
  }
}
