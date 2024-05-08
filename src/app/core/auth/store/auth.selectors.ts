import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as authReducer from './auth.reducer';

export const selectAuthState = createFeatureSelector<authReducer.State>('auth');
export const selectAuthIsLoading = createSelector(
  selectAuthState, (state) => state.loading);
export const selectAuthAccessToken = createSelector(
  selectAuthState, (state) => state.accessToken);
