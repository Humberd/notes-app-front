import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { LibFormsModule } from 'common-library/lib/forms/forms.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    LibFormsModule,
    ReactiveFormsModule,
  ],
  exports: [LoginFormComponent],
})
export class LoginFormModule {
}
