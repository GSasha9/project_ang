import { Routes } from '@angular/router';

import { Blog } from './blog/blog';
import { DetailedPage } from './pages/detailed-page/detailed-page';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { Pricing } from './pages/pricing/pricing';
import { Register } from './pages/register/register';

export const routes: Routes = [
  {
    path: '',
    title: 'App title',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
    title: 'Home Page',
  },
  {
    path: 'blog',
    component: Blog,
    title: 'Blog',
  },
  {
    path: 'pricing',
    component: Pricing,
    title: 'Pricing',
  },
  {
    path: 'pricing/:id',
    component: DetailedPage,
  },
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
  {
    path: 'registration',
    component: Register,
    title: 'Registration',
  },
  {
    path: '**',
    component: NotFound,
    title: '404 Page',
  },
];
