import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Form } from '../../shared/components/form/form';
import { REGISTER_FORM_DATA } from '../../shared/constants/register-form-data';
import { FormData } from '../../shared/models/form-data.model';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, Form],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  formFields: FormData[] = [];

  constructor() {
    this.formFields = REGISTER_FORM_DATA;
  }
}
