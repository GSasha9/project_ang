import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form } from './form';

describe('Form', () => {
  let component: Form;
  let fixture: ComponentFixture<Form>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Form],
    }).compileComponents();

    fixture = TestBed.createComponent(Form);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls buttonHandler when submit', () => {
    const mockButtonHandler = vi.spyOn(component, 'buttonHandler');

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');

    expect(button).toBeDefined();

    button.click();

    expect(mockButtonHandler).toHaveBeenCalled();
  });

  it('method getErrorMessage works correctly', () => {
    component.errorMessages = {
      email: 'Invalid email address',
      minlength: (): string => 'minLength',
    };
    const message = component.getErrorMessage('email', 'email', 'email');
    const message2 = component.getErrorMessage('password', 'minlength', '123');

    expect(message).toEqual('Invalid email address');
    expect(message2).toEqual('minLength');
  });
});
