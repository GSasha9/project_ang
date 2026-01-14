import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Spinner } from '@shared/components/spinner/spinner';
import { Book } from '@shared/models/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Spinner],
})
export class BookCard {
  readonly bookData = input<Book>();
  readonly handler = input<(id: number) => void>();
  readonly buttonHandler = input<(event: MouseEvent) => void>();
  readonly isSelected = input<boolean | undefined>(undefined);
  readonly imageLoad = signal(true);

  cardHandler = (): void => {
    this.handler()?.(this.bookData()?.id || 1);
  };

  onImgLoad = (): void => {
    this.imageLoad.set(false);
  };
}
