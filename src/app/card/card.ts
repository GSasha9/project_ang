import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Button } from '../shared/components/button/button';
import { Book } from '../shared/models/book.model';

@Component({
  selector: 'app-card',
  imports: [Button],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly bookData = input<Book>();
}
