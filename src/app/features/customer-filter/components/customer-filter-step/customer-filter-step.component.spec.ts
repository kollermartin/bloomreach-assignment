import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerFilterStepComponent } from './customer-filter-step.component';
import { FormBuilder } from '@angular/forms';

describe('CustomerFilterStepComponent', () => {
  let component: CustomerFilterStepComponent;
  let fixture: ComponentFixture<CustomerFilterStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFilterStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFilterStepComponent);
    component = fixture.componentInstance;

    const formBuilder = new FormBuilder();
    fixture.componentRef.setInput('stepForm', formBuilder.group({
      event: formBuilder.nonNullable.control(''),
    }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

