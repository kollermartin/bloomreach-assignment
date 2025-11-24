import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFilterAttributeFormComponent } from './customer-filter-attribute-form.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormBuilder } from '@angular/forms';

describe('CustomerFilterAttributeFormComponent', () => {
  let component: CustomerFilterAttributeFormComponent;
  let fixture: ComponentFixture<CustomerFilterAttributeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFilterAttributeFormComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFilterAttributeFormComponent);
    const formBuilder = new FormBuilder();
    fixture.componentRef.setInput(
      'attributeForm',
      formBuilder.group({
        property: formBuilder.control(null),
        operator: formBuilder.array([]),
        value: formBuilder.control(null),
      }),
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
