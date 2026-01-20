import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BlogPostData } from '@shared/models/blog-post-data.model';

export const PostsAction = createActionGroup({
  source: 'Posts',
  events: {
    Load: emptyProps(),
    PostAdded: emptyProps(),
    LoadSuccess: props<{ posts: BlogPostData[] }>(),
    Add: props<{ post: BlogPostData }>(),
    Remove: props<{ id: number }>(),
  },
});
