import { KeyValuePipe, NgClass, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ERROR_MESSAGES } from '../../constants/error-messages';
import { FormData } from '../../models/form-data.model';
import { getValidators } from '../../utils/getValidators';
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
  form!: FormGroup<any>;
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
    this.form = new FormGroup(formFields);
  };

  onSubmit = (): void => {
    console.log(this.form.value);
  };

  getErrorMessage = (controlName: string, errorKey: string, errorValue: string): string => {
    const message = this.errorMessages[errorKey];

    if (!message) {
      return 'Invalid field';
    }

    if (typeof message === 'function') {
      return message(errorValue);
    }

    return message;
  };
}
