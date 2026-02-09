import { createFeature, createReducer, createSelector, MemoizedSelector, on } from '@ngrx/store';
import { Book } from '@shared/models/book.model';
import { BooksResponse } from '@shared/models/books-response';

import { BooksAction } from './books.action';

type BookState = {
  entities: Record<number, BooksResponse>;
  loadingBooks: boolean;
  readBooks: Book[];
};

const initialState: BookState = {
  entities: {},
  loadingBooks: false,
  readBooks: [],
};

export const booksFeature = createFeature({
  name: 'Books',
  reducer: createReducer(
    initialState,
    on(BooksAction.load, (state) => ({ ...state, loadingBooks: true })),
    on(BooksAction.addBooks, (state, { data }) => {
      if (state.entities[data.page]) {
        return {
          ...state,
          readBooks: [...state.readBooks],
          loadingBooks: false,
        };
      }
      return {
        ...state,
        readBooks: [...state.readBooks],
        entities: {
          ...state.entities,
          [data.page]: data.result,
        },
        loadingBooks: false,
      };
    }),
    on(BooksAction.markAsReadOne, (state, { book }) => {
      console.log('state from read One', state);
      const existBook =
        state.readBooks.length > 0 ? state.readBooks.find((el) => el.id === book.id) : null;
      if (existBook) {
        return state;
      } else {
        return {
          ...state,
          readBooks: [...state.readBooks, book],
        };
      }
    }),
    on(BooksAction.markAsReadMany, (state, { books }) => {
      const merged = [
        ...state.readBooks,
        ...books.filter((b) => !state.readBooks.some((rb) => rb.id === b.id)),
      ];

      return {
        ...state,
        readBooks: merged,
      };
    }),
    on(BooksAction.removeFromRead, (state, { bookId }) => {
      return {
        ...state,
        readBooks: [...state.readBooks.filter((el) => el.id !== bookId)],
      };
    }),
  ),
});

export const selectBooksByPage = (
  page: number,
): MemoizedSelector<Record<number, BooksResponse>, BooksResponse> =>
  createSelector(booksFeature.selectBooksState, (state) => state.entities[page]);
