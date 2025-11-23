import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFilterHeaderComponent } from './customer-filter-header.component';

describe('CustomerFilterHeaderComponent', () => {
  let component: CustomerFilterHeaderComponent;
  let fixture: ComponentFixture<CustomerFilterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFilterHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFilterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
