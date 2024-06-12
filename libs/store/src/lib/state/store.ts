import { Action, ActionReducer } from "@ngrx/store";
import { PostState } from "@titlerotator/models";
import { postReducer } from "./reducers/posts.reducers";
import { PostEffects } from "./effects/posts.effects";

export interface AppState {
  posts: PostState
}

export interface AppStore {
  posts: ActionReducer<PostState, Action>;
}

export const appStore: AppStore = {
  posts: postReducer
}

export const appEffects = [PostEffects];