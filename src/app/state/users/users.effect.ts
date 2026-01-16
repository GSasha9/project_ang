import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '@shared/services/users.service';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { UsersActions } from './users.actions';

@Injectable()
export class UsersEffect {
  private actions$ = inject(Actions);
  private userService = inject(UsersService);

  userResponse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.logIn),
      exhaustMap((userData) => {
        return this.userService.getUserByEmail(userData.data.email).pipe(
          map((user) => {
            if (userData.data.password !== user.password) {
              const err = new HttpErrorResponse({
                status: 401,
                statusText: 'Incorrect password',
              });
              return UsersActions.logInFailure({ err });
            }

            return UsersActions.logInSuccess({ user });
          }),
          catchError((err) => of(UsersActions.logInFailure({ err }))),
        );
      }),
    );
  });
}
