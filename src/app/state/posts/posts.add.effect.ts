import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PostsService } from '@shared/services/posts.service';
import { selectLoggedUser } from '@state/users/users.selectors';
import { catchError, EMPTY, exhaustMap, map, withLatestFrom } from 'rxjs';

import { PostsAction } from './posts.action';

@Injectable()
export class PostsAddEffect {
  private actions$ = inject(Actions);
  private postService = inject(PostsService);
  private store = inject(Store);

  addPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsAction.add),
      withLatestFrom(this.store.select(selectLoggedUser)),
      exhaustMap(([action, user]) => {
        const postToSave = {
          ...action.post,
          authorId: user.id ?? null,
        };

        return this.postService.createPost(postToSave).pipe(map(() => PostsAction.postAdded()));
      }),
      catchError(() => EMPTY),
    ),
  );
}
