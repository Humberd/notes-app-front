import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationHandlerService } from '@web-app/app/utils/auth/authorization-handler.service';
import { AuthUserStatusType } from '@web-app/app/utils/auth/authorized-user';

@Injectable()
export class JwtRequestInterceptor implements HttpInterceptor {

  constructor(
    private authorizationHandlerService: AuthorizationHandlerService,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith(this.baseUrl)) {
      return next.handle(request);
    }

    if (this.authorizationHandlerService.authStatus.type !== AuthUserStatusType.LOGGED_IN) {
      return next.handle(request);
    }

    request = request.clone({
      headers: new HttpHeaders()
        .set('authorization', `Bearer ${this.authorizationHandlerService.authStatus.user}`),
    });

    return next.handle(request);
  }
}
