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
import { filter, map, Observable, of, withLatestFrom } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-customer-filter-attribute-form',
  imports: [
    FilterOperatorSelectComponent,
    FilterSelectComponent,
    IconComponent,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './customer-filter-attribute-form.component.html',
  styleUrl: './customer-filter-attribute-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterAttributeFormComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  attributeForm = input.required<FormGroup<CustomerFilterAttributeForm>>();
  attributeListOptions = input<CustomerEventProperty[]>();

  attributeListMap = computed(() => {
    const attributeListOptions = this.attributeListOptions();
    if (!attributeListOptions) {
      return {};
    }

    return attributeListOptions.reduce(
      (acc, curr) => {
        acc[curr.property] = curr;
        return acc;
      },
      {} as Record<string, CustomerEventProperty>,
    );
  });

  removeAttribute = output();

  readonly eventAttributeKey = 'Select an attribute';

  attributeProperty$: Observable<string | null> = of(null);
  attributeType$: Observable<CustomerEventPropertyType> = of('string');
  attributeListMap$ = toObservable(this.attributeListMap);

  ngOnInit() {
    this.attributeProperty$ = this.attributeForm().controls.property.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
    );

    this.attributeType$ = this.attributeProperty$.pipe(
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
  }
}
