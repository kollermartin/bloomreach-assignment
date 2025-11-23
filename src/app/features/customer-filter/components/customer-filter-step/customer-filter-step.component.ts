import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerFilterStepForm } from '../../../../core/models/customer-filter.form';
import { CustomerEvent } from '../../../../core/models/customer-events';
import { FilterSelectComponent } from '../../../../shared/filter-select/filter-select.component';

@Component({
  selector: 'app-customer-filter-step',
  imports: [ReactiveFormsModule, FilterSelectComponent, FilterSelectComponent],
  templateUrl: './customer-filter-step.component.html',
  styleUrl: './customer-filter-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterStepComponent {
  stepForm = input.required<FormGroup<CustomerFilterStepForm>>();
  index = input.required<number>();
  customerEvents = input.required<CustomerEvent[]>();

  removeStep = output();
  copyStep = output();

  readonly stepKey = 'Step';
  readonly emptyStepLabel = 'Unnamed step';
}
