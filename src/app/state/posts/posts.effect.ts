import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '@shared/services/posts.service';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';

import { PostsAction } from './posts.action';

@Injectable()
export class PostsEffect {
  private actions$ = inject(Actions);
  private postService = inject(PostsService);

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsAction.load, PostsAction.add),
      exhaustMap((action) => {
        if (action.type === '[Posts] Add') {
          return this.postService.createPost(action.post).pipe(map(() => PostsAction.load()));
        } else {
          return this.postService.getAllPosts().pipe(
            map((result) => {
              return PostsAction.loadSuccess({ posts: result });
            }),
          );
        }
      }),
      catchError(() => EMPTY),
    ),
  );
}
