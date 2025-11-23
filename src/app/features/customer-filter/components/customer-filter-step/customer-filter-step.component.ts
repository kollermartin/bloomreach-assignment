import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomerFilterStepForm } from '../../../../core/models/customer-filter.form';
import { CustomerEvent } from '../../../../core/models/customer-events';
import { IconComponent } from '../../../../shared/icon/icon.component';
import { CustomerFilterStepFormComponent } from './components/customer-filter-step-form/customer-filter-step-form.component';

@Component({
  selector: 'app-customer-filter-step',
  imports: [
    IconComponent,
    CustomerFilterStepFormComponent,
  ],
  templateUrl: './customer-filter-step.component.html',
  styleUrl: './customer-filter-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterStepComponent {
  stepForm = input.required<FormGroup<CustomerFilterStepForm>>();
  index = input.required<number>();
  customerEvents = input.required<CustomerEvent[]>();

  removeStep = output();

  readonly stepKey = 'Step';
  readonly emptyStepLabel = 'Unnamed step';
}
