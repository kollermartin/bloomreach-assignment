import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CustomerFilterComponent} from './features/customer-filter/customer-filter.component';

@Component({
  selector: 'app-root',
  imports: [CustomerFilterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
