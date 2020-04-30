import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageKey } from '@composite-library/lib/storage/storage-key';
import { StorageService } from '@composite-library/lib/storage/storage.service';

@Injectable()
export class JwtRequestInterceptor implements HttpInterceptor {
  private storage = this.storageService.get(StorageKey.USER_JWT);

  constructor(
    private storageService: StorageService,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith(this.baseUrl)) {
      return next.handle(request);
    }

    const jwt = this.storage.get();
    if (!jwt) {
      return next.handle(request);
    }

    request = request.clone({
      headers: new HttpHeaders()
        .set('authorization', `Bearer ${jwt}`),
    });

    return next.handle(request);
  }
}
