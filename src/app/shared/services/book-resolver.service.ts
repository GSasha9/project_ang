import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  RedirectCommand,
  ResolveFn,
  Router,
} from '@angular/router';
import { catchError, of } from 'rxjs';

import { Book } from '../models/book.model';
import { BooksService } from './books.service';

export const BookResolver: ResolveFn<Book> = (
  route: ActivatedRouteSnapshot,
): MaybeAsync<Book | RedirectCommand> => {
  const service = inject(BooksService);
  const router = inject(Router);

  const bookId = route.paramMap.get('id')!;
  return service.getBookById(bookId).pipe(
    catchError(() => {
      return of(new RedirectCommand(router.parseUrl('/pricing')));
    }),
  );
};
