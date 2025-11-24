import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { FilterOperatorSelectComponent } from '../../../../shared/filter-operator-select/filter-operator-select.component';
import { FilterSelectComponent } from '../../../../shared/filter-select/filter-select.component';
import { IconComponent } from '../../../../shared/icon/icon.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerFilterAttributeForm } from '../../../../core/models/customer-filter.form';
import {
  CustomerEventProperty,
  CustomerEventPropertyType,
} from '../../../../core/models/customer-events';
import { filter, map, Observable, of, startWith, withLatestFrom } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { getOperatorType } from '../../../../core/utils/filter-operator.utils';
import { buildAttributeListMap } from '../../../../core/utils/customer-attribute.utils';
import { InputComponent } from '../../../../shared/input/input.component';
import { filterOperations } from '../../../../core/enums/filter-operations';

@Component({
  selector: 'app-customer-filter-attribute-form',
  imports: [
    FilterOperatorSelectComponent,
    FilterSelectComponent,
    IconComponent,
    ReactiveFormsModule,
    AsyncPipe,
    InputComponent,
  ],
  templateUrl: './customer-filter-attribute-form.component.html',
  styleUrl: './customer-filter-attribute-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterAttributeFormComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  attributeForm = input.required<FormGroup<CustomerFilterAttributeForm>>();
  attributeListOptions = input<CustomerEventProperty[]>();

  attributeListMap = computed(() => buildAttributeListMap(this.attributeListOptions()));

  removeAttribute = output();

  readonly eventAttributeKey = 'Select an attribute';
  readonly selectValueKey = 'Select a value';
  readonly filterOperations = filterOperations;

  attributeProperty$: Observable<string | null> = of(null);
  attributeTypeByProperty$: Observable<CustomerEventPropertyType> = of('string');
  attributeTypeBySelectedOperator$: Observable<CustomerEventPropertyType> = of('string');
  attributeSelectedOperator$: Observable<string | null> = of(null);
  attributeListMap$ = toObservable(this.attributeListMap);

  ngOnInit() {
    this.attributeProperty$ = this.attributeForm().controls.property.valueChanges.pipe(
      startWith(this.attributeForm().controls.property.value),
      takeUntilDestroyed(this.destroyRef),
    );

    this.attributeSelectedOperator$ = this.attributeForm().controls.operator.valueChanges.pipe(
      startWith(this.attributeForm().controls.operator.value),
      takeUntilDestroyed(this.destroyRef),
    );

    this.attributeTypeByProperty$ = this.attributeProperty$.pipe(
      filter((value) => !!value),
      withLatestFrom(this.attributeListMap$),
      map(([attributeProperty, attributeListMap]) => {
        if (!attributeProperty) {
          return 'string';
        }
        return attributeListMap[attributeProperty]?.type ?? 'string';
      }),
      takeUntilDestroyed(this.destroyRef),
    );

    this.attributeTypeBySelectedOperator$ = this.attributeSelectedOperator$.pipe(
      filter((value) => !!value),
      map((operator) => getOperatorType(operator)),
      takeUntilDestroyed(this.destroyRef),
    );
  }
}
