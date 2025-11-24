import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FilterEventsService } from './filter-events.service';

describe('FilterEventsService', () => {
  let service: FilterEventsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(FilterEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HttpClient.get with correct URL', () => {
    const expectedUrl = 'https://br-fe-assignment.github.io/customer-events/events.json';
    httpClientSpy.get.and.returnValue({} as never);
    service.getCustomerEvents();
    expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl);
  });
});
