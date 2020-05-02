import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OauthProviderComponent } from './oauth-provider.component';
import { RouterModule } from '@angular/router';
import { routes } from '@web-app/app/views/oauth-provider/oauth-provider.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OauthProviderComponent]
})
export class OauthProviderModule { }
