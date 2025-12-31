import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Button } from '@shared/components/button/button';
import { Logo } from '@shared/components/logo/logo';
import { Menu } from '@shared/components/menu/menu';
import { APP_ROUTES } from '@shared/constants/app-routs';
import { MENU_HEADER } from '@shared/constants/menu-header';
import { MenuItems } from '@shared/models/menuItems.model';
import { UsersActions } from '@state/users.actions';
import { selectLoggedUser } from '@state/users.selectors';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [Logo, Menu, Button],
  templateUrl: './header.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private router = inject(Router);
  private readonly store = inject(Store);
  logoImage: string;
  menuItems: MenuItems[];

  readonly user = toSignal(this.store.select(selectLoggedUser).pipe(map((user) => user)));

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

  buttonHandler = (): void => {
    if (this.currentUrl() === `/${APP_ROUTES.login}`) {
      this.router.navigate([APP_ROUTES.registration]);
    } else {
      this.router.navigate([APP_ROUTES.login]);
    }
  };

  logOutHandler = (): void => {
    const user = this.user();
    if (!user) {
      return;
    }

    this.store.dispatch(UsersActions.logOut({ data: user }));
  };
}
