export type ReadBookResponse = {
  id: number;
  userId: number;
  bookId: number;
  user: object;
  book: {
    id: number;
    bookId: number;
  };
};
