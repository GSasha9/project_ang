import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '@shared/components/button/button';
import { Spinner } from '@shared/components/spinner/spinner';
import { APP_ROUTES } from '@shared/constants/app-routs';
import { Book } from '@shared/models/book.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-detailed-page',
  imports: [Button, Spinner],
  templateUrl: './detailed-page.html',
  styleUrls: ['./detailed-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedPage {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private readonly data = toSignal(this.activatedRoute.data);
  readonly book = computed(() => this.data()?.['book'] as Book | undefined);
  readonly showAllBooks = signal(this.activatedRoute.snapshot.queryParams['showAllBooks']);
  readonly bookImage = computed(() => this.book()?.formats?.['image/jpeg'] ?? '');
  readonly imageLoad = signal(true);
  readonly currentPage = input<BehaviorSubject<number>>();

  bookId: string | null = null;
  bookData$: Observable<Book> | null = null;

  onImageLoad = (): void => {
    this.imageLoad.set(false);
  };

  handleBackButton = (): void => {
    const page = this.activatedRoute.snapshot.queryParams['page'];
    this.router.navigate([APP_ROUTES.pricing], {
      queryParams: { page: page, showAllBooks: this.showAllBooks() },
      queryParamsHandling: 'merge',
    });
    this.bookId = null;
  };
}
