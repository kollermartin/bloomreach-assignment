import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  Signal,
  signal,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerFilterStepForm } from '../../../../core/models/customer-filter.form';
import { CustomerEvent, CustomerEventProperty } from '../../../../core/models/customer-events';
import { FilterSelectComponent } from '../../../../shared/filter-select/filter-select.component';
import { ButtonComponent } from '../../../../shared/button/button.component';
import {IconComponent} from '../../../../shared/icon/icon.component';

@Component({
  selector: 'app-customer-filter-step',
  imports: [
    ReactiveFormsModule,
    FilterSelectComponent,
    FilterSelectComponent,
    ButtonComponent,
    IconComponent,
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

  //TODO Look how to better refactor this
  attributesList: Signal<CustomerEventProperty[]> = computed(() => {
    const type = this.selectedEvent();
    if (!type) return [];
    return this.customerEvents()
      .filter((ev) => ev.type === type)
      .flatMap((ev) => {
        const props = (ev as any).properties;
        return Array.isArray(props) ? props : [props];
      });
  });
}
