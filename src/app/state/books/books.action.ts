import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '@shared/models/book.model';
import { BooksResponse } from '@shared/models/books-response';

export const BooksAction = createActionGroup({
  source: '[Books API]',
  events: {
    load: props<{ page: number }>(),
    addBooks: props<{ data: { page: number; result: BooksResponse } }>(),
    markAsReadOne: props<{ book: Book }>(),
    markAsReadOneSuccess: emptyProps(),
    markAsReadMany: props<{ books: Book[] }>(),
    removeFromRead: props<{ bookId: number }>(),
  },
});
