import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

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
  router = inject(Router);

  readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      startWith(new NavigationEnd(0, this.router.url, this.router.url)),
      map((e) => (e as NavigationEnd).urlAfterRedirects),
    ),
  );

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

  buttonHandler = (): void => {
    if (this.currentUrl() === 'login') {
      this.router.navigate(['register']);
    } else {
      this.router.navigate(['login']);
    }
  };
}
