import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserView } from '../view/user-view';
import { PasswordCredentialsLoginRequest } from '../request/password-credentials-login-request';
import { PasswordCredentialsRegisterRequest } from '../request/password-credentials-register-request';

@Injectable({
  providedIn: 'root',
})
export class PasswordCredentialsDomainService {

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {

  }

  login(body: PasswordCredentialsLoginRequest): Observable<HttpResponse<void>> {
    return this.httpClient.post<void>(`${this.baseUrl}/auth/password-credentials/login`, body, {observe: 'response'});
  }

  register(body: PasswordCredentialsRegisterRequest): Observable<UserView> {
    return this.httpClient.post<UserView>(`${this.baseUrl}/auth/password-credentials/register`, body);
  }
}
