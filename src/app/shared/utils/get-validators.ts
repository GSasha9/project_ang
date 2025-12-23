import { ValidationErrors, Validators } from '@angular/forms';

import { FormData } from '../models/form-data.model';

export const getValidators = (field: FormData): ValidationErrors | null => {
  const validators = [];

  if (field.isRequired) {
    validators.push(Validators.required);
  }

  if (field.minLength) {
    validators.push(Validators.minLength(field.minLength));
  }

  if (field.email) {
    validators.push(Validators.email);
  }

  return validators;
};
