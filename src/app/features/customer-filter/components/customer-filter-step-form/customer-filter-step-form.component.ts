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
import { filter, map, Observable, of, startWith, withLatestFrom } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { CustomerFilterAttributeFormComponent } from '../customer-filter-attribute-form/customer-filter-attribute-form.component';

@Component({
  selector: 'app-customer-filter-step-form',
  imports: [
    ReactiveFormsModule,
    FilterSelectComponent,
    ButtonComponent,
    AsyncPipe,
    CustomerFilterAttributeFormComponent,
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
  selectedCustomerEventValue$: Observable<string> = of('');
  attributeListOptions$: Observable<CustomerEventProperty[]> = of([]);

  readonly emptyAttributesKey = 'Add an event attribute';
  readonly addMoreAttributesKey = 'Refine more';

  addAttributeKey$: Observable<string> = of(this.emptyAttributesKey);

  customerEvents$ = toObservable(this.customerEvents);

  eventControl = computed(() => {
    return this.stepForm().controls.event;
  });

  get attributesFormArray() {
    return this.stepForm().controls.attributes;
  }

  ngOnInit() {
    this.initFormSubscriptions();
  }

  addEventAttribute() {
    const newAttributeGroup = this.formBuilder.group<CustomerFilterAttributeForm>({
      property: this.formBuilder.control<string | null>(null),
      operator: this.formBuilder.control<string | null>(null),
      value: this.formBuilder.control<string | number | null>(null),
    });
    this.attributesFormArray.push(newAttributeGroup);
  }

  removeAttribute(index: number) {
    this.attributesFormArray.removeAt(index);
  }

  private initFormSubscriptions() {
    this.selectedCustomerEventValue$ = this.stepForm().controls.event.valueChanges.pipe(
      startWith(this.eventControl().value),
      takeUntilDestroyed(this.destroyRef),
    );

    // Reset attributes when customer event changes
    this.stepForm()
      .controls.event.valueChanges.pipe(
        filter((value) => !!value),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.stepForm().controls.attributes.clear();
      });

    this.attributeListOptions$ = this.selectedCustomerEventValue$.pipe(
      withLatestFrom(this.customerEvents$),
      map(([type, customerEvents]) => {
        if (!type) {
          return [];
        }
        const event = customerEvents.find((ev) => ev.type === type);
        return event?.properties || [];
      }),
      takeUntilDestroyed(this.destroyRef),
    );

    this.addAttributeKey$ = this.stepForm().controls.attributes.valueChanges.pipe(
      startWith(this.stepForm().controls.attributes.value),
      map((attributes) => {
        return attributes.length ? this.addMoreAttributesKey : this.emptyAttributesKey;
      }),
      takeUntilDestroyed(this.destroyRef),
    );
  }
}
