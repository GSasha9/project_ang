import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Form } from '@shared/components/form/form';
import { Notification } from '@shared/components/notification/notification';
import { ERROR_MESSAGES } from '@shared/constants/error-messages';
import { LOGIN_FORM_DATA } from '@shared/constants/login-form-data';
import { FormData } from '@shared/models/form-data.model';
import { LoginData } from '@shared/models/login-data.model';
import { UserData } from '@shared/models/user-data.model';
import { NotificationService } from '@shared/services/notification.service';
import { UsersActions } from '@state/users/users.actions';
import { selectUsersByEmail } from '@state/users/users.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [Form, Notification],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private notification = inject(NotificationService);
  private router = inject(Router);
  private store = inject(Store);
  readonly form = signal<FormGroup<Record<string, FormControl<string>>> | undefined>(undefined);
  formFields: FormData[] = [];
  user: UserData | null = null;

  constructor() {
    this.formFields = LOGIN_FORM_DATA;
  }

  handleSubmit = (): void => {
    const userData = this.form()?.value;
    let name = '';

    if (!userData) {
      throw new Error('No form data');
    }

    this.store
      .select(selectUsersByEmail(userData['email']!))
      .pipe(take(1))
      .subscribe((data) => {
        if (!data) {
          this.notification.show(ERROR_MESSAGES['userNotFound'] as string, 'alert-danger');
          return;
        } else if (data && data.password !== userData['password']!) {
          this.notification.show(ERROR_MESSAGES['incorrectPassword'] as string, 'alert-danger');
          return;
        } else {
          name = data.name;
        }

        const loginData: LoginData = {
          email: userData['email']!,
          name: name,
        };

        this.store.dispatch(UsersActions.logIn({ data: loginData }));

        this.notification.show(ERROR_MESSAGES['loginSuccess'] as string, 'alert-success');

        setTimeout(() => this.router.navigate(['/home']), 2000);
      });
  };
}
