import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CustomerEvent } from '../../../../core/models/customer-events';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerFilterStepComponent } from '../customer-filter-step/customer-filter-step.component';
import { SeparatorComponent } from '../../../../shared/separator/separator.component';
import { CustomerFilterAttributeForm } from '../../../../core/models/customer-filter.form';
import { UpperCasePipe } from '@angular/common';
import { ButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-customer-filter-content',
  imports: [
    ReactiveFormsModule,
    CustomerFilterStepComponent,
    SeparatorComponent,
    UpperCasePipe,
    ButtonComponent,
  ],
  templateUrl: './customer-filter-content.component.html',
  styleUrl: './customer-filter-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterContentComponent {
  private formBuilder = inject(FormBuilder);

  customerEvents = input.required<CustomerEvent[]>();

  readonly addFunnelStepKey = '+ Add funnel step';
  readonly heading = 'customer filter';

  customerFilterForm = this.formBuilder.group({
    steps: this.formBuilder.array([
      this.formBuilder.group({
        event: this.formBuilder.nonNullable.control(''),
        attributes: this.formBuilder.array<FormGroup<CustomerFilterAttributeForm>>([]),
      }),
    ]),
  });

  constructor() {
    this.customerFilterForm.valueChanges.subscribe((value) => {
      console.log('Form value changed', value);
    });
    this.steps.valueChanges.subscribe((value) => {
      console.log('Steps changed:', value);
    });
  }

  get steps() {
    return this.customerFilterForm.controls.steps;
  }

  addStep() {
    const step = this.formBuilder.group({
      event: this.formBuilder.nonNullable.control(''),
      attributes: this.formBuilder.array<FormGroup<CustomerFilterAttributeForm>>([]),
    });

    this.steps.push(step);
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  discardFilters() {
    this.steps.clear({ emitEvent: false });
    this.steps.push(
      this.formBuilder.group({
        event: this.formBuilder.nonNullable.control(''),
        attributes: this.formBuilder.array<FormGroup<CustomerFilterAttributeForm>>([]),
      }),
    );
  }
}
