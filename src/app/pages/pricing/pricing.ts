import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
import { filter, firstValueFrom, map, Observable, shareReplay, switchMap, tap } from 'rxjs';

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

  isLoadingBooks$ = this.store
    .select(booksFeature.selectLoadingBooks)
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  readonly showAllBooks = toSignal(
    this.route.queryParams.pipe(
      map((params) => {
        const value = params['showAllBooks'];
        return value === undefined ? true : value === 'true';
      }),
    ),
    { initialValue: true },
  );

  readonly showAllBooksValue = signal(this.showAllBooks());

  pages$!: Observable<number>;

  currentPageData$!: Observable<BooksResponse>;

  visiblePages$!: Observable<(number | '...')[]>;

  selectedBooks$ = this.store.select(booksFeature.selectReadBooks);

  readonly section = viewChild<ElementRef>('cardContainer');

  ngOnInit(): void {
    const page$: Observable<number> = this.route.queryParams.pipe(
      map((params) => params['page'] || 1),
    );

    page$.subscribe((page) => {
      this.store.dispatch(BooksAction.load({ page: page }));
      shareReplay(1);
    });

    this.currentPageData$ = page$.pipe(
      tap((page) => this.store.dispatch(BooksAction.load({ page }))),
      switchMap((page) => this.store.select(selectBooksByPage(page))),
      filter(Boolean),
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
      queryParams: { page: this.getCurrentPage(), showAllBooks: this.showAllBooksValue() },
    });
  };

  handleReadButton = async (event: MouseEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    const button = event.currentTarget as HTMLButtonElement;

    if (!button) {
      return;
    }

    const selectedBookId = Number(button.closest('.card')?.getAttribute('data-cardId'));

    const pageData = await firstValueFrom(this.currentPageData$);

    const book = pageData.results.find((el) => el.id === selectedBookId);

    if (!book) {
      this.store.dispatch(BooksAction.removeFromRead({ bookId: selectedBookId }));
    } else {
      this.store.dispatch(BooksAction.markAsRead({ book }));
    }
  };

  handleButtonDown = (): void => {
    window.scrollTo(0, this.section()!.nativeElement.scrollHeight);
  };

  handleButtonRead = (): void => {
    this.showAllBooksValue.update((prev) => !prev);
  };
}
