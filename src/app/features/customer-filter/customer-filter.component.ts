import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FilterEventsService } from '../../core/services/filter-events.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomerFilterContentComponent } from './components/customer-filter-content/customer-filter-content.component';

@Component({
  selector: 'app-customer-filter',
  imports: [CustomerFilterContentComponent],
  templateUrl: './customer-filter.component.html',
  styleUrl: './customer-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterComponent {
  private filterEventsService = inject(FilterEventsService);
  private formBuilder = inject(FormBuilder);

  filterEvents = toSignal(this.filterEventsService.getCustomerEvents());

  customerFilterForm = this.formBuilder.group({
    steps: this.formBuilder.array([
      this.formBuilder.group({
        event: this.formBuilder.nonNullable.control(''),
        attribute: this.formBuilder.control<string | null>(null),
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
      attribute: this.formBuilder.control<string | null>(null),
    });

    this.steps.push(step);
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  copyStep(index: number) {
    const stepValue = this.steps.controls[index].value;
    const copiedStep = this.formBuilder.group({
      event: this.formBuilder.nonNullable.control(stepValue.event || ''),
      attribute: this.formBuilder.control(stepValue.attribute ?? null),
    });
    this.steps.insert(index + 1, copiedStep);
  }

  discardFilters() {
    this.steps.clear({ emitEvent: false });
    this.steps.push(
      this.formBuilder.group({
        event: this.formBuilder.nonNullable.control(''),
        attribute: this.formBuilder.control<string | null>(null),
      }),
    );
  }
}
