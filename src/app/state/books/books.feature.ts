import { createFeature, createReducer, createSelector, MemoizedSelector, on } from '@ngrx/store';
import { BooksResponse } from '@shared/models/books-response';

import { BooksAction } from './books.action';

type BookState = {
  entities: Record<number, BooksResponse>;
  loadingBooks: boolean;
};

const initialState: BookState = {
  entities: {},
  loadingBooks: false,
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
          loadingBooks: false,
        };
      }
      return {
        ...state,
        entities: {
          ...state.entities,
          [data.page]: data.result,
        },
        loadingBooks: false,
      };
    }),
  ),
});

export const selectBooksByPage = (
  page: number,
): MemoizedSelector<Record<number, BooksResponse>, BooksResponse> =>
  createSelector(booksFeature.selectBooksState, (state) => state.entities[page]);
