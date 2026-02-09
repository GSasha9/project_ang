import { Book } from './book.model';

export type ReadBookResponse = {
  id: number;
  userId: number;
  bookId: number;
  user: object;
  book: Book;
};
