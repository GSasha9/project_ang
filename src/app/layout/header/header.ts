import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Logo } from '../../shared/components/logo/logo';
import { Menu } from '../../shared/components/menu/menu';
import { MENU_HEADER } from '../../shared/constants/menu-header';

@Component({
  selector: 'app-header',
  imports: [Logo, Menu],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly logoImage = signal('./logo.svg');
  readonly menuItems = signal(MENU_HEADER);
}
