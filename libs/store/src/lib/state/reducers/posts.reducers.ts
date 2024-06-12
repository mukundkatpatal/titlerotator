import { createReducer, on } from '@ngrx/store';
import { loadPostsFailure, loadPostsSuccess, setCurrentSelected } from '../actions/posts.action';
import { PostState } from '@titlerotator/models';

export const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  selected: 0
};

export const postReducer = createReducer(
  initialState,
  on(loadPostsSuccess, (state, { Posts: posts }) => ({
    ...state,
    posts,
    loading: false,
    error: null
  })),
  on(loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(setCurrentSelected, (state, { id }) => ({
    ...state,
    currentSelected: id
  }))
);