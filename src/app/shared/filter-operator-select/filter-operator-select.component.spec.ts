import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterOperatorSelectComponent } from './filter-operator-select.component';
import { FormControl } from '@angular/forms';

describe('FilterOperatorSelectComponent', () => {
  let component: FilterOperatorSelectComponent;
  let fixture: ComponentFixture<FilterOperatorSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterOperatorSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterOperatorSelectComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('control', new FormControl<string | null>(null));
    fixture.componentRef.setInput('propertyType', 'string');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

