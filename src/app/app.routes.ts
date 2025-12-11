import { Routes } from '@angular/router';
import { NotFound } from './pages/not-found/not-found';
import { Home } from './pages/home/home';
import { Pricing } from './pages/pricing/pricing';
import { Blog } from './blog/blog';

export const routes: Routes = [
  {
    path: '',
    title: 'App title',
    redirectTo: '/home',
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
