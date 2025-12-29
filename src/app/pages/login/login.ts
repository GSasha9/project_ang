import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Form } from '../../shared/components/form/form';
import { Notification } from '../../shared/components/notification/notification';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { LOGIN_FORM_DATA } from '../../shared/constants/login-form-data';
import { FormData } from '../../shared/models/form-data.model';
import { UserData } from '../../shared/models/user-data.model';
import { AuthService } from '../../shared/services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-login',
  imports: [Form, Notification],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private notification = inject(NotificationService);
  private router = inject(Router);
  private auth = inject(AuthService);
  readonly form = signal<FormGroup<any> | undefined>(undefined);
  formFields: FormData[] = [];
  user: UserData | null = null;

  constructor() {
    this.formFields = LOGIN_FORM_DATA;
  }

  handleSubmit = (): void => {
    const user = localStorage.getItem(this.form()?.value.email);
    if (!user) {
      this.notification.show(ERROR_MESSAGES['userNotFound'] as string, 'error');
      return;
    }

    const userData: UserData = JSON.parse(user);

    if (this.form()?.value.password === userData.password) {
      this.auth.userName.set(userData.name);

      this.notification.show(ERROR_MESSAGES['loginSuccess'] as string, 'success');

      setTimeout(() => this.router.navigate(['/home']), 2000);
    } else {
      this.notification.show(ERROR_MESSAGES['incorrectPassword'] as string, 'error');
    }
  };
}
