import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { LoginData } from '@shared/models/login-data.model';
import { UserData } from '@shared/models/user-data.model';

export const selectRegisteredUsersState = createFeatureSelector<UserData[]>('usersRegister');
export const selectLoggedInUsersState = createFeatureSelector<LoginData[]>('usersLogIn');

export const selectUsersByEmail = (
  email: string,
): MemoizedSelector<object, UserData | undefined, (s1: UserData[]) => UserData | undefined> =>
  createSelector(selectRegisteredUsersState, (users) => users.find((user) => user.email === email));

export const selectLoggedUser = createSelector(selectLoggedInUsersState, (users) => users[0]);
