import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, of, shareReplay, startWith, switchMap } from 'rxjs';

import { Card } from '../../card/card';
import { Button } from '../../shared/components/button/button';
import { Spinner } from '../../shared/components/spinner/spinner';
import { BooksResponse } from '../../shared/models/books-response';
import { BooksService } from '../../shared/services/books.service';

@Component({
  selector: 'app-pricing',
  imports: [Card, AsyncPipe, CommonModule, Button, Spinner],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pricing {
  private booksService = inject(BooksService);
  private router = inject(Router);

  currentPage$ = new BehaviorSubject<number>(1);

  currentPageData$ = this.currentPage$.pipe(
    switchMap((page) =>
      this.booksService.getBooks(page).pipe(
        map((res: BooksResponse) => ({ status: 'success', data: res.results }) as const),
        startWith({ status: 'loading' } as const),
        catchError(() => of({ status: 'error' } as const)),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  isLoading$ = this.currentPageData$.pipe(map((state) => state.status === 'loading'));

  nextPage = (): void => {
    this.currentPage$.next(this.currentPage$.value + 1);
  };

  prevPage = (): void => {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  };

  handleCardClick = (id: number): void => {
    this.router.navigate([`pricing/${id}`]);
  };
}
