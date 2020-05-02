import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OauthProvidersLoginComponent } from './oauth-providers-login.component';


@NgModule({
  declarations: [OauthProvidersLoginComponent],
  imports: [
    CommonModule
  ],
  exports: [OauthProvidersLoginComponent]
})
export class OauthProvidersLoginModule { }
