import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Form } from '@shared/components/form/form';
import { Notification } from '@shared/components/notification/notification';
import { ERROR_MESSAGES } from '@shared/constants/error-messages';
import { REGISTER_FORM_DATA } from '@shared/constants/register-form-data';
import { FormData } from '@shared/models/form-data.model';
import { NotificationService } from '@shared/services/notification.service';
import { UsersActions } from '@state/users.actions';
import { selectUsersByEmail } from '@state/users.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, Form, Notification],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private router = inject(Router);
  private notification = inject(NotificationService);
  private readonly store = inject(Store);
  readonly form = signal<FormGroup<any> | undefined>(undefined);
  formFields: FormData[] = [];

  constructor() {
    this.formFields = REGISTER_FORM_DATA;
  }

  handleRegister = (): void => {
    const userData = this.form()?.value;

    if (!userData) {
      throw new Error('No form data');
    }

    if (userData.password !== userData['repeat password']) {
      this.notification.show(ERROR_MESSAGES['passwordsNotMatch'] as string, 'alert-warning');
      return;
    }

    this.store
      .select(selectUsersByEmail(userData.email))
      .pipe(take(1))
      .subscribe((data) => {
        if (data) {
          this.notification.show(ERROR_MESSAGES['userExists'] as string, 'alert-danger');
          return;
        }

        this.store.dispatch(UsersActions.register({ data: userData }));

        this.notification.show(
          `${ERROR_MESSAGES['loginSuccess'] as string} ${ERROR_MESSAGES['pleaseLogin'] as string}`,
          'alert-success',
        );

        setTimeout(() => this.router.navigate(['/login']), 3000);
      });
  };
}
