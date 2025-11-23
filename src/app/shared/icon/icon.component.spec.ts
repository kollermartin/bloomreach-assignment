import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct icon path for delete type', () => {
    fixture.componentRef.setInput('type', 'delete');
    expect(component.iconPath).toBe('app/assets/icons/delete_icon.png');
  });

  it('should use default alt text when not provided', () => {
    fixture.componentRef.setInput('type', 'delete');
    const compiled = fixture.nativeElement;
    const img = compiled.querySelector('img');
    expect(img.alt).toBe('delete icon');
  });

  it('should use custom alt text when provided', () => {
    fixture.componentRef.setInput('type', 'delete');
    fixture.componentRef.setInput('alt', 'Custom delete');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const img = compiled.querySelector('img');
    expect(img.alt).toBe('Custom delete');
  });

  it('should use default size of 24 when not provided', () => {
    fixture.componentRef.setInput('type', 'delete');
    expect(component.size()).toBe(24);
  });

  it('should use custom size when provided', () => {
    fixture.componentRef.setInput('type', 'delete');
    fixture.componentRef.setInput('size', 32);
    expect(component.size()).toBe(32);
  });
});

