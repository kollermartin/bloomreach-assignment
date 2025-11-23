import { ChangeDetectionStrategy, Component, computed, input, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerFilterStepForm } from '../../../../../../core/models/customer-filter.form';
import {
  CustomerEvent,
  CustomerEventProperty,
} from '../../../../../../core/models/customer-events';
import { FilterSelectComponent } from '../../../../../../shared/filter-select/filter-select.component';
import { ButtonComponent } from '../../../../../../shared/button/button.component';
import { IconComponent } from '../../../../../../shared/icon/icon.component';

@Component({
  selector: 'app-customer-filter-step-form',
  imports: [ReactiveFormsModule, FilterSelectComponent, ButtonComponent, IconComponent],
  templateUrl: './customer-filter-step-form.component.html',
  styleUrl: './customer-filter-step-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterStepFormComponent {
  stepForm = input.required<FormGroup<CustomerFilterStepForm>>();
  customerEvents = input.required<CustomerEvent[]>();

  selectedEvent = signal('');
  attributesCount = signal(0);
  eventLabelKey = 'Select an event';
  eventAttributeKey = 'Select an attribute'

  addAttributeKey = computed(() => {
    const count = this.attributesCount();
    return count > 0 ? 'Refine more' : '+ Add an event attribute';
  });

  eventControl = computed(() => {
    return this.stepForm().controls.event;
  });

  attributesControl = computed(() => {
    return this.stepForm().controls.attributes;
  });

  addEventAttribute = () => {
    const newControl = new FormControl<string | null>(null);
    this.attributesControl().push(newControl);
    this.attributesCount.set(this.attributesControl().length);
  };

  removeAttribute = (index: number) => {
    this.attributesControl().removeAt(index);
    this.attributesCount.set(this.attributesControl().length);
  };

  eventSelectChange = (event: string) => {
    console.log('Event called and setting', event);
    this.selectedEvent.set(event);
  };

  //TODO refactor this shit
  attributesListOptions: Signal<CustomerEventProperty[]> = computed(() => {
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
