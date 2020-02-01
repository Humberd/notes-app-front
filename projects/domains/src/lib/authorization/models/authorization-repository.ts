import { Observable } from 'rxjs';
import { LoginRequest } from 'domains/lib/authorization/models/login-request';
import { RegisterRequest } from 'domains/lib/authorization/models/register-request';

export interface AuthorizationRepository {
  login(body: LoginRequest): Observable<any>;

  register(body: RegisterRequest): Observable<any>;
}
