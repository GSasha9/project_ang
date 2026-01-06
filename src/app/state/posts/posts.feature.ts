import { createFeature, createReducer, on } from '@ngrx/store';
import { DRAFT_BLOG_POSTS } from '@shared/constants/draft-blog-posts';
import { BlogPostData } from '@shared/models/blog-post-data.model';

import { PostsAction } from './posts.action';

const initialState: BlogPostData[] = DRAFT_BLOG_POSTS;

export const postsFeature = createFeature({
  name: 'Posts',
  reducer: createReducer(
    initialState,
    on(PostsAction.add, (state, { post }) => [...state, post]),
    on(PostsAction.remove, (state, { id }) => {
      state.filter((post) => post.id !== id);
      return state;
    }),
  ),
});
