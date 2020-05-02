import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleOauthProviderComponent } from './google-oauth-provider.component';
import { RouterModule } from '@angular/router';
import { routes } from '@web-app/app/views/oauth-provider/views/google/google-oauth-provider.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GoogleOauthProviderComponent]
})
export class GoogleOauthProviderModule { }
