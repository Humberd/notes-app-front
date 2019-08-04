import { Injectable } from '@angular/core';
import { AbstractAuthService } from './abstract-auth.service';

export interface JwtContent {
  email: string;
  sub: string;
  jti: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractAuthService {

  login(jwt: string) {
    const b64Payload = jwt.split('.')[1];
    const result: JwtContent = JSON.parse(atob(b64Payload));

    this.markAsLoggedIn({
      email: result.email,
      id: Number(result.sub),
      jwt
    });
  }

  logout() {

  }

}
