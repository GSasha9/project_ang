import { createFeature, createReducer, on } from '@ngrx/store';
import { BlogPostData } from '@shared/models/blog-post-data.model';

import { PostsAction } from './posts.action';

const initialState: BlogPostData[] = [];

export const postsFeature = createFeature({
  name: 'Posts',
  reducer: createReducer(
    initialState,
    on(PostsAction.loadSuccess, (_, { posts }) => [...posts]),
    on(PostsAction.add, (state, { post }) => [...state, post]),
    on(PostsAction.remove, (state, { id }) => {
      state.filter((post) => post.id !== id);
      return state;
    }),
  ),
});
