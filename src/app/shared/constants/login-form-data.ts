import { FormData } from '../models/form-data.model';

export const LOGIN_FORM_DATA: FormData[] = [
  {
    title: 'email',
    isRequired: true,
    email: true,
  },
  {
    title: 'password',
    isRequired: true,
    minLength: 4,
  },
];
