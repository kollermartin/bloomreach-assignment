import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FilterEventsService } from '../../core/services/filter-events.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomerFilterHeaderComponent } from './components/customer-filter-header/customer-filter-header.component';
import { CustomerFilterContentComponent } from './components/customer-filter-content/customer-filter-content.component';
import { CustomerFilterStepForm } from '../../core/models/customer-filter.form';

@Component({
  selector: 'app-customer-filter',
  imports: [CustomerFilterHeaderComponent, CustomerFilterContentComponent],
  templateUrl: './customer-filter.component.html',
  styleUrl: './customer-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterComponent {
  private filterEventsService = inject(FilterEventsService);
  private formBuilder = inject(FormBuilder);

  discardSignal = signal(0);

  filterEvents = toSignal(this.filterEventsService.getCustomerEvents());

  customerFilterForm = this.formBuilder.group({
    steps: this.formBuilder.array([
      this.formBuilder.group({
        event: this.formBuilder.nonNullable.control(''),
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
    console.log(this.customerFilterForm.controls);
    return this.customerFilterForm.controls.steps;
  }

  addStep() {
    const step = this.formBuilder.group<CustomerFilterStepForm>({
      event: this.formBuilder.nonNullable.control(''),
    });

    this.steps.push(step);
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  discardFilters() {
    this.steps.clear({ emitEvent: false });
    this.steps.push(
      this.formBuilder.group<CustomerFilterStepForm>({
        event: this.formBuilder.nonNullable.control(''),
      }),
    );
    // Nasty workaround, because of zoneless and old angular forms
    // Clearing formArray won't trigger changeDetection lol because of steps getter. I should have used Angular 21 with signal forms.
    this.discardSignal.update((v) => v + 1);
  }
}
