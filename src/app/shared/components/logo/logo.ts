import { Component, input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Link } from '../link/link';

@Component({
  selector: 'app-logo',
  imports: [RouterLink, Link],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
  readonly logo = input('');
}
