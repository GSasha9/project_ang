import { createReducer, on } from '@ngrx/store';
import { LoginData } from '@shared/models/login-data.model';

import { UsersActions } from './users.actions';

export const initialState: LoginData[] = [];

export const userLoginReducer = createReducer(
  initialState,
  on(UsersActions.logIn, (state, { data }) => {
    const exist = state.some((el) => el.email === data.email);

    if (exist) {
      return state;
    }

    return [...state, data];
  }),
  on(UsersActions.logOut, (state, { data }) => {
    return state.filter((el) => el.email !== data.email);
  }),
);
