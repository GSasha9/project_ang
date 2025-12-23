import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { Loader } from './loader/loader';
import { Notification } from './shared/components/notification/notification';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet, Loader, Notification],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
