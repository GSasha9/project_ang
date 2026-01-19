import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '@shared/services/posts.service';
import { catchError, EMPTY, map, switchMap } from 'rxjs';

import { PostsAction } from './posts.action';

@Injectable()
export class PostsEffect {
  private actions$ = inject(Actions);
  private postService = inject(PostsService);

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsAction.load),
      switchMap(() => {
        return this.postService.getAllPosts().pipe(
          map((result) => {
            return PostsAction.loadSuccess({ posts: result });
          }),
        );
      }),
      catchError(() => EMPTY),
    ),
  );
}
