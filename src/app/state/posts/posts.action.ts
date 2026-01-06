import { createActionGroup, props } from '@ngrx/store';
import { BlogPostData } from '@shared/models/blog-post-data.model';

export const PostsAction = createActionGroup({
  source: 'Posts',
  events: {
    Add: props<{ post: BlogPostData }>(),
    Remove: props<{ id: number }>(),
  },
});
