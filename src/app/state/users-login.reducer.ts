import { createReducer, on } from '@ngrx/store';

import { UsersActions } from './users.actions';

export const initialState: string[] = [];

export const usersLoginReducer = createReducer(
  initialState,
  on(UsersActions.logIn, (state, { email }) => {
    const exist = state.some((el) => el === email);

    if (exist) {
      return state;
    }

    return [...state, email];
  }),
  on(UsersActions.logOut, (state, { email }) => {
    return state.filter((el) => el !== email);
  }),
);
