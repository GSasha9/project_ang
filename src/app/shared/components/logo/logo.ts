import { Component, input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
  readonly logo = input('');
}
