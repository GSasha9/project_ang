import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  readonly hasArrow = input<'right' | 'down' | null>(null);
  readonly handler = input<() => void>();
  readonly isDisabled = input<boolean | undefined>(undefined);
}
