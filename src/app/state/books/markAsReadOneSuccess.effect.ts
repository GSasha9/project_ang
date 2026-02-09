import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BooksService } from '@shared/services/books.service';
import { selectLoggedInUsersState } from '@state/users/users.selectors';
import { catchError, EMPTY, map, of, switchMap, withLatestFrom } from 'rxjs';

import { BooksAction } from './books.action';

@Injectable()
export class markAsReadOneSuccessEffect {
  actions$ = inject(Actions);
  bookService = inject(BooksService);
  store = inject(Store);

  markAsReadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksAction.markAsReadOne),
      withLatestFrom(this.store.select(selectLoggedInUsersState)),
      switchMap(([action, user]) => {
        const userId = user?.[0]?.id;

        if (!userId) {
          return of(BooksAction.markAsReadMany({ books: [action.book] }));
        }

        return this.bookService.addReadBook({ userId, book: action.book }).pipe(
          map(() => BooksAction.markAsReadOneSuccess()),
          catchError(() => EMPTY),
        );
      }),
    ),
  );
}
