import { createActionGroup, props } from '@ngrx/store';
import firebase from "firebase/compat/app";
import User = firebase.User;
import AuthError = firebase.auth.AuthError;

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Logout Success': props<{ user?: User | null }>(),
    'Logout Failure': props<{ error: AuthError }>(),
    'Login Success': props<{ user: User | null }>(),
    'Login Failure': props<{ error: AuthError }>(),
    'Register': props<{ email: string, password: string }>(),
    'Login': props<{ email: string, password: string }>(),
    'Logout': props<Record<string, never>>(),
    'Register Success': props<{ userCredential: firebase.auth.UserCredential }>(),
    'Register Failure': props<{ error: AuthError }>(),
  }
});
