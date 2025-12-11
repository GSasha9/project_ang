import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Card } from '../../card/card';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BooksService } from '../../shared/services/books.service';

@Component({
  selector: 'app-pricing',
  imports: [Card, AsyncPipe, CommonModule],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pricing {
  private booksService = inject(BooksService);

  books$ = this.booksService.getBooks();
}
