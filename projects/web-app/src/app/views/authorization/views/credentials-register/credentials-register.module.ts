import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialsRegisterComponent } from './credentials-register.component';
import { RouterModule } from '@angular/router';
import { routes } from '@web-app/app/views/authorization/views/credentials-register/credentials-register.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CredentialsRegisterComponent],
})
export class CredentialsRegisterModule {
}
