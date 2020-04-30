import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialsLoginComponent } from './credentials-login.component';
import { RouterModule } from '@angular/router';
import { routes } from '@web-app/app/views/authorization/views/credentials-login/credentials-login.routes';
import { LibFormsModule } from '@common-library/lib/forms/forms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'common-library/lib/buttons/buttons.module';
import { MatButtonModule } from '@angular/material/button';
import { LinkModule } from '@common-library/lib/link/link.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LibFormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    MatButtonModule,
    LinkModule,
  ],
  declarations: [CredentialsLoginComponent],
})
export class CredentialsLoginModule {
}
