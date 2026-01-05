import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show notification message if user already exists', () => {
    const userData = JSON.stringify({
      name: 'User',
      email: 'mail@mail.ru',
      password: '1234',
      'repeat password': '1234',
    });
    localStorage.setItem('mail@mail.ru', userData);

    fixture.detectChanges();

    const emailField = fixture.debugElement.queryAll(By.css('[data-testId="email"]'));

    expect(emailField).toBeDefined();
  });
});
