import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BooksService } from '@shared/services/books.service';
import { catchError, EMPTY, map, switchMap } from 'rxjs';

import { BooksAction } from './books.action';

@Injectable()
export class BooksEffect {
  private actions$ = inject(Actions);
  private bookService = inject(BooksService);

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksAction.load),
      switchMap(({ page }) =>
        this.bookService.getBooks(page).pipe(
          map((result) =>
            BooksAction.addBooks({
              data: {
                page: page,
                result: result,
              },
            }),
          ),
        ),
      ),
      catchError(() => EMPTY),
    );
  });
}
