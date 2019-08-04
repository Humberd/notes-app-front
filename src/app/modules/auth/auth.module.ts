import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './auth.routes';
import { AuthDialogsModule } from './_dialogs/auth-dialogs.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AuthDialogsModule
  ],
  declarations: []
})
export class AuthModule {
}
