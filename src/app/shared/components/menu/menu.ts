import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { MenuItems } from '../../models/menuItems.model';
import { Link } from '../link/link';

@Component({
  selector: 'app-menu',
  imports: [NgClass, Link, NgStyle],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  readonly items = input<MenuItems[]>([]);
  readonly isRow = input<boolean>(true);
  readonly gap = input<string>('16');
  readonly customClass = input('');
  readonly routeActive = input(false);
  readonly clicked = output<MenuItems>();

  handleClick = (item: MenuItems): void => {
    this.clicked.emit(item);
  };
}
