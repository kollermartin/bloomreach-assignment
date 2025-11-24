import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { CustomerEvent } from '../../../../core/models/customer-events.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerFilterStepComponent } from '../customer-filter-step/customer-filter-step.component';
import { SeparatorComponent } from '../../../../shared/separator/separator.component';
import {
  CustomerFilterAttributeForm,
  CustomerFilterFormValue,
} from '../../../../core/models/customer-filter.form';
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
  applyFilters = output<FormGroup>();

  readonly addFunnelStepKey = '+ Add funnel step';
  readonly heading = 'customer filter';
  readonly applyFilterKey = 'Apply filters';

  customerFilterForm = this.formBuilder.group({
    steps: this.formBuilder.array([
      this.formBuilder.group({
        event: this.formBuilder.nonNullable.control(''),
        attributes: this.formBuilder.array<FormGroup<CustomerFilterAttributeForm>>([]),
      }),
    ]),
  });

  get steps() {
    return this.customerFilterForm.controls.steps;
  }

  addStep() {
    const step = this.emptyStep();

    this.steps.push(step);
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  copyStep(index: number) {
    const originalStep = this.steps.at(index);
    if (!originalStep) {
      return;
    }

    const stepValue = originalStep.value;
    const copiedStep = this.formBuilder.group({
      event: this.formBuilder.nonNullable.control(stepValue.event ?? ''),
      attributes: this.formBuilder.array(
        (stepValue.attributes || []).map((attr) =>
          this.formBuilder.group({
            property: this.formBuilder.control(attr.property ?? null),
            operator: this.formBuilder.control(attr.operator ?? null),
            value: this.formBuilder.control(attr.value ?? null),
          }),
        ),
      ),
    });

    this.steps.insert(index + 1, copiedStep);
  }

  discardFilters() {
    this.steps.clear();
    this.steps.push(this.emptyStep());
  }

  private emptyStep() {
    return this.formBuilder.group({
      event: this.formBuilder.nonNullable.control(''),
      attributes: this.formBuilder.array<FormGroup<CustomerFilterAttributeForm>>([]),
    });
  }

  onApplyFilters() {
    const formValue: CustomerFilterFormValue = this.customerFilterForm.getRawValue();
    console.log(formValue);
  }
}
