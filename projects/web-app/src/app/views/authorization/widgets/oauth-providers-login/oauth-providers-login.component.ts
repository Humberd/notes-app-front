import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@web-app/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-oauth-providers-login',
  templateUrl: './oauth-providers-login.component.html',
  styleUrls: ['./oauth-providers-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OauthProvidersLoginComponent {
  constructor(
    private location: Location,
  ) {
  }

  loginVia(provider: string) {
    window.location.replace(
      `${environment.fullServerApi}/oauth2/authorization/${provider}?redirect_uri=${this.getRedirectUri()}`,
    );
  }

  private getRedirectUri(): string {
    return `${window.location.origin}${this.location.prepareExternalUrl('/oauth/providers/login')}`;
  }
}
