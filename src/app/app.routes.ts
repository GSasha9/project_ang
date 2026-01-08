import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { postsFeature } from '@state/posts/posts.feature';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { DetailedPage } from './pages/pricing/detailed-page/detailed-page';
import { Register } from './pages/register/register';
import { APP_ROUTES } from './shared/constants/app-routs';
import { BookResolver } from './shared/services/book-resolver.service';

export const routes: Routes = [
  {
    path: '',
    title: 'App title',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: APP_ROUTES.home,
    component: Home,
    title: 'Home Page',
  },
  {
    path: APP_ROUTES.blog,
    loadComponent: () => import('./pages/blog/blog').then((m) => m.Blog),
    providers: [provideState(postsFeature)],
    title: 'Blog',
  },
  {
    path: APP_ROUTES.pricing,
    loadComponent: () => import('./pages/pricing/pricing').then((m) => m.Pricing),
    title: 'Pricing',
  },
  {
    path: 'pricing/:id',
    component: DetailedPage,
    resolve: {
      book: BookResolver,
    },
  },
  {
    path: APP_ROUTES.login,
    component: Login,
    title: 'Login',
  },
  {
    path: APP_ROUTES.registration,
    component: Register,
    title: 'Registration',
  },
  {
    path: '**',
    component: NotFound,
    title: '404 Page',
  },
];
