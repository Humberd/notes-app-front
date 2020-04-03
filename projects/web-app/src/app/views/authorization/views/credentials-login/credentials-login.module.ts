import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialsLoginComponent } from './credentials-login.component';
import { RouterModule } from '@angular/router';
import { routes } from '@web-app/app/views/authorization/views/credentials-login/credentials-login.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CredentialsLoginComponent]
})
export class CredentialsLoginModule { }
