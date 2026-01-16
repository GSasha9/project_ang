import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Form } from '@shared/components/form/form';
import { Notification } from '@shared/components/notification/notification';
import { LOGIN_FORM_DATA } from '@shared/constants/login-form-data';
import { MESSAGES } from '@shared/constants/messages';
import { FormData } from '@shared/models/form-data.model';
import { UserData } from '@shared/models/user-data.model';
import { NotificationService } from '@shared/services/notification.service';
import { UsersActions } from '@state/users/users.actions';
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
  private actions$ = inject(Actions);
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

    const loginData: UserData = {
      name: name,
      email: userData['email']!,
      password: userData['password']!,
    };

    this.store.dispatch(UsersActions.logIn({ data: loginData }));

    this.actions$
      .pipe(ofType(UsersActions.logInSuccess, UsersActions.logInFailure), take(1))
      .subscribe((action) => {
        if ('err' in action) {
          const message =
            action.err.status === 401
              ? MESSAGES['incorrectPassword']
              : action.err.status === 404
                ? MESSAGES['userNotFound']
                : action.err.message;
          this.notification.show(message as string, 'alert-danger');
          return;
        } else {
          this.notification.show(MESSAGES['loginSuccess'] as string, 'alert-success');
          name = action.user.name;
          setTimeout(() => this.router.navigate(['/home']), 2000);
        }
      });
  };
}
