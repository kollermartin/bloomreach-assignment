import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFilterContentComponent } from './customer-filter-content.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CustomerFilterContentComponent', () => {
  let component: CustomerFilterContentComponent;
  let fixture: ComponentFixture<CustomerFilterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFilterContentComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFilterContentComponent);
    fixture.componentRef.setInput('customerEvents', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
