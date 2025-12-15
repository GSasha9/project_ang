import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Book } from '../shared/models/book.model';
import { Button } from '../shared/components/button/button';

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
