import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Book } from '../../models/book.model';
import { Button } from '../button/button';

@Component({
  selector: 'app-card',
  imports: [Button],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly bookData = input<Book>();
  readonly handler = input<(id: number) => void>();

  cardHandler = (): void => {
    this.handler()?.(this.bookData()?.id || 1);
  };
}
