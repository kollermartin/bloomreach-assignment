import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerFilterStepForm } from '../../../../core/models/customer-filter.form';

@Component({
  selector: 'app-customer-filter-step',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-filter-step.component.html',
  styleUrl: './customer-filter-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterStepComponent {
  stepForm = input.required<FormGroup<CustomerFilterStepForm>>();
  index = input.required<number>();

  readonly stepKey = 'Step';
  readonly emptyStepLabel = 'Unnamed step';
}
