import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialsLoginComponent } from './credentials-login.component';
import { RouterModule } from '@angular/router';
import { LibFormsModule } from '@common-library/lib/forms/forms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'common-library/lib/buttons/buttons.module';
import { MatButtonModule } from '@angular/material/button';
import { LinkModule } from 'common-library/lib/link/link.module';
import { routes } from './credentials-login.routes';

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
  declarations: [CredentialsLoginComponent]
})
export class CredentialsLoginModule { }
