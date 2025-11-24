import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFilterAttributeFormComponent } from './customer-filter-attribute-form.component';

describe('CustomerFilterAttributeFormComponent', () => {
  let component: CustomerFilterAttributeFormComponent;
  let fixture: ComponentFixture<CustomerFilterAttributeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFilterAttributeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFilterAttributeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
