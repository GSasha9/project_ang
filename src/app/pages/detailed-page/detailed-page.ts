import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Button } from '../../shared/components/button/button';
import { APP_ROUTES } from '../../shared/constants/app-routs';
import { Book } from '../../shared/models/book.model';

@Component({
  selector: 'app-detailed-page',
  imports: [Button],
  templateUrl: './detailed-page.html',
  styleUrls: ['./detailed-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedPage {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private readonly data = toSignal(this.activatedRoute.data);
  readonly books = computed(() => this.data()?.['book'] as Book | undefined);
  readonly bookImage = computed(() => this.books()?.formats?.['image/jpeg'] ?? '');

  bookId: string | null = null;
  bookData$: Observable<Book> | null = null;

  handleBackButton = (): void => {
    this.router.navigate([APP_ROUTES.pricing]);
    this.bookId = null;
  };
}
