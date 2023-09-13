import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from "../services/auth.service";
import {AuthActions} from "../actions/auth.actions";
import {catchError, map, of, switchMap} from "rxjs";
import {AuthError} from "@angular/fire/auth";

@Injectable()
export class AuthEffects {


  constructor(private actions$: Actions, private readonly authService: AuthService) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) =>
        this.authService.register$(action.email, action.password).pipe(
          map((userCredential) => AuthActions.registerSuccess({ userCredential })),
          catchError((error: AuthError) => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService.login$(action.email, action.password).pipe(
          map((userCredential) => AuthActions.loginSuccess({ user: userCredential.user })),
          catchError((error: AuthError) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout$().pipe(
          map(() => AuthActions.logoutSuccess({ user: null })),
          catchError((error: AuthError) => of(AuthActions.logoutFailure({ error })))
        )
      )
    )
  );

}
