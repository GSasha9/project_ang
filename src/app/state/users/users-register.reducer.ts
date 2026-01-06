import { createReducer, on } from '@ngrx/store';
import { UserData } from '@shared/models/user-data.model';

import { UsersActions } from './users.actions';

export const initialState: UserData[] = [];

export const usersRegisterReducer = createReducer(
  initialState,
  on(UsersActions.register, (state, { data }) => {
    const exist = state.some((el) => el.email === data.email);

    if (exist) {
      return state;
    }

    return [...state, data];
  }),
);
