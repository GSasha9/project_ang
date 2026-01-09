import { createActionGroup, props } from '@ngrx/store';
import { BooksResponse } from '@shared/models/books-response';

export const BooksAction = createActionGroup({
  source: '[Books API]',
  events: {
    load: props<{ page: number }>(),
    addBooks: props<{ data: { page: number; result: BooksResponse } }>(),
  },
});
