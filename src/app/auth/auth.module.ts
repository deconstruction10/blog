import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import {MatSnackBarModule} from "@angular/material/snack-bar";



@NgModule({
  declarations: [],
  imports: [
    MatSnackBarModule,
    CommonModule,
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule { }
