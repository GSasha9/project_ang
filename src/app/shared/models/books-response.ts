import { Book } from './book.model';

export type BooksResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
};
