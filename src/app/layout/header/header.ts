import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { Button } from '../../shared/components/button/button';
import { Logo } from '../../shared/components/logo/logo';
import { Menu } from '../../shared/components/menu/menu';
import { APP_ROUTES } from '../../shared/constants/app-routs';
import { MENU_HEADER } from '../../shared/constants/menu-header';
import { MenuItems } from '../../shared/models/menuItems.model';
import { AuthService } from '../../shared/services/auth.service';

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
  private router = inject(Router);
  logoImage: string;
  menuItems: MenuItems[];
  readonly isMenuOpen = signal(false);

  auth = inject(AuthService);
  userName = this.auth.userName;

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
    if (this.currentUrl() === `/${APP_ROUTES.login}`) {
      this.router.navigate([APP_ROUTES.registration]);
    } else {
      this.router.navigate([APP_ROUTES.login]);
    }

    this.isMenuOpen.set(false);
  };

  logOutHandler = (): void => {
    this.auth.userName.set(null);
  };
}
