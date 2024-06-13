import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { loadPostsFailure, loadPostsSuccess, setCurrentSelected } from '../actions/posts.action';
import { PostState } from '@titlerotator/models';

export const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  selected: 0
};

export const postReducer = createReducer<PostState, Action, ActionReducer<PostState, Action>>(
  initialState,
  on(loadPostsSuccess, (state, { Posts: posts }): PostState => ({
    ...state,
    posts,
    loading: false,
    error: null
  })),
  on(loadPostsFailure, (state, { error }): PostState => ({
    ...state,
    loading: false,
    error
  })),
  on(setCurrentSelected, (state, { id }): PostState => ({
    ...state,
    selected: id
  }))
);