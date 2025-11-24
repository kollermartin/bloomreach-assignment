import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerFilterStepComponent } from './customer-filter-step.component';
import { FormBuilder } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CustomerFilterStepComponent', () => {
  let component: CustomerFilterStepComponent;
  let fixture: ComponentFixture<CustomerFilterStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFilterStepComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFilterStepComponent);

    const formBuilder = new FormBuilder();
    fixture.componentRef.setInput(
      'stepForm',
      formBuilder.group({
        event: formBuilder.nonNullable.control(''),
        attributes: formBuilder.array([]),
      }),
    );
    fixture.componentRef.setInput('index', 0);
    fixture.componentRef.setInput('customerEvents', []);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
