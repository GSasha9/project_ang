import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, shareReplay, switchMap } from 'rxjs';

import { Button } from '../../shared/components/button/button';
import { Card } from '../../shared/components/card/card';
import { APP_ROUTES } from '../../shared/constants/app-routs';
import { BooksResponse } from '../../shared/models/books-response';
import { BooksService } from '../../shared/services/books.service';
import { LoaderService } from '../../shared/services/loader.service';
import { getVisiblePages } from '../../shared/utils/get-visible-pages';

@Component({
  selector: 'app-pricing',
  imports: [Card, AsyncPipe, CommonModule, Button],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pricing implements OnInit {
  private booksService = inject(BooksService);
  private router = inject(Router);
  private loaderService = inject(LoaderService);
  private route = inject(ActivatedRoute);

  isLoading = this.loaderService.loading;

  pages$!: Observable<number>;

  currentPageData$!: Observable<BooksResponse>;

  visiblePages$!: Observable<(number | '...')[]>;

  ngOnInit(): void {
    this.currentPageData$ = this.route.queryParams.pipe(
      map((params) => params['page'] || 1),
      switchMap((page) => this.booksService.getBooks(page)),

      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.visiblePages$ = this.currentPageData$.pipe(
      map((data) =>
        getVisiblePages(this.getCurrentPage(), Math.floor(data.count / data.results.length)),
      ),
    );
  }

  getCurrentPage = (): number => {
    return Number(this.route.snapshot.queryParams['page']) || 1;
  };

  navigateTo = (page: number, path?: string): void => {
    this.router.navigate(path ? [path] : [], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  };

  nextPage = (): void => {
    const page = this.getCurrentPage() + 1;
    this.navigateTo(page);
  };

  prevPage = (): void => {
    const page = this.getCurrentPage() - 1;

    if (page <= 0) {
      return;
    }

    this.navigateTo(page);
  };

  handleCardClick = (id: number): void => {
    this.router.navigate([`${APP_ROUTES.pricing}/${id}`], {
      queryParams: { page: this.getCurrentPage() },
    });
  };
}
