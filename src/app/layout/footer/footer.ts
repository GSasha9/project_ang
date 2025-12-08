import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Logo } from '../../shared/components/logo/logo';
import { Menu } from '../../shared/components/menu/menu';
import { MenuItems } from '../../shared/models/menuItems.model';
import { MENU_FFOOTER_SOCIALS } from '../../shared/constants/menu-footer';

@Component({
  selector: 'app-footer',
  imports: [Logo, Menu],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  menuSocials: MenuItems[] = [];

  constructor() {
    this.menuSocials = MENU_FFOOTER_SOCIALS;
  }
}
