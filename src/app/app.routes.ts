import { Routes } from '@angular/router';

import { Blog } from './pages/blog/blog';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { DetailedPage } from './pages/pricing/detailed-page/detailed-page';
import { Pricing } from './pages/pricing/pricing';
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
    component: Blog,
    title: 'Blog',
  },
  {
    path: APP_ROUTES.pricing,
    component: Pricing,
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
