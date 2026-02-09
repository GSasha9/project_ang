import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReadBookResponse } from '@shared/models/read-book-response.model';
import { Observable, shareReplay } from 'rxjs';

import { BOOKS_API_BASE_URL } from '../constants/books-api-base-url';
import { Book } from '../models/book.model';
import { BooksResponse } from '../models/books-response';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private http = inject(HttpClient);
  books$ = this.http.get<BooksResponse>(BOOKS_API_BASE_URL).pipe(shareReplay(1));

  getBooks = (page: number): Observable<BooksResponse> => {
    const requestUrl = `${BOOKS_API_BASE_URL}?page=${page}`;

    return this.http.get<BooksResponse>(requestUrl).pipe(shareReplay(1));
  };

  getBookById = (id: string): Observable<Book> => {
    return this.http.get<Book>(`${BOOKS_API_BASE_URL}/${id}/`);
  };

  addReadBook = (data: { userId: number; book: Book }): Observable<ReadBookResponse> => {
    const editData = {
      userId: data.userId,
      bookId: data.book.id,
      book: {
        bookId: data.book.id,
        title: data.book.title,
        subjects: data.book.subjects,
        authors_birth_year: data.book.authors[0].birth_year,
        authors_death_year: data.book.authors[0].death_year,
        authors_name: [data.book.authors[0].name],
        summaries: data.book.summaries,
        bookshelves: data.book.bookshelves,
        copyright: data.book.copyright,
        download_count: data.book.download_count,
        formats: (typeof data.book.formats === 'object'
          ? data.book.formats['image/jpeg'] || ' '
          : ' '
        ).replace(/"/g, ''),
      },
    };
    const requestUrl = 'http://localhost:8083/rest/pricing';
    return this.http.post<ReadBookResponse>(requestUrl, editData);
  };

  getReadBooksByUserId = (id: number): Observable<ReadBookResponse[]> => {
    const requestUrl = 'http://localhost:8083/rest/pricing';
    return this.http.get<ReadBookResponse[]>(`${requestUrl}?userId=${id}`);
  };
}
