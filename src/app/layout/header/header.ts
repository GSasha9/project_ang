import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Button } from '../../shared/components/button/button';
import { Logo } from '../../shared/components/logo/logo';
import { Menu } from '../../shared/components/menu/menu';
import { MENU_HEADER } from '../../shared/constants/menu-header';
import { MenuItems } from '../../shared/models/menuItems.model';

@Component({
  selector: 'app-header',
  imports: [Logo, Menu, Button, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'handleResize()',
  },
})
export class Header {
  logoImage: string;
  menuItems: MenuItems[];
  readonly isMenuOpen = signal(false);

  constructor() {
    this.logoImage = 'logo.svg';
    this.menuItems = MENU_HEADER;
  }

  handleMenu = (): void => {
    this.isMenuOpen.set(!this.isMenuOpen());
  };

  handleResize = (): void => {
    this.isMenuOpen.set(false);
  };
}
