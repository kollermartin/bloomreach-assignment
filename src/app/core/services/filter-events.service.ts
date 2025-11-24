import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerEvents } from '../models/customer-events.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterEventsService {
  httpClient = inject(HttpClient);

  private readonly path = 'https://br-fe-assignment.github.io/customer-events/events.json';

  getCustomerEvents(): Observable<CustomerEvents> {
    return this.httpClient.get<CustomerEvents>(this.path);
  }
}
