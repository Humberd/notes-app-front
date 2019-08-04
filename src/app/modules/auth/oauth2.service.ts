import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface Oauth2LoginEvent {
  type: 'jwt';
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class Oauth2Service {

  constructor(
    private authService: AuthService,
    private ngZone: NgZone
  ) {
  }

  googleLogin() {
    const url = `${environment.serverApi}/oauth2/authorization/google`;

    const width = 450;
    const height = 730;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);

    window.open(
      url,
      'Google',
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );

    return new Promise((
      resolve,
      reject
    ) => {
      window.addEventListener('message', (ev) => {
        const eventData: Oauth2LoginEvent = JSON.parse(ev.data);
        if (eventData.type !== 'jwt') {
          return;
        }

        this.ngZone.run(() => {
          this.authService.login(eventData.value);

          resolve();

        });

      }, {once: true});
    });
  }
}
