import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PostState } from '@titlerotator/models';

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectPosts = createSelector(
  selectPostState,
  (state: PostState) => state.posts
);

export const selected = createSelector(
  selectPostState,
  (state: PostState) => state.selected
);

export const loading = createSelector(
  selectPostState,
  (state: PostState) => state.loading
);