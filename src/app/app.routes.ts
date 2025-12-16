import { Routes } from '@angular/router';

import { Blog } from './blog/blog';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { Pricing } from './pages/pricing/pricing';

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
    path: '**',
    component: NotFound,
    title: '404 Page',
  },
];
