import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { postsFeature } from '@state/posts/posts.feature';
import { map } from 'rxjs';

import { BlogPost } from './blog-post/blog-post';

@Component({
  selector: 'app-blog',
  imports: [BlogPost],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  private store = inject(Store);

  readonly posts = toSignal(
    this.store.select(postsFeature.selectPostsState).pipe(map((data) => data)),
  );
}
