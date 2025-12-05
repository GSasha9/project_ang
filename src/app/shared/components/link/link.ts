import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-link',
  imports: [],
  templateUrl: './link.html',
  styleUrl: './link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Link {
  readonly linkRoute = input('');
}
