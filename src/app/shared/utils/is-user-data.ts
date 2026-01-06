import { UserData } from '@shared/models/user-data.model';

export const isUserData = (data: unknown): data is UserData => {
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
