import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { UserData } from '../shared/models/user-data.model';

export const selectRegisteredUsersState = createFeatureSelector<UserData[]>('usersRegister');

export const selectUsersByEmail = (
  email: string,
): MemoizedSelector<object, boolean, (s1: UserData[]) => boolean> =>
  createSelector(selectRegisteredUsersState, (users) => users.some((user) => user.email === email));
