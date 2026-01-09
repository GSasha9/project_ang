import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Button } from '@shared/components/button/button';
import { Spinner } from '@shared/components/spinner/spinner';
import { APP_ROUTES } from '@shared/constants/app-routs';
import { BooksResponse } from '@shared/models/books-response';
import { LoaderService } from '@shared/services/loader.service';
import { getVisiblePages } from '@shared/utils/get-visible-pages';
import { BooksAction } from '@state/books/books.action';
import { booksFeature, selectBooksByPage } from '@state/books/books.feature';
import { filter, map, Observable, switchMap, tap } from 'rxjs';

import { BookCard } from './book-card/book-card';

@Component({
  selector: 'app-pricing',
  imports: [BookCard, AsyncPipe, CommonModule, Button, Spinner],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pricing implements OnInit {
  private router = inject(Router);
  private loaderService = inject(LoaderService);
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  isLoadingPage = this.loaderService.loading;

  isLoadingBooks$ = this.store.select(booksFeature.selectLoadingBooks);

  pages$!: Observable<number>;

  currentPageData$!: Observable<BooksResponse>;

  visiblePages$!: Observable<(number | '...')[]>;

  readonly section = viewChild<ElementRef>('cardContainer');

  ngOnInit(): void {
    const page$: Observable<number> = this.route.queryParams.pipe(
      map((params) => params['page'] || 1),
    );

    page$.subscribe((page) => {
      this.store.dispatch(BooksAction.load({ page: page }));
    });

    this.currentPageData$ = page$.pipe(
      tap((page) => this.store.dispatch(BooksAction.load({ page }))),
      switchMap((page) => this.store.select(selectBooksByPage(page))),
      filter(Boolean),
    );

    this.visiblePages$ = this.currentPageData$.pipe(
      map((data) => getVisiblePages(this.getCurrentPage(), data.count / data.results.length)),
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

  handleDownload = (event: MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  handleButtonDown = (): void => {
    window.scrollTo(0, this.section()!.nativeElement.scrollHeight);
  };
}
