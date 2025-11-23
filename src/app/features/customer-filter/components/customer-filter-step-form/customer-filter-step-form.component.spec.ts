import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerFilterStepFormComponent } from './customer-filter-step-form.component';
import { FormBuilder } from '@angular/forms';

describe('CustomerFilterStepFormComponent', () => {
  let component: CustomerFilterStepFormComponent;
  let fixture: ComponentFixture<CustomerFilterStepFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFilterStepFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFilterStepFormComponent);
    component = fixture.componentInstance;

    const formBuilder = new FormBuilder();
    fixture.componentRef.setInput('stepForm', formBuilder.group({
      event: formBuilder.nonNullable.control(''),
      attributes: formBuilder.array([]),
    }));
    fixture.componentRef.setInput('customerEvents', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

