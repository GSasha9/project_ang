import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Book } from '../../models/book.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly bookData = input<Book>();
  readonly handler = input<(id: number) => void>();
  readonly buttonHandler = input<(event: MouseEvent) => void>();

  cardHandler = (): void => {
    this.handler()?.(this.bookData()?.id || 1);
  };
}
