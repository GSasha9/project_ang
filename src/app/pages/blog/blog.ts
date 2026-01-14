import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { BlogPostData } from '@shared/models/blog-post-data.model';
import { PostsAction } from '@state/posts/posts.action';
import { postsFeature } from '@state/posts/posts.feature';
import { selectLoggedUser } from '@state/users/users.selectors';
import { map } from 'rxjs';

import { BlogForm } from './blog-form/blog-form';
import { BlogPost } from './blog-post/blog-post';

@Component({
  selector: 'app-blog',
  imports: [BlogPost, BlogForm],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  private store = inject(Store);
  readonly name = toSignal(
    this.store.select(selectLoggedUser).pipe(map((data) => data?.name ?? '')),
  );

  readonly posts = toSignal(
    this.store.select(postsFeature.selectPostsState).pipe(map((data) => data ?? '')),
  );

  onSubmitForm = (data: BlogPostData): void => {
    this.store.dispatch(PostsAction.add({ post: data }));
  };
}
