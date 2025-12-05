import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  readonly hasArrow = input(false);
  readonly handler = input<() => void>();
}
