import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperationSelect } from './operation-select.component';

describe('FilterOperatorSelectComponent', () => {
  let component: OperationSelect;
  let fixture: ComponentFixture<OperationSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(OperationSelect);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('propertyType', 'string');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

