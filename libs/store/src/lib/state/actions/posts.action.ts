import { createAction, props } from '@ngrx/store';

export const loadPosts = createAction('[Post] Load Posts');
export const loadPostsSuccess = createAction('[Post] Load Posts Success', props<{ Posts: any[] }>());
export const loadPostsFailure = createAction('[Post] Load Posts Failure', props<{ error: any }>());
export const setCurrentSelected = createAction('[Post] Set Current Selected', props<{ id: number }>());