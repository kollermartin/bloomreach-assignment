import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-customer-filter-header',
  imports: [UpperCasePipe],
  templateUrl: './customer-filter-header.component.html',
  styleUrl: './customer-filter-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterHeaderComponent {
  discardFilters = output();

  readonly heading = 'customer filter';
}
