import { Person } from './person.model';

export type Book = {
  id: number;
  title: string;
  subjects: string[];
  authors: Person[];
  summaries: string[];
  bookshelves: string[];
  copyright: boolean | null;
  download_count: number;
  formats: string;
};
