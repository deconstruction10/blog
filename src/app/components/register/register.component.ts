import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Store} from "@ngrx/store";
import {AuthActions} from "../../auth/actions/auth.actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private readonly store: Store) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^[a-z0-9]+$')
      ]],
    });
  }
  onSubmit() {
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    this.store.dispatch(AuthActions.register({ email, password }));
  };
}
