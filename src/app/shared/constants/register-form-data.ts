import { FormData } from '../models/form-data.model';

export const REGISTER_FORM_DATA: FormData[] = [
  {
    title: 'name',
    isRequired: true,
    minLength: 4,
  },
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
  {
    title: 'repeat password',
    isRequired: true,
    minLength: 4,
  },
];
