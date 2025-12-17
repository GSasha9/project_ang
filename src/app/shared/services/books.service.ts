import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
    return this.http.get<Book>(`${BOOKS_API_BASE_URL}/${id}`);
  };
}
