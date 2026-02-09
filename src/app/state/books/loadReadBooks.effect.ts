import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BooksService } from '@shared/services/books.service';
import { selectLoggedInUsersState } from '@state/users/users.selectors';
import { catchError, EMPTY, map, switchMap, withLatestFrom } from 'rxjs';

import { BooksAction } from './books.action';

@Injectable()
export class LoadReadBooksEffect {
  private actions$ = inject(Actions);
  private bookService = inject(BooksService);
  private store = inject(Store);

  markedBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksAction.load, BooksAction.markAsReadOneSuccess),
      withLatestFrom(this.store.select(selectLoggedInUsersState)),
      switchMap(([, user]) => {
        const userId = user?.[0]?.id;

        if (!userId) {
          return EMPTY;
        }

        return this.bookService.getReadBooksByUserId(userId).pipe(
          map((data) => {
            console.log('from readBookEffect', data);
            return BooksAction.markAsReadMany({
              books: data.map((item) => item.book).filter(Boolean),
            });
          }),
          catchError(() => EMPTY),
        );
      }),
    );
  });
}
