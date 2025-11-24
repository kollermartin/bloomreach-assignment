import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  CustomerFilterAttributeForm,
  CustomerFilterStepForm,
} from '../../../../core/models/customer-filter.form';
import { CustomerEvent, CustomerEventProperty } from '../../../../core/models/customer-events';
import { FilterSelectComponent } from '../../../../shared/filter-select/filter-select.component';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { IconComponent } from '../../../../shared/icon/icon.component';
import { FilterOperatorSelectComponent } from '../../../../shared/filter-operator-select/filter-operator-select.component';
import { map, Observable, of, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-customer-filter-step-form',
  imports: [
    ReactiveFormsModule,
    FilterSelectComponent,
    ButtonComponent,
    IconComponent,
    FilterOperatorSelectComponent,
    AsyncPipe,
  ],
  templateUrl: './customer-filter-step-form.component.html',
  styleUrl: './customer-filter-step-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterStepFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  stepForm = input.required<FormGroup<CustomerFilterStepForm>>();
  customerEvents = input.required<CustomerEvent[]>();

  eventLabelKey = 'Select an event';
  eventAttributeKey = 'Select an attribute';
  selectedCustomerEventValue$: Observable<string> = of('');
  attributeListOptions$: Observable<CustomerEventProperty[]> = of([]);

  readonly emptyAttributesKey = 'Add an event attribute';

  addAttributeKey$: Observable<string> = of(this.emptyAttributesKey);

  eventControl = computed(() => {
    return this.stepForm().controls.event;
  });

  attributesControl = computed(() => {
    return this.stepForm().controls.attributes;
  });

  ngOnInit() {
    this.initFormSubscriptions();
  }

  addEventAttribute() {
    const newAttributeGroup = this.formBuilder.group<CustomerFilterAttributeForm>({
      property: this.formBuilder.control<string | null>(null),
      operator: this.formBuilder.control<string | null>(null),
      value: this.formBuilder.control<string | number | null>(null),
    });
    this.attributesControl().push(newAttributeGroup);
  }

  removeAttribute(index: number) {
    this.attributesControl().removeAt(index);
  }

  private initFormSubscriptions() {
    this.selectedCustomerEventValue$ = this.stepForm().controls.event.valueChanges.pipe(
      startWith(this.eventControl().value),
      takeUntilDestroyed(this.destroyRef),
    );
    this.attributeListOptions$ = this.selectedCustomerEventValue$.pipe(
      map((type) => {
        if (!type) {
          return [];
        }

        const event = this.customerEvents().find((ev) => ev.type === type);
        return event?.properties || [];
      }),
      takeUntilDestroyed(this.destroyRef),
    );

    this.addAttributeKey$ = this.stepForm().controls.attributes.valueChanges.pipe(
      startWith(this.stepForm().controls.attributes.value),
      map((attributes) => {
        return attributes.length ? 'Refine more' : this.emptyAttributesKey;
      }),
      takeUntilDestroyed(this.destroyRef),
    );
  }
}
