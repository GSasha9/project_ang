import { RegisterForm } from '@shared/models/register-form.model';

export const isUserData = (data: unknown): data is RegisterForm => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    typeof data.name === 'string' &&
    'email' in data &&
    typeof data.email === 'string' &&
    'password' in data &&
    typeof data.password === 'string' &&
    'repeat password' in data &&
    typeof data['repeat password'] === 'string'
  );
};
