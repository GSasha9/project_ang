import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, props } from '@ngrx/store';
import { UserData } from '@shared/models/user-data.model';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    Register: props<{ data: UserData }>(),
    'Register success': props<{ data: UserData }>(),
    'Register failure': props<{ err: HttpErrorResponse }>(),
    'Log in': props<{ data: UserData }>(),
    'Log in success': props<{ user: UserData }>(),
    'Log in failure': props<{ err: HttpErrorResponse }>(),
    'Log out': props<{ data: UserData }>(),
  },
});
