import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-link',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './link.html',
  styleUrl: './link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Link {
  readonly linkRoute = input('');
  readonly isRouteActive = input<boolean>();
}
