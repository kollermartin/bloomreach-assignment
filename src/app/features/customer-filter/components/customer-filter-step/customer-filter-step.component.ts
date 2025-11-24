import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomerFilterStepForm } from '../../../../core/models/customer-filter.form';
import { CustomerEvent } from '../../../../core/models/customer-events';
import { IconComponent } from '../../../../shared/icon/icon.component';
import { CustomerFilterStepFormComponent } from '../customer-filter-step-form/customer-filter-step-form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable, of, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-customer-filter-step',
  imports: [IconComponent, CustomerFilterStepFormComponent, AsyncPipe],
  templateUrl: './customer-filter-step.component.html',
  styleUrl: './customer-filter-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterStepComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  stepForm = input.required<FormGroup<CustomerFilterStepForm>>();
  index = input.required<number>();
  customerEvents = input.required<CustomerEvent[]>();
  removeStep = output();
  copyStep = output();

  readonly stepKey = 'Step';
  readonly emptyStepLabel = 'Unnamed step';

  eventValue$: Observable<string> = of(this.emptyStepLabel);

  ngOnInit(): void {
    const eventControl = this.stepForm().controls.event;
    this.eventValue$ = eventControl.valueChanges.pipe(
      startWith(eventControl.value),
      map((event) => {
        return event || this.emptyStepLabel;
      }),
      takeUntilDestroyed(this.destroyRef),
    );
  }
}
