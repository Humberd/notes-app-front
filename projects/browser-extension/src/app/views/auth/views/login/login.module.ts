import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatButtonModule } from '@angular/material/button';
import { LoginFormModule } from 'composite-library/lib/forms/login-form/login-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LinkModule } from 'common-library/lib/link/link.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatButtonModule,
    LoginFormModule,
    ReactiveFormsModule,
    LinkModule,
  ],
})
export class LoginModule {
}
