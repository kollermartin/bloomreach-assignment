import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

  filterEvents = toSignal(this.filterEventsService.getCustomerEvents());
}
