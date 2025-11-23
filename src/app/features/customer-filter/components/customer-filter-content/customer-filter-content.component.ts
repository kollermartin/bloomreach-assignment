import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { CustomerEvent } from '../../../../core/models/customer-events';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerFilterStepComponent } from '../customer-filter-step/customer-filter-step.component';
import { SeparatorComponent } from '../../../../shared/separator/separator.component';
import { CustomerFilterForm } from '../../../../core/models/customer-filter.form';

@Component({
  selector: 'app-customer-filter-content',
  imports: [ReactiveFormsModule, CustomerFilterStepComponent, SeparatorComponent],
  templateUrl: './customer-filter-content.component.html',
  styleUrl: './customer-filter-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterContentComponent {
  customerEvents = input.required<CustomerEvent[]>();
  customerFilterForm = input.required<FormGroup<CustomerFilterForm>>();
  discardFiltersTrigger = input<number>();
  cdr = inject(ChangeDetectorRef);

  refreshComponentAfterDiscardAll = effect(() => {
    this.discardFiltersTrigger();
    this.cdr.markForCheck();
  });

  addStep = output();
  removeStep = output<number>();

  readonly addFunnelStepKey = 'Add funnel step';

  get steps() {
    return this.customerFilterForm().controls.steps;
  }
}
