import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { googleAuthConfig } from './modules/auth/auth.google.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(googleAuthConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    console.log(this.oauthService);
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logoff() {
    this.oauthService.logOut();
  }

  get name() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }

    console.log({claims});
    // @ts-ignore
    return claims.given_name;
  }
}

// https://codinglatte.com/amp/posts/angular/sign-in-with-google-angular/
