import {Injectable} from '@angular/core';
import {catchError, from, Observable, of, tap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly afAuth: AngularFireAuth, private readonly snackBar: MatSnackBar) { }

  register$(email: string, password: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      tap(() => {
        this.snackBar.open('Registration successful', 'OK', {
          duration: 1500,
          verticalPosition: 'bottom',
          panelClass: 'success-snackbar'
        });
      }),
      catchError((error) => {
        this.snackBar.open('Registration failed: ', 'OK', {
          duration: 2000,
          verticalPosition: 'bottom',
          panelClass: 'error-snackbar'
        });
        return of(error);
      })
    );
  }
  login$(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      tap(() => {
        this.snackBar.open('Login successful', 'OK', {
          duration: 1500,
          verticalPosition: 'bottom',
          panelClass: 'success-snackbar'
        });
      }),
      catchError((error) => {
        this.snackBar.open('Login failed: ', 'OK', {
          duration: 2000,
          verticalPosition: 'bottom',
          panelClass: 'error-snackbar'
        });
        return of(error);
      })
    );
  };
  logout$(): Observable<void> {
    return from(this.afAuth.signOut());
  };
}
