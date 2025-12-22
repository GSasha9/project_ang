import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { Notification } from './shared/components/notification/notification';
import { Spinner } from './shared/components/spinner/spinner';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet, Spinner, Notification],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  loadingStatus = false;

  loading = inject(LoadingService);

  setLoadingStatus = (): void => {
    this.loading.isLoadingSub.subscribe((status) => (this.loadingStatus = status));
  };
}
