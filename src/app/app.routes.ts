import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { BooksEffect } from '@state/books/books.effect';
import { booksFeature } from '@state/books/books.feature';
import { LoadReadBooksEffect } from '@state/books/loadReadBooks.effect';
import { markAsReadOneSuccessEffect } from '@state/books/markAsReadOneSuccess.effect';
import { PostsAddEffect } from '@state/posts/posts.add.effect';
import { postsFeature } from '@state/posts/posts.feature';
import { PostsLoadEffect } from '@state/posts/posts.load.effect';
import { UserLoginEffect } from '@state/users/user-login.effect';
import { UserRegisterEffect } from '@state/users/user-register.effect';

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
    providers: [provideState(postsFeature), provideEffects([PostsAddEffect, PostsLoadEffect])],
    title: 'Blog',
  },
  {
    path: APP_ROUTES.pricing,

    loadComponent: () => import('./pages/pricing/pricing').then((m) => m.Pricing),
    providers: [
      provideState(booksFeature),
      provideEffects([BooksEffect, LoadReadBooksEffect, markAsReadOneSuccessEffect]),
    ],
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
    providers: [provideEffects([UserLoginEffect])],
    title: 'Login',
  },
  {
    path: APP_ROUTES.registration,
    component: Register,
    providers: [provideEffects([UserRegisterEffect])],
    title: 'Registration',
  },
  {
    path: '**',
    component: NotFound,
    title: '404 Page',
  },
];
