import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Link } from '../../shared/components/link/link';

@Component({
  selector: 'app-not-found',
  imports: [Link],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {}
