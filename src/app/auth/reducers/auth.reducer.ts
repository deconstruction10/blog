import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';
import firebase from 'firebase/compat/app';
import User = firebase.User;
import AuthError = firebase.auth.AuthError;

export interface State {
  user: User | null;
  error: AuthError | null;
  isAuthenticated: boolean;
}

export const authFeatureKey = 'auth';
export const initialState: State = {
  user: null,
  error: null,
  isAuthenticated: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    error: null,
    isAuthenticated: false
  })),
  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
    isAuthenticated: true
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    error,
  })),
  on(AuthActions.registerSuccess, (state, { userCredential }) => ({
    ...state,
    user: userCredential.user,
    error: null,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
