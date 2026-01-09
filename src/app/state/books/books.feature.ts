import { createFeature, createReducer, createSelector, MemoizedSelector, on } from '@ngrx/store';
import { BooksResponse } from '@shared/models/books-response';

import { BooksAction } from './books.action';

const initialState: Record<number, BooksResponse> = {};

export const booksFeature = createFeature({
  name: 'Books',
  reducer: createReducer(
    initialState,
    on(BooksAction.load, (state) => ({ ...state })),
    on(BooksAction.addBooks, (state, { data }) => {
      if (state[data.page]) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        [data.page]: data.result,
      };
    }),
  ),
});

export const selectBooksByPage = (
  page: number,
): MemoizedSelector<Record<number, BooksResponse>, BooksResponse> =>
  createSelector(booksFeature.selectBooksState, (state) => state[page]);
