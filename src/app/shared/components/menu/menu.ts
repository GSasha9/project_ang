import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MenuItems } from '../../models/menuItems.model';
import { NgClass } from '@angular/common';
import { Link } from '../link/link';

@Component({
  selector: 'app-menu',
  imports: [NgClass, Link],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  readonly items = input<MenuItems[]>([]);
  readonly isRow = input<boolean>(true);
  readonly gap = input<string>('16');

  classes = (): Record<string, boolean> => {
    return {
      column: !this.isRow(),
    };
  };
}
