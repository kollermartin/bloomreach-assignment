import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFilterContentComponent } from './customer-filter-content.component';

describe('CustomerFilterContentComponent', () => {
  let component: CustomerFilterContentComponent;
  let fixture: ComponentFixture<CustomerFilterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFilterContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFilterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
