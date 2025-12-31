import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Input } from '@shared/components/input/input';
import { Logo } from '@shared/components/logo/logo';
import { Menu } from '@shared/components/menu/menu';
import {
  MENU_FOOTER_COMPANY,
  MENU_FOOTER_SOCIALS,
  MENU_FOOTER_SUPPORT,
} from '@shared/constants/menu-footer';
import { MenuItems } from '@shared/models/menuItems.model';

@Component({
  selector: 'app-footer',
  imports: [Logo, Menu, Input],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  menuSocials: MenuItems[];
  menuCompany: MenuItems[];
  menuSupport: MenuItems[];
  menuSocialsClass: string;

  constructor() {
    this.menuSocials = MENU_FOOTER_SOCIALS;
    this.menuCompany = MENU_FOOTER_COMPANY;
    this.menuSupport = MENU_FOOTER_SUPPORT;
    this.menuSocialsClass = 'socials';
  }
}
