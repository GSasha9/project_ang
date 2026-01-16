import { createReducer, on } from '@ngrx/store';
import { UserData } from '@shared/models/user-data.model';

import { UsersActions } from './users.actions';

export const initialState: UserData[] = [];

export const userLoginReducer = createReducer(
  initialState,
  on(UsersActions.logInSuccess, (state, { user }) => {
    const exist = state.some((el) => el.email === user.email);

    if (exist) {
      return state;
    }

    return [...state, user];
  }),
  on(UsersActions.logOut, (state, { data }) => {
    return state.filter((el) => el.email !== data.email);
  }),
);
