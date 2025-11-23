import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Signal,
  signal,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerFilterStepForm } from '../../../../../../core/models/customer-filter.form';
import { CustomerEvent, CustomerEventProperty } from '../../../../../../core/models/customer-events';
import { FilterSelectComponent } from '../../../../../../shared/filter-select/filter-select.component';
import { ButtonComponent } from '../../../../../../shared/button/button.component';

@Component({
  selector: 'app-customer-filter-step-form',
  imports: [ReactiveFormsModule, FilterSelectComponent, ButtonComponent],
  templateUrl: './customer-filter-step-form.component.html',
  styleUrl: './customer-filter-step-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterStepFormComponent {
  stepForm = input.required<FormGroup<CustomerFilterStepForm>>();
  customerEvents = input.required<CustomerEvent[]>();

  readonly addEventAttributeKey = '+ Add event attribute';

  selectedEvent = signal('');

  eventControl = computed(() => {
    return this.stepForm().controls.event;
  });

  attributeControl = computed(() => {
    return this.stepForm().controls.attribute;
  });

  addEventAttribute = () => {
    this.stepForm().controls.attribute.setValue('');
  };

  eventSelectChange = (event: string) => {
    console.log('Event called and setting', event);
    this.selectedEvent.set(event);
  };

  attributesList: Signal<CustomerEventProperty[]> = computed(() => {
    const type = this.selectedEvent();
    if (!type) return [];
    return this.customerEvents()
      .filter((ev) => ev.type === type)
      .flatMap((ev) => {
        const props = ev.properties;
        return Array.isArray(props) ? props : [props];
      });
  });
}

