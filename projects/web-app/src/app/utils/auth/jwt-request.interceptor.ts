import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageInstance, StorageService } from '@web-app/app/utils/storage/storage.service';
import { StorageKey } from '@web-app/app/utils/storage/storage-key';

@Injectable()
export class JwtRequestInterceptor implements HttpInterceptor {
  private storage: StorageInstance;

  constructor(
    storageService: StorageService,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
    this.storage = storageService.get(StorageKey.USER_JWT);
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
