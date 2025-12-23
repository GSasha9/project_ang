import { KeyValuePipe, NgClass, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ERROR_MESSAGES } from '../../constants/error-messages';
import { FormData } from '../../models/form-data.model';
import { getValidators } from '../../utils/get-validators';
import { Button } from '../button/button';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, TitleCasePipe, Button, NgClass, KeyValuePipe],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form implements OnInit {
  readonly formItems = input<FormData[]>([]);
  readonly buttonHandler = input<() => void>();
  readonly form = model<FormGroup<any>>();
  errorMessages = ERROR_MESSAGES;

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm = (): void => {
    const formFields: Record<string, FormControl> = {};
    this.formItems().forEach((el) => {
      const validators = getValidators(el);
      formFields[el.title] = new FormControl('', validators);
    });
    this.form.set(new FormGroup(formFields));
  };

  onSubmit = (): void => {
    this.buttonHandler()?.();
  };

  getErrorMessage = (controlName: string, errorKey: string, errorValue: string): string => {
    const message = this.errorMessages[errorKey];

    if (!message) {
      return ERROR_MESSAGES['Invalid field'] as string;
    }

    if (typeof message === 'function') {
      return message(errorValue);
    }

    return message;
  };
}
