import { Injectable } from '@angular/core';
import { AuthorizationRepository } from 'domains/lib/authorization/models/authorization-repository';
import { RegisterRequest } from 'domains/lib/authorization/models/register-request';
import { Observable, of } from 'rxjs';
import { LoginRequest } from 'domains/lib/authorization/models/login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationIndexedDbRepositoryService implements AuthorizationRepository {

  login(body: LoginRequest): Observable<any> {
    return of('success');
  }

  register(body: RegisterRequest): Observable<any> {
    return of('success');
  }

}
