import { createActionGroup, props } from '@ngrx/store';

import { UserData } from '../shared/models/user-data.model';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    Register: props<{ data: UserData }>(),
    'Log in': props<{ email: string }>(),
    'Log out': props<{ email: string }>(),
  },
});
