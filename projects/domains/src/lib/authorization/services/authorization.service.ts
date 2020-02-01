import { Injectable } from '@angular/core';
import { AuthorizationIndexedDbRepositoryService } from 'domains/lib/authorization/services/authorization-indexed-db-repository.service';
import { LoginRequest } from 'domains/lib/authorization/models/login-request';
import { Observable } from 'rxjs';
import { RegisterRequest } from 'domains/lib/authorization/models/register-request';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  constructor(private repository: AuthorizationIndexedDbRepositoryService) {

  }

  login(body: LoginRequest): Observable<any> {
    return this.repository.login(body);
  }

  register(body: RegisterRequest): Observable<any> {
    return this.repository.register(body);
  }

}
