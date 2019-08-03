import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Oauth2AuthorizedComponent } from './oauth2-authorized/oauth2-authorized.component';
import { RouterModule } from '@angular/router';
import { routes } from './auth.routes';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Oauth2AuthorizedComponent]
})
export class AuthModule {
}
