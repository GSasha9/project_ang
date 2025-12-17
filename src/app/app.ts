import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { Spinner } from './shared/components/spinner/spinner';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet, Spinner],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private router = inject(Router);
  readonly isNavigated = computed(() => !!this.router.currentNavigation());
}
