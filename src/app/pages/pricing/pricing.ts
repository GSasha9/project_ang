import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, shareReplay, switchMap } from 'rxjs';

import { Button } from '../../shared/components/button/button';
import { Card } from '../../shared/components/card/card';
import { BooksResponse } from '../../shared/models/books-response';
import { BooksService } from '../../shared/services/books.service';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-pricing',
  imports: [Card, AsyncPipe, CommonModule, Button],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pricing {
  private booksService = inject(BooksService);
  private router = inject(Router);
  private loaderService = inject(LoaderService);

  isLoading = this.loaderService.loading;

  currentPage$ = new BehaviorSubject<number>(1);

  currentPageData$ = this.currentPage$.pipe(
    switchMap((page) =>
      this.booksService
        .getBooks(page)
        .pipe(map((res: BooksResponse) => ({ data: res.results }) as const)),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

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

  handleBackButton = (): void => {
    this.router.navigate([`pricing`]);
  };
}
