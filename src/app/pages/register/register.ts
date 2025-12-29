import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Form } from '../../shared/components/form/form';
import { Notification } from '../../shared/components/notification/notification';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { REGISTER_FORM_DATA } from '../../shared/constants/register-form-data';
import { FormData } from '../../shared/models/form-data.model';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, Form, Notification],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private router = inject(Router);
  private notification = inject(NotificationService);
  readonly form = signal<FormGroup<any> | undefined>(undefined);
  formFields: FormData[] = [];

  constructor() {
    this.formFields = REGISTER_FORM_DATA;
  }

  handleRegister = (): void => {
    if (localStorage.key(this.form()?.value.email)) {
      this.notification.show(ERROR_MESSAGES['userExists'] as string, 'error');
      return;
    }

    if (this.form()?.value.password !== this.form()?.value['repeat password']) {
      this.notification.show(ERROR_MESSAGES['passwordsNotMatch'] as string, 'warning');
      return;
    }

    const user = JSON.stringify(this.form()?.value);
    localStorage.setItem(this.form()?.value.email, user);

    this.notification.show(
      `${ERROR_MESSAGES['loginSuccess'] as string} ${ERROR_MESSAGES['pleaseLogin'] as string}`,
      'success',
    );

    setTimeout(() => this.router.navigate(['/login']), 3000);
  };
}
