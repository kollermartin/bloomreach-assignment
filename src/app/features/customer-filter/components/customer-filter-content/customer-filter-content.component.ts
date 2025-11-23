import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CustomerEvent } from '../../../../core/models/customer-events';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CustomerFilterStepComponent } from '../customer-filter-step/customer-filter-step.component';

@Component({
  selector: 'app-customer-filter-content',
  imports: [ReactiveFormsModule, CustomerFilterStepComponent],
  templateUrl: './customer-filter-content.component.html',
  styleUrl: './customer-filter-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterContentComponent {
  private formBuilder = inject(FormBuilder);

  constructor() {
    this.customerFilterForm.valueChanges.subscribe((value) => {
      console.log('Form value changed', value);
    });
    this.steps.valueChanges.subscribe((value) => {
      console.log('Steps changed:', value);
    });
  }

  customerEvents = input.required<CustomerEvent[]>();

  customerFilterForm = this.formBuilder.group({
    steps: this.formBuilder.array([
      this.formBuilder.group({
        event: this.formBuilder.nonNullable.control(''),
      }),
    ]),
  });

  get steps() {
    return this.customerFilterForm.controls.steps;
  }
}
