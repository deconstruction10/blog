import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectIsAuthenticated } from "../../auth/selectors/auth.selectors";
import { AuthActions } from "../../auth/actions/auth.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAuthenticated$!: Observable<boolean>;

  constructor(private readonly store: Store, private readonly router: Router) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  logout() {
    this.store.dispatch(AuthActions.logoutSuccess({user: null}));
    this.router.navigate(['/']);
  }
}
