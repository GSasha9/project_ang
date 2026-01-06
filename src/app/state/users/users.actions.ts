import { createActionGroup, props } from '@ngrx/store';
import { LoginData } from '@shared/models/login-data.model';
import { UserData } from '@shared/models/user-data.model';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    Register: props<{ data: UserData }>(),
    'Log in': props<{ data: LoginData }>(),
    'Log out': props<{ data: LoginData }>(),
  },
});
