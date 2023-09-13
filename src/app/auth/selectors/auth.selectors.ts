import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, State } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<State>(authFeatureKey);

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);
