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
    on(BooksAction.markAsRead, (state, { book }) => {
      const existBook = state.readBooks.find((el) => el.id === book.id);

      if (existBook) {
        return {
          ...state,
          readBooks: [...state.readBooks.filter((el) => el.id !== book.id)],
        };
      } else {
        return {
          ...state,
          readBooks: [...state.readBooks, book],
        };
      }
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
