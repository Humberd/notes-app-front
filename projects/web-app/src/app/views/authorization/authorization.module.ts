import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationComponent } from './authorization.component';
import { RouterModule } from '@angular/router';
import { routes } from '@web-app/app/views/authorization/authorization.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AuthorizationComponent],
})
export class AuthorizationModule {
}
