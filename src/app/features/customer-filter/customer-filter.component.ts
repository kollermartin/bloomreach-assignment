import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FilterEventsService } from '../../core/services/filter-events.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-customer-filter',
  imports: [],
  templateUrl: './customer-filter.component.html',
  styleUrl: './customer-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterComponent {
  filterEventsService = inject(FilterEventsService);

  filterEvents = toSignal(this.filterEventsService.getCustomerEvents());
}
