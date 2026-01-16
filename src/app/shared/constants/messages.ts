import { ValidationErrors } from '@angular/forms';

export const MESSAGES: Record<
  string,
  string | ((error: ValidationErrors[keyof ValidationErrors]) => string)
> = {
  required: 'This field is required',
  minlength: (e: { requiredLength: number; actualLength: number }) =>
    `Minimum length is ${e.requiredLength}`,
  email: 'Invalid email address',
  userNotFound: 'User not found',
  loginSuccess: 'Successfully logged in',
  loginFailure: 'Login failed. Please check your email or password',
  incorrectPassword: 'Incorrect password',
  userExists: 'User already exists',
  passwordsNotMatch: 'Passwords do not match',
  pleaseLogin: 'Please login',
  invalidField: 'Invalid field',
};
