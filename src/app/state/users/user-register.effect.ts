import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '@shared/services/users.service';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { UsersActions } from './users.actions';

@Injectable()
export class UserRegisterEffect {
  private userService = inject(UsersService);
  private actions$ = inject(Actions);

  user$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.register),
      exhaustMap((userData) => {
        return this.userService.createUser(userData.data).pipe(
          map((data) => {
            return UsersActions.registerSuccess({ data });
          }),
          catchError((err) => {
            const message = new HttpErrorResponse({
              statusText: err.error?.message || err.message || 'Unknown error',
            });
            return of(UsersActions.registerFailure({ err: message }));
          }),
        );
      }),
    );
  });
}
