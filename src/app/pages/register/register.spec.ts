import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';

import { Register } from './register';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [provideStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display validation error if required field is empty', () => {
    fixture.detectChanges();

    const nameField = fixture.debugElement.query(By.css('[data-testId="name"]'));

    nameField.nativeElement.focus();
    nameField.nativeElement.blur();

    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error');

    expect(errorMessage.textContent).toEqual('This field is required');
  });
});
