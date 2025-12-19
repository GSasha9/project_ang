import { ValidationErrors } from '@angular/forms';

export const ERROR_MESSAGES: Record<
  string,
  string | ((error: ValidationErrors[keyof ValidationErrors]) => string)
> = {
  required: 'This field is required',
  minlength: (e: { requiredLength: number; actualLength: number }) =>
    `Minimum length is ${e.requiredLength}`,
  email: 'Invalid email address',
  userNotFound: 'User not found',
  loginSuccess: 'Successfully logged in',
  incorrectPassword: 'Incorrect password',
  userExists: 'User already exists',
  passwordsNotMatch: 'Passwords do not match',
  pleaseLogin: 'Please login',
};
