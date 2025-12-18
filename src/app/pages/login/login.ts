import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Form } from '../../shared/components/form/form';
import { LOGIN_FORM_DATA } from '../../shared/constants/login-form-data';
import { FormData } from '../../shared/models/form-data.model';

@Component({
  selector: 'app-login',
  imports: [Form],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  formFields: FormData[] = [];

  constructor() {
    this.formFields = LOGIN_FORM_DATA;
  }
}
