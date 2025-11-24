import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperationSelect } from './operation-select.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('OperationSelectComponent', () => {
  let component: OperationSelect;
  let fixture: ComponentFixture<OperationSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationSelect],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(OperationSelect);
    fixture.componentRef.setInput('defaultPropertyType', 'string');
    component = fixture.componentInstance;


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
